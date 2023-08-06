# -*- encoding: utf8 -*-
from setuptools import setup, find_packages
from setuptools.command.test import test

from sorl import __version__, __author__, __maintainer__, __email__, __license__


class TestCommand(test):
    def run(self):
        from tests.runtests import runtests

        runtests()


setup(
    name='sorl-thumbnail',
    version=__version__,
    description='Thumbnails for Django',
    long_description=open('README.rst').read(),
    author=__author__,
    author_email='mikko@aino.se',
    maintainer=__maintainer__,
    maintainer_email=__email__,
    license=__license__,
    url='https://github.com/mariocesar/sorl-thumbnail',
    packages=find_packages(exclude=['tests', 'tests.*']),
    platforms='any',
    zip_safe=False,
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Multimedia :: Graphics',
        'Framework :: Django',
        'Framework :: Django :: 1.4',
        'Framework :: Django :: 1.5',
        'Framework :: Django :: 1.6',
        'Framework :: Django :: 1.7',
        'Framework :: Django :: 1.8',
    ],
    cmdclass={"test": TestCommand},
)
