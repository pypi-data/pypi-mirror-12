from codecs import open as codecs_open
from setuptools import setup, find_packages


# Get the long description from the relevant file
with codecs_open('README.rst', encoding='utf-8') as f:
    long_description = f.read()


setup(name='tilecontrol',
      version='0.1.6',
      description=u"PXM ingest quality control",
      long_description=long_description,
      classifiers=[],
      keywords='',
      author=u"Siyu Song",
      author_email='siyu@mapbox.com',
      url='https://github.com/mapbox/tilecontrol',
      license='MIT',
      packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'click', 'numpy', 'scipy', 'rasterio', 'mercantile', 'trollius'
      ],
      extras_require={
          'test': ['pytest'],
      },
      entry_points="""
      [console_scripts]
      tlc=tilecontrol.cli:tlc
      """
      )
