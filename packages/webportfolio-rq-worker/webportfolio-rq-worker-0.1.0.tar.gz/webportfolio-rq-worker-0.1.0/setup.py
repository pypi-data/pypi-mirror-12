"""
Webportfolio-rq-worker
"""

from setuptools import setup

setup(
    name="webportfolio-rq-worker",
    version="0.1.0",
    license="MIT",
    author="Mardix",
    author_email='mardix@pylot.io',
    description="RQ Worker wrapper for WebPortfolio",
    long_description=__doc__,
    url='http://github.com/mardix/webportfolio-rq-worker/',
    download_url='http://github.com/mardix/webportfolio-rq-worker/tarball/master',
    py_modules=['webportfolio_rq_worker'],
    keywords=["webportfolio", "rq", "queue"],
    platforms='any',
    install_requires=[
        'rq==0.5.3',
        'redis==2.9.1'
    ],
    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ]
)
