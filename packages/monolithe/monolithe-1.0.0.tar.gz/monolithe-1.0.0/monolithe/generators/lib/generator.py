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

import os
import shutil

from monolithe.lib import Printer
from monolithe.specifications import RepositoryManager, FolderManager

class Generator(object):

    def __init__(self, monolithe_config):
        """
        """
        self.monolithe_config = monolithe_config


    def generate_from_folder(self, folder):
        """
        """
        specification_info = []

        Printer.log("retrieving specifications from folder \"%s\"" % (folder))
        self.folder_manager = FolderManager(folder=folder, monolithe_config=self.monolithe_config)
        api_info = self.folder_manager.get_api_info()
        specifications = self.folder_manager.get_all_specifications()
        specification_info.append({"specifications": specifications, "api": api_info})
        Printer.log("%d specifications retrieved from folder \"%s\" (api version: %s)" % (len(specifications), folder, api_info["version"]))

        self.generate(specification_info=specification_info)

    def generate_from_repo(self, api_url, login_or_token, password, organization, repository, repository_path, branches):
        """
        """
        specification_info = []
        self.repository_manager = RepositoryManager(monolithe_config=self.monolithe_config,
                                                    api_url=api_url,
                                                    login_or_token=login_or_token,
                                                    password=password,
                                                    organization=organization,
                                                    repository=repository,
                                                    repository_path=repository_path)

        for branch in branches:
            Printer.log("retrieving specifications from github \"%s/%s%s@%s\"" % (organization.lower(), repository.lower(), repository_path, branch))
            api_info = self.repository_manager.get_api_info(branch=branch)
            specifications = self.repository_manager.get_all_specifications(branch=branch)
            specification_info.append({"specifications": specifications, "api": api_info})
            Printer.log("%d specifications retrieved from branch \"%s\" (api version: %s)" % (len(specifications), branch, api_info["version"]))

        self.generate(specification_info=specification_info)

    def generate(self, specification_info):
        """
        """
        pass


    def install_system_vanilla(self, current_file, output_path):
        """
        """
        if os.path.exists(output_path):
            shutil.rmtree(output_path)

        system_vanilla_path = os.path.join(os.path.dirname(current_file), "vanilla");
        shutil.copytree(system_vanilla_path, output_path)


    def install_user_vanilla(self, user_vanilla_path, output_path):
        """
        """
        if not user_vanilla_path or not len(user_vanilla_path):
            return

        if not os.path.exists(user_vanilla_path):
            Printer.raiseError("Could not find user vanilla folder at path %s" % user_vanilla_path)

        for item in os.listdir(user_vanilla_path):
            s = os.path.join(user_vanilla_path, item)
            d = os.path.join(output_path, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, False, None)
            else:
                shutil.copy2(s, d)
