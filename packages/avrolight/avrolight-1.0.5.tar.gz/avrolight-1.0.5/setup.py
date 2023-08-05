#!/usr/bin/env python3

from setuptools import setup

setup(
    name="avrolight",
    version="1.0.5",
    description="A light and fast implementation of the avro message format",
    author="Oliver Bestmann",
    author_email="oliver.bestmann@googlemail.com",
    url="https://github.com/oliverbestmann/avrolight",
    install_requires=["cached_property", "logbook"],
    packages=["avrolight"],

    license='MIT',
    classifiers=[
        'Development Status :: 4 - Beta',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.4',
    ]
)
