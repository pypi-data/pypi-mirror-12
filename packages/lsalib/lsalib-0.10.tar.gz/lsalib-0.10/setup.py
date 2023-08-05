from setuptools import setup

setup(name='lsalib',
      version='0.10',
      description='Basic Latent Semantic Analysis library',
      url='https://github.com/CrakeNotSnowman/LatentSemanticAnalysis',
      author='Keith Murray',
      author_email='kmurrayis@gmail.com',
      license='MIT',
      packages=['lsalib'],
      install_requires=[
          'numpy',
          'sklearn',
      ],
      zip_safe=False)
