from setuptools import setup, find_packages

setup(name='pfr',
      version='0.4.14',
      description='Scraping data from pro-football-reference.com',
      url='https://github.com/mdgoldberg/pfr',
      author='Matt Goldberg',
      author_email='mgoldberg@college.harvard.edu',
      license='Apache License 2.0',
      packages=find_packages(),
      install_requires=[
          'pandas',
          'numpy',
          'requests',
          'pyquery',
          'appdirs',
      ]
      )
