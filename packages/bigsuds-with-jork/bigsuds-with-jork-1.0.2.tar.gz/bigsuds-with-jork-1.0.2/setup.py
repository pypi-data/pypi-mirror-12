from setuptools import setup
import re


def extract_version(filename):
    contents = open(filename).read()
    match = re.search('^__version__\s+=\s+[\'"](.*)[\'"]\s*$', contents, re.MULTILINE)
    if match is not None:
        return match.group(1)

setup(
    name="bigsuds-with-jork",
    version=extract_version('bigsuds.py'),
    description='Library for F5 Networks iControl API. This fork uses jork''s suds fork',
    license='https://devcentral.f5.com/resources/devcentral-eula',
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.4',
        'Programming Language :: Python :: 2.5',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
    ],
    keywords='f5 icontrol',
    author='F5 Networks, Inc.',
    author_email='me@joaoubaldo.com',
    url='http://devcentral.f5.com',
    install_requires=['suds-jurko'],
    py_modules=['bigsuds'],
    test_suite='nose.collector',
    tests_require=['nose', 'mock', 'mox'],
)
