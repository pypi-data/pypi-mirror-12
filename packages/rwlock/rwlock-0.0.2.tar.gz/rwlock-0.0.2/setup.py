import os
from setuptools import setup, find_packages


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name="rwlock",
    packages=find_packages(),
    data_files=[('', ['README.md'])],

    version="0.0.2",
    author="kristjan.jonsson",
    maintainer="xwhuang",
    url="https://bugs.python.org/issue8800",
    download_url="https://github.com/azraelxyz/rwlock",
    description=("A read-write lock for python,"
                 "it is from "
                 "https://bugs.python.org/issue8800 and patched for py2.7"),
    long_description=read('README.md'),
    keywords=['rwlock', 'read-write lock', 'lock']
)
