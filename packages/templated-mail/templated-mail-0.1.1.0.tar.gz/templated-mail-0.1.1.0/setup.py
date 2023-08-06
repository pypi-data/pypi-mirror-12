"""
Package that allows defining email html and metadata
in a template, and sending it by name.

"""

from distutils.core import setup
import setuptools  # this import is needed so that some options and commands work

setup(
    name='templated-mail',
    version='0.1.1.0',
    author='Brian E. Peterson',
    author_email='bepetersondev@gmail.com',
    url='https://github.com/bepetersn/templated-mail',
    zip_safe=False,
    description=__doc__,
    packages=[
        'templated_mail'
    ],
    install_requires=[
    ],
)
