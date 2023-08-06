from setuptools import setup
import sys


install_requires = []
install_requires.append('six')
install_requires.append('sql_query_dict>=0.5')
if sys.version_info < (3, 4):
    install_requires.append('enum34')


setup(
    name='graphcore',
    version='0.1',
    description='Graphcore is a python library which allows you to query a '
                'graph structure with a query language similar to MQL, '
                'Falcor or GraphQL',
    url='http://github.com/dwiel/graphcore',
    author='Zach Dwiel',
    author_email='zdwiel@gmail.com',
    license='Apache',
    py_modules=['graphcore'],
    install_requires=install_requires,
)
