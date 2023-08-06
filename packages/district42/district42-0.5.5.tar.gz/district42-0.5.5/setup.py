from setuptools import setup, find_packages


setup(
  name='district42',
  description='Data description language for defining data models',
  version='0.5.5',
  url='https://github.com/nikitanovosibirsk/district42',
  author='Nikita Tsvetkov',
  author_email='nikitanovosibirsk@yandex.com',
  license='MIT',
  packages=find_packages(),
  install_requires=[
    'Delorean==0.5.0'
  ]
)
