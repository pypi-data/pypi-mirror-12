"""A setuptools based setup module.

See:
https://packaging.python.org/en/latest/distributing.html
https://github.com/jkklapp/floo
"""

from setuptools import setup, find_packages

setup(
    name='floo',
    version='0.1.2',
    description='A small library to get order and basic operations for an arbitrary set of symbols.',
    url='https://github.com/jkklapp/floo',
    download_url='https://github.com/jkklapp/floo/tarball/dist',
    author='Jaakko Lappalainen',
    author_email='jkk.lapp@gmail.com',
    license='Apache License',
    classifiers=[],
    keywords=['order', 'n-ary', 'arithmetic'],
    packages=['floo']
)
