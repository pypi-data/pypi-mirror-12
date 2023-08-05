# -*- coding: utf-8 -*-
#
# Copyright (c) 2015, Alcatel-Lucent Inc
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#     * Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in the
#       documentation and/or other materials provided with the distribution.
#     * Neither the name of the copyright holder nor the names of its contributors
#       may be used to endorse or promote products derived from this software without
#       specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

from monolithe.lib import SDKUtils


class SpecificationAPI(object):
    """ Describe an object API

    """
    def __init__(self, specification, data=None):
        """ Defines an API

            Example:
                path: /enterprises/id/gateway
                resource_name : enterprisenetworks
                remote_name : enterprisenetwork
                plural_name : EnterpriseNetworks
                instance_plural_name : enterprise_networks

        """
        self.path = None
        self.resource_name = None
        self.remote_name = None
        self.plural_name = None
        self.instance_plural_name = None
        self.specification = specification

        self.operations = []

        if data:
            self.from_dict(data)

    def from_dict(self, data):
        """

        """
        self.path = data["path"]
        self.resource_name = data["resourceName"]
        self.remote_name = data["RESTName"]

        if "entityName" in data:
            # Only for children
            # Used to create fetchers

            entity_name = data["entityName"]
            self.plural_name = SDKUtils.get_plural_name(entity_name)
            self.instance_plural_name = SDKUtils.get_python_name(self.plural_name)

            if self.remote_name == "allalarm":
                self.instance_plural_name = "all_alarms"  # Differs from alarms

        for operation in data["operations"]:
            model_operation = SpecificationAPIOperation(data=operation)
            self.operations.append(model_operation)

    def to_dict(self):
        """
        """

        data = {}

        data["path"] = self.path
        data["resourceName"] = self.resource_name
        data["RESTName"] = self.remote_name
        data["operations"] = []

        for operation in self.operations:
            data["operations"].append(operation.to_dict())

        return data


class SpecificationAPIOperation(object):
    """ Describe an API operation

    """
    def __init__(self, data=None):
        """ Defines an API

            Example:
                method: GET

        """
        self.method = None
        self.availability = None
        self.deprecated = None

        if data:
            self.from_dict(data)

    def from_dict(self, data):
        """

        """
        self.method = data["method"]
        self.availability = data["availability"]
        self.deprecated = data["deprecated"] if "deprecated" in data else False

    def to_dict(self):
        """
        """

        data = {}

        data["method"] = self.method
        data["availability"] = self.availability
        data["deprecated"] = self.deprecated

        return data
