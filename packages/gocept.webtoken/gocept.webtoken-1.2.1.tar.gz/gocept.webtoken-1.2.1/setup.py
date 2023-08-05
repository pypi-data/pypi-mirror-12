"""Wrapper around JWT tokens and the Zope Component Architecture (ZCA)."""

from setuptools import setup, find_packages
import glob
import os.path


def project_path(*names):
    return os.path.join(os.path.dirname(__file__), *names)


setup(
    name='gocept.webtoken',
    version='1.2.1',

    install_requires=[
        'cryptography',
        'pyjwt',
        'setuptools',
        'zope.interface',
        'zope.component',
    ],

    author='gocept <mail@gocept.com>',
    author_email='mail@gocept.com',
    license='ZPL 2.1',
    url='',

    keywords='',
    classifiers="""\
Development Status :: 4 - Beta
Intended Audience :: Developers
Natural Language :: English
Operating System :: OS Independent
Topic :: Internet :: WWW/HTTP
Topic :: Internet :: WWW/HTTP :: Browsers
Topic :: Security
Topic :: Security :: Cryptography
Topic :: Software Development
Topic :: Software Development :: Libraries
Topic :: Software Development :: Libraries :: Python Modules
License :: OSI Approved
License :: OSI Approved :: Zope Public License
Programming Language :: Python
Programming Language :: Python :: 2
Programming Language :: Python :: 2.7
Programming Language :: Python :: 3
Programming Language :: Python :: 3.3
Programming Language :: Python :: 3.4
Programming Language :: Python :: 3.5
Programming Language :: Python :: Implementation
Programming Language :: Python :: Implementation :: CPython
"""[:-1].split('\n'),
    description=__doc__.strip(),
    long_description='\n\n'.join(open(project_path(name)).read() for name in (
        'README.txt',
        'CHANGES.txt',
    )),

    namespace_packages=['gocept'],
    packages=find_packages('src'),
    package_dir={'': 'src'},
    include_package_data=True,
    data_files=[('', glob.glob(project_path('*.txt')))],
    zip_safe=False,
)
