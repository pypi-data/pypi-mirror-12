from distutils.core import setup

setup(name='genepattern-notebook',
      py_modules=['genepattern'],
      version='0.3.11',
      description='GenePattern Notebook extension for Jupyter',
      license='BSD',
      author='Thorin Tabor',
      author_email='tabor@broadinstitute.org',
      url='https://github.com/genepattern/genepattern-notebook',
      download_url='https://github.com/genepattern/genepattern-notebook/archive/0.3.11.tar.gz',
      keywords=['genepattern', 'genomics', 'bioinformatics', 'ipython', 'jupyter'],
      classifiers=['Framework :: IPython'],
      install_requires=[
          'genepattern-python',
          'ipython',
      ],
)