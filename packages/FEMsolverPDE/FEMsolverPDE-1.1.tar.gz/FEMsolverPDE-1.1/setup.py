# -*- coding: utf-8 -*-
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
from setuptools import setup, find_packages
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
setup(
    name     = 'FEMsolverPDE',
    version  = '1.1',
    packages = find_packages(),
    requires = ['python (>= 2.5)'],
    description  = 'Solve 1D and 2D PDE by finite elements method.',
    long_description = open('README.rst').read(), 
    author       = 'Andrei Chertkov',
    author_email = 'andrey.mipt@mail.ru',
    url          = 'https://github.com/un1t/django-cleanup',
    download_url = 'https://github.com/un1t/django-cleanup/tarball/master',
    license      = 'MIT License',
    keywords     = 'finite element, pde, pde solver',
    classifiers  = [
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Programming Language :: Python',
    ],
)
#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=