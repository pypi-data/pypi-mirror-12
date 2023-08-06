niceconf
=======================

niceconf is a dropin replacement for the stdlib RawConfigParser object. It makes
parsing and using configuration files in your python scripts approximately
10 times more pythonic and fun.

By default it reads and writes to ~/.conf. This can be changed by setting
$CONF. If ~/.conf or the file specified in $CONF does not exist, it will be
created on the first import.

-----------------------

basic usage:
    >>> from niceconf import config
    >>> config
    gmail
    my-database
    secret-stuff
    >>> config['gmail']
    [gmail]
    username = rick@gmail.com
    password = wubalubadubdub
    >>> config['gmail']['username']
    'rick@gmail.com'
    >>> config['gmail']['password']
    'wubalubadubdub'

add or set config file options:
    >>> config['my-database']['port'] = 3306
    >>> config['my-database']['port']
    '3306'

delete config file options:
    >>> del config['secret-stuff']['burn-after-reading']
    >>> config['secret-stuff']['burn-after-reading']
    NoOptionError: No option 'burn-after-reading' in section: 'secret-stuff'

add a section (any valid dict-like can be added as section):
    >>> config['stackoverflow'] = {'username': 'guido',
                                   'password': 'pa$$word1'}
    >>> config['stackoverflow']
    [stackoverflow]
    username = guido
    password = pa$$word1

delete a section:
    >>> del config['stackoverflow']
    >>> config['stackoverflow']
    NoSectionError: No section: 'stackoverflow'

write out to a file (overwrites by default):
    >>> config.save()

read in another config file:
    >>> config.read('/path/to/conf')
    ['/path/to/conf']
    >>> config
    gmail
    my-database
    secret-stuff
    first_section_of_other_conf
    second_section_of_other_conf

explode conf into function arguments
    >>> print_kwargs(**config['gmail'])
    {'username': 'rick@gmail.com', 'password': 'wubalubadubdub'}


Additionally, the config object _is_ an instance of RawConfigParser, so you can
use any of those methods as before. This means that config is a dropin
replacement for ConfigParser.
