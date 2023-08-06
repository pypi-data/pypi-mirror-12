#!/usr/bin/env python
try:
  import os
  from setuptools import setup, find_packages
except ImportError:
  from distutils.core import setup

try:
    readme = open("README.rst")
    long_description = str(readme.read())
finally:
    readme.close()

setup(
  name = 'Vocabulary',
  version = '0.0.3',
  author = 'Tasdik Rahman',
  author_email = 'tasdik95@gmail.com', 
  description = "Module to get meaning, synonym, antonym, part_of_speech, usage_example, pronunciation and hyphenation for a given word",
  long_description=long_description,
  url = 'https://github.com/prodicus/vocabulary', 
  license = 'MIT',
  install_requires = [
    "requests==2.8.1",
    "wheel==0.24.0"
  ],
  ### adding package data to it 
  packages=find_packages(exclude=['contrib', 'docs']),
  ###
  download_url = 'https://github.com/prodicus/vocabulary/tarball/0.0.3', 
  classifiers = [
      'Intended Audience :: Developers',
      'License :: OSI Approved :: MIT License',
      'Natural Language :: English',
      'Programming Language :: Python',
      'Programming Language :: Python :: 2.7',
      'Programming Language :: Python :: 3',
      'Programming Language :: Python :: 3.4',
  ],
  keywords = ['Dictionary', 'Vocabulary', 'simple dictionary','pydict', 'dictionary module']
)