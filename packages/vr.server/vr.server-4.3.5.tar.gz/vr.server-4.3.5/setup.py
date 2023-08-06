#!/usr/bin/python
from setuptools import setup, find_packages

setup(
    name='vr.server',
    namespace_packages=['vr'],
    version='4.3.5',
    author='Brent Tubbs',
    author_email='brent.tubbs@gmail.com',
    packages=find_packages(),
    include_package_data=True,
    url='https://bitbucket.org/yougov/vr.server',
    install_requires=[
        'celery-schedulers==0.0.2',
        'diff-match-patch==20121119',
        'Django>=1.8,<1.9',
        'django-celery>=3.1.17,<3.2',
        'django-extensions==1.5.9',
        'django-picklefield==0.2.0',
        'django-redis-cache==0.9.5',
        'django-reversion==1.9.3',
        'django-tastypie==0.12.2',
        'Fabric==1.8.0',
        'gevent>=1.0rc2,<2',
        'gevent-psycopg2==0.0.3',
        'gunicorn==0.17.2',
        'mercurial>=2.6.1',
        'paramiko>=1.8.0,<2.0',
        'psycopg2>=2.4.4,<2.5',
        'pymongo>=2.5.2,<3',
        'redis>=2.6.2,<3',
        'requests',
        'setproctitle',
        'sseclient==0.0.8',
        'six>=1.4',

        'vr.events>=1.2.1',

        # These will normally be installed from the source code repo as part of
        # buildpack compilation.  Their folders are specified in
        # requirements.txt
        'vr.common>=4.3',
        'vr.builder>=1.3',
        'vr.imager>=1.2',
        'django-yamlfield',
    ],
    dependency_links = [
        'https://github.com/downloads/surfly/gevent/gevent-1.0rc2.tar.gz#egg=gevent-1.0rc2'
    ],
    entry_points = {
        'console_scripts': [
            'vr_worker = vr.server.commands:start_celery',
            'vr_beat = vr.server.commands:start_celerybeat',
            'vr_migrate = vr.server.commands:run_migrations',
        ],
    },
    description=("Velociraptor's Django and Celery components."),
)
