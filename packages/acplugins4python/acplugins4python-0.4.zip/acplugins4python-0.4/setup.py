# a test

from setuptools import setup

plugin_version = "0.4"
ac_version = "1.3.0"
python_version = "3.3.x"

setup(name='acplugins4python',
      version=plugin_version,
      description='Python api layer for Assetto Corsa\'s UDP server API. Developed and tested with AC %s on python %s' % (ac_version,python_version),
      url='https://github.com/minolin/acplugins',
      author='NeverEatYellowSnow (NEYS)',
      author_email='never_eat_yellow_snow@gmx.net',
      license='BSD',
      packages=['acplugins4python'],
      scripts=['acplugins4python_example.py'],
      zip_safe=False,
      keywords='Assetto Corsa AC server')