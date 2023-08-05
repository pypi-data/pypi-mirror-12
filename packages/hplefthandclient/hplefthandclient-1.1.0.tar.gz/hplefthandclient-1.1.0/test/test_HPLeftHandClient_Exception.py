# (c) Copyright 2015 Hewlett Packard Development Company, L.P.
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

"""Test class of LeftHand Client handling exceptions """

import test_HPLeftHandClient_base

from hplefthandclient import exceptions


class HPLeftHandClientExceptionTestCase(test_HPLeftHandClient_base.
                                        HPLeftHandClientBaseTestCase):

    def setUp(self):
        super(HPLeftHandClientExceptionTestCase, self).setUp()

    def tearDown(self):
        super(HPLeftHandClientExceptionTestCase, self).tearDown()

    def test_from_response_string_format(self):
        self.printHeader('from_response')

        # Fake response representing an internal server error.
        class FakeResponse(object):
            status = 500
        fake_response = FakeResponse()

        output = exceptions.from_response(fake_response, {}).__str__()
        self.assertEquals('Error (HTTP 500)', output)

        self.printFooter('from_response')

    def test_client_exception_string_format(self):
        self.printHeader('client_exception')

        fake_error = {'messageID': 999,
                      'message': 'Fake Description',
                      'debug1': 'Fake Debug 1',
                      'debug2': 'Fake Debug 2', }

        # Create a fake exception and check that the output is
        # converted properly.
        client_ex = exceptions.ClientException(error=fake_error)
        client_ex.message = "Fake Error"
        client_ex.http_status = 500
        output = client_ex.__str__()

        self.assertEquals("Fake Error (HTTP 500) 999 - Fake Description "
                          "(1: 'Fake Debug 1') (2: 'Fake Debug 2')",
                          output)

        self.printFooter('client_exception')
