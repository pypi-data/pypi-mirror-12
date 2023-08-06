#!/usr/bin/env python
import os
from setuptools import setup, find_packages

setup(name='seldon',
      version='1.3',
      description='Seldon Python Utilities',
      author='Clive Cox',
      author_email='support@seldon.io',
      url='https://github.com/SeldonIO/seldon-server',
      license='Apache 2 License',
      install_requires=['wabbit_wappa==3.0.2','xgboost','kazoo','scikit-learn>=0.17','scipy','numpy','boto','filechunkio','keras', 'pylibmc', 'annoy', 'gensim', "Flask", "pandas>=0.17"],
      dependency_links = [
          'https://github.com/SeldonIO/wabbit_wappa/archive/3.0.2.zip#egg=wabbit-wappa-3.0.2'
      ],
      packages=['seldon', 'seldon.pipeline'],
      )
