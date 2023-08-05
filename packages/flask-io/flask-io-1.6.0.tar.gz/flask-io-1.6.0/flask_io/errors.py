# Copyright 2015 Vinicius Chiele. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


class Error(object):
    def __init__(self, message, code=None, location=None, field=None, **kwargs):
        self.message = message
        self.code = code
        self.location = location
        self.field = field
        self.__dict__.update(kwargs)

    def as_dict(self):
        data = self.__dict__.copy()

        for key in set(data.keys()):
            if data[key] is None:
                data.pop(key)

        return data
