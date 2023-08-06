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

import json
import mimetypes

from flask import request
from functools import lru_cache
from os.path import join, getmtime, getsize
from werkzeug.datastructures import Headers


class ApiDoc(object):
    """
    ApiDoc hosts the apidoc files in a specified url.
    """

    def __init__(self, folder_path=None, url_path=None, app=None):
        """
        Initializes a new instance of ApiDoc.

        :param folder_path: the folder with apidoc files. Defaults to the 'docs' folder in the flask static folder.
        :param url_path: the url path for the apidoc files. Defaults to the '/docs'.
        :param app: the flask application.
        """

        self.folder_path = folder_path
        self.url_path = url_path

        if self.folder_path is None:
            self.folder_path = 'docs'

        if self.url_path is None:
            self.url_path = '/docs'

        self.app = None

        if app:
            self.init_app(app)

    def init_app(self, app):
        """
        Adds the flask url routes for the apidoc files.
        :param app: the flask application.
        """

        self.app = app

        url = self.url_path

        if not self.url_path.endswith('/'):
            url += '/'

        app.add_url_rule(url, 'docs', self.__send_static_file, strict_slashes=True)
        app.add_url_rule(url + '<path:path>', 'docs', self.__send_static_file, strict_slashes=True)

    def __send_static_file(self, path=None):
        """
        Sends apidoc files from the apidoc folder to the browser.
        :param path: the apidoc file
        """

        if not path:
            path = 'index.html'

        file_name = join(self.folder_path, path)

        # the api_project.js has the absolute url
        # hard coded so we replace them by the current url.
        if path == 'api_project.js':
            return self.__send_api_file(file_name)

        # Any other apidoc file is treated as a normal static file
        return self.app.send_static_file(file_name)

    @lru_cache(maxsize=None)
    def __send_api_file(self, file_name):
        """
        Sends apidoc files from the apidoc folder to the browser.
        This method replaces all absolute urls in the file by
        the current url.
        :param file_name: the apidoc file
        """

        file_name = join(self.app.static_folder, file_name)

        with open(file_name, 'rt') as file:
            data = file.read()

        # replaces the hard coded url by the
        # current url.
        api_project = self.__read_api_project()

        new_url = request.url_root.strip('/')
        old_url = api_project.get('url')
        data = data.replace(old_url, new_url)

        # creates a flask response to send
        # the file to the browser

        headers = Headers()
        headers['Content-Length'] = getsize(file_name)

        response = self.app.response_class(data,
                                           mimetype=mimetypes.guess_type(file_name)[0],
                                           headers=headers,
                                           direct_passthrough=True)

        response.last_modified = int(getmtime(file_name))

        return response

    @lru_cache(maxsize=None)
    def __read_api_project(self):
        """
        Reads the api_project.json file from apidoc folder as a json string.
        :return: a json string
        """

        file_name = join(self.app.static_folder, self.folder_path, 'api_project.json')

        with open(file_name, 'rt') as file:
            data = file.read()

        return json.loads(data)
