#!/usr/bin/env python
'''
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
'''

import os, sys
from setuptools import setup, Command,find_packages
import aliyuncli

install_requires = [
        'colorama>=0.2.5,<=0.3.3',
        'jmespath>=0.6.1,<=0.7.1',
        ]
def main():
    setup(
        name='alicloudcli',
        description='Universal Command Line Environment for alicloud',
        version= aliyuncli.__version__,
        long_description = open("README.rst").read(),
        url='http://www.alicloud.com',
        packages = find_packages(),
        platforms=['unix', 'linux','osx','win64','win32'],
        install_requires = install_requires,
        author='aliyun-developers-efficiency',
        author_email='aliyun-developers-efficiency@list.alibaba-inc.com',
        scripts = ['aliyuncli/alicloud_zsh_complete.sh'],
        entry_points = {
            'console_scripts': [
                'alicloud = aliyuncli.aliyuncli:main',
                'alicloud_completer  = aliyuncli.aliyun_completer:aliyun_complete',

            ]
        }
        # the following should be enabled for release
    )


if __name__ == '__main__':
    main()
