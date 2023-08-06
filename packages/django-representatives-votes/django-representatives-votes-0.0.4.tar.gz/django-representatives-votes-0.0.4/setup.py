from setuptools import find_packages, setup

setup(
    name='django-representatives-votes',
    version='0.0.4',
    description='Base app for government representative votes',
    author='Olivier Le Thanh Duong',
    author_email='olivier@lethanh.be',
    url='http://github.com/political-memory/django-representatives-votes',
    packages=find_packages(),
    include_package_data=True,
    license='GPLv3',
    keywords='django government parliament votes',
    install_requires=[
        'django-representatives',
        'py-dateutil',
        'pytz',
        'ijson',
    ],
    entry_points={
        'console_scripts': [
            'parltrack_import_dossiers = representatives_votes.contrib.parltrack.dossiers:parltrack_import_dossiers',
            'parltrack_import_votes = representatives_votes.contrib.parltrack.votes:parltrack_import_votes',
        ]
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 2',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ]
)
