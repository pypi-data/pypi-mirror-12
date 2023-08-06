from distutils.core import setup
setup(
  name = 'heatmiserV3',
  packages = ['heatmiserV3'], # this must be the same as the name above
  version = '0.6',
  description = 'A library to interact with Heatmiser Themostats using the v3 protocol',
  author = 'Andy Loughran',
  author_email = 'andy@zrmt.com',
  url = 'https://github.com/andylockran/heatmiserV3', # use the URL to the github repo
  download_url = 'https://github.com/andylockran/heatmiserV3/tarball/0.6', # I'll explain this in a second
  keywords = ['v3', 'thermostat', 'heatmiser'], # arbitrary keywords
  classifiers = [],
  install_requires = ['pyserial']
)
