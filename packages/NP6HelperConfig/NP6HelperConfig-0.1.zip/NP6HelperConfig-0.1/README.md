HelperConfig
--------
Help for deserialize config.ini file.

File
--------
Config.ini :
[CategoryName]
category1 = 1
category2 = 2
...

Use
--------
To use, simply do::

    >>> import HelperConfig
    >>> config = HelperConfig.get_config(path)
	>>> config['CategoryName']