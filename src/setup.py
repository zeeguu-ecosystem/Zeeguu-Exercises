#!/usr/bin/env python
# -*- coding: utf8 -*-
import os

import setuptools

setuptools.setup(
    name="zeeguu_exercises",
    version="0.1",
    packages=setuptools.find_packages(),
    include_package_data=True,
    zip_safe=False,
    author="Martin Avagyan",
    author_email="zeeguu_team@zeeguu.com",
    description="Web Exercises for Zeeguu",
    keywords="The zeeguu_exercises is a cool module!",
    install_requires=("flask>=0.10.1",
                      "Flask-SQLAlchemy",
                      "Flask-Assets")
)
