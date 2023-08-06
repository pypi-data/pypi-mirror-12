# Copyright (c) 2015 Mitch Garnaat
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json
import datetime


def _add_custom_class(base_classes, **kwargs):
    base_classes.insert(0, PlaceboClient)


class FakeHttpResponse(object):

    def __init__(self, status_code):
        self.status_code = status_code


class Placebo(object):

    def __init__(self, client):
        self.client = client
        self.mock_responses = {}

    def start(self):
        # This is kind of sketchy.  We need to short-circuit the request
        # process in botocore so we don't make any network requests.  The
        # best way I have found is to mock out the make_request method of
        # the Endpoint associated with the client but this is not a public
        # attribute of the client so could change in the future.
        self._save_make_request = self.client._endpoint.make_request
        self.client._endpoint.make_request = self.make_request

    def stop(self):
        if self._save_mock_request:
            self.client.make_request = self._save_mock_request

    def _record_data(self, http_response, parsed, **kwargs):
        _, service_name, operation_name = kwargs['event_name'].split('.')
        self.add_response(service_name, operation_name, parsed,
                          http_response.status_code)

    def record(self):
        event = 'after-call.{}'.format(
            self.client.meta.service_model.endpoint_prefix)
        self.client.meta.events.register(event, self._record_data)

    def save(self, path):
        """Save recorded mock responses as a JSON document."""
        # If passed a file-like object, use it directly.
        if hasattr(path, 'write'):
            json.dump(self.mock_responses, path, indent=4, default=serialize)
            return
        # If passed a string, treat it as a file path.
        with open(path, 'w') as fp:
            json.dump(self.mock_responses, fp, indent=4, default=serialize)

    def load(self, path):
        """
        Load a JSON document containing previously recorded mock responses.
        """
        # If passed a file-like object, use it directly.
        if hasattr(path, 'read'):
            self.mock_responses = json.load(path, object_hook=deserialize)
            return
        # If passed a string, treat it as a file path.
        with open(path, 'r') as fp:
            self.mock_responses = json.load(fp, object_hook=deserialize)

    def add_response(self, service_name, operation_name, response_data,
                     http_response=200):
        """
        Add a placebo response to an operation.  The ``operation_name``
        should be the name of the operation in the service API (e.g.
        DescribeInstances), the ``response_data`` should a value you want
        to return from a placebo call and the ``http_response`` should be
        the HTTP status code returned from the service.  You can add
        multiple responses for a given operation and they will be
        returned in order.
        """
        key = '{}.{}'.format(service_name, operation_name)
        if key not in self.mock_responses:
            self.mock_responses[key] = {'index': 0,
                                        'responses': []}
        self.mock_responses[key]['responses'].append(
            (http_response, response_data))

    def make_request(self, model, request_dict):
        """
        A mocked out make_request call that bypasses all network calls
        and simply returns any mocked responses defined.
        """
        key = '{}.{}'.format(self.client.meta.service_model.endpoint_prefix,
                             model.name)
        if key in self.mock_responses:
            responses = self.mock_responses[key]['responses']
            index = self.mock_responses[key]['index']
            index = min(index, len(responses) - 1)
            http_response, data = responses[index]
            self.mock_responses[key]['index'] += 1
        else:
            http_response, data = 200, {}
        return (FakeHttpResponse(http_response), data)


class PlaceboClient(object):

    def __init__(self, *args, **kwargs):
        super(PlaceboClient, self).__init__(*args, **kwargs)
        self.meta.placebo = Placebo(self)


def attach(session):
    session.events.register('creating-client-class', _add_custom_class)


def deserialize(obj):
    """Convert JSON dicts back into objects."""
    # Be careful of shallow copy here
    target = dict(obj)
    class_name = None
    if '__class__' in target:
        class_name = target.pop('__class__')
    if '__module__' in obj:
        module_name = obj.pop('__module__')
    # Use getattr(module, class_name) for custom types if needed
    if class_name == 'datetime':
        return datetime.datetime(**target)
    # Return unrecognized structures as-is
    return obj


def serialize(obj):
    """Convert objects into JSON structures."""
    # Record class and module information for deserialization
    result = {'__class__': obj.__class__.__name__}
    try:
        result['__module__'] = obj.__module__
    except AttributeError:
        pass
    # Convert objects to dictionary representation based on type
    if isinstance(obj, datetime.datetime):
        result['year'] = obj.year
        result['month'] = obj.month
        result['day'] = obj.day
        result['hour'] = obj.hour
        result['minute'] = obj.minute
        result['second'] = obj.second
        result['microsecond'] = obj.microsecond
        return result
    # Raise a TypeError if the object isn't recognized
    raise TypeError("Type not serializable")
