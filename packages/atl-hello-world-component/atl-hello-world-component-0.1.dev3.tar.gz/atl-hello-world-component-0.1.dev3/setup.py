# -*- coding: utf-8 -*-
from setuptools import setup, find_packages
from codecs import open
from os import path
from atl_hello_world_component import __version__

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

REQUIREMENTS = [
    'atl-django-component',
]

setup(
    name='atl-hello-world-component',
    version=__version__,
    description='This is a simple example of atl-django-component',
    long_description=long_description,
    url='https://bitbucket.org/atlantesoftware/atl-hello-world-component',
    author='Hailem Dreis Carrasco Fuentes',
    author_email='hailem@gmail.com',
    license='GNU GPLv3',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Programming Language :: Python',
        'Framework :: Django',
        'Environment :: Web Environment',
        'Topic :: Utilities',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',

        'Operating System :: OS Independent',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
    keywords='django component example',
    packages=find_packages(),
    include_package_data=True,
    install_requires=REQUIREMENTS,
)