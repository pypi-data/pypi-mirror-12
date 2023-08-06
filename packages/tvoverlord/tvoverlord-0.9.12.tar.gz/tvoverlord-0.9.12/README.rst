TV Overlord
===========

TV Overlord is a command line tool to download and manage TV shows from
newsgroups or bittorent. It will download nzb files or magnet links.

TV Overlord keeps track of which shows have been downloaded and what
shows are available to download.

For each new episode of a tv show you are tracking, you are given a list
of possible downloads to choose. If you use a torrent search provider, a
magnet link is passed to the default bittorent client. If it is an NZB
search, an NZB file is placed in a folder that is configured in the
configuration file.

For torrent files, you can also have your shows organized after
downloading. If you use transmission or deluge, those clients can be
configured to call a script when each torrent is complete. This script
will extract the video file from the downloaded folder, rename it, and
put it in a seperate folder organized into sub folders named for each tv
show.

There are serveral bittorent search providers and two NZB search
providers and new ones can be added fairly easily. See the search
providers README.org at https://github.com/8cylinder/tv-overlord/tree/master/tv/search_providers,
or by making a feature request in issues or a pull request.

Features
--------

-  Keeps track of downloaded shows
-  Show a list of shows available for download
-  Gives you a list of torrents or nzbs you can choose from
-  You can add new shows from the command line
-  Will display info showing what show will be next and how many days
   till broadcast. This list can be filtered and sorted in various ways
-  Displays a calendar of upcoming episodes. You can also specify a
   range of days to display, past or future.

Install
-------

TV Downloader has been tested on Linux and Mac. It would probably not be
to hard to make it work on windows, and if anyone is interested, I can
take a look at making it work or alternatively send me a pull request.

**Dependencies**

TV Overlord requires some additional python libraries (not part of the
standard packages) to be installed:

1. **tvdb_api** - https://github.com/dbr/tvdb_api
    Python library to access the thetvdb.com api
2. **Requests** - http://docs.python-requests.org/en/latest/
    Library to download html pages
3. **Beautiful Soup** -
   http://www.crummy.com/software/BeautifulSoup/bs4/doc/
    Python library used to scrap thepiratebay.org since they don't have
   an api
4. **Feedparser** - https://pypi.python.org/pypi/feedparser
    For sites that provide an xml api this library is used to parse them
5. **Docopt** - http://docopt.org/
    The best library for handling command line arguments
6. **Dateutil** - https://labix.org/python-dateutil
    Some usefull extentions to the datetime module

**Install steps**

1. ``sudo pip install tvdb_api beautifulsoup4 feedparser requests docopt python-dateutil``
1. Create a dir somewhere and clone this repository:
    ``git clone https://github.com/smmcg/tv-downloader.git``
1. Put the dir on your $PATH or symlink tvoverlord to a dir that is on
   the path.
1. type: ``tvoverlord``
    The first time its run, it will ask to create the config dir. Type
   ``Y`` to allow it. The config directory will be created in your home
   dir called ``.tv-downloader/``
1. Type ``tvoverlord addnew "someshow";`` to start.
    For example: ``tvoverlord addnew 'some tv show name';``

How to use
----------

Add new
^^^^^^^

    tvoverlord addnew SHOWNAME

TV Overlord will search thetvdb.com for a match to your show name. If it
can't find the show you are looking for, it usually helps to add the
year to the name: ``tvoverlord addnew 'show name year';``.

**Show missing**

.. code-block:: bash

    tvoverlord showmissing [--no-cache] [--today]

This will list any shows that are available to download.

-  ``--no-cache`` will use fresh info from thetvdb.com instead of using
   the cached data (which is valid for 4 hours)
-  ``--today`` will show info for today instead of the usuall which is
   to only show yesterday's and older

**Download**

    tvoverlord download [--no-cache] [--today] [--ignore-warning] [--count NUM]
                        [--location FILEPATH] [--provider NAME] [SHOWNAME]

For each show thats ready to download, it will ask you which one you
want to download.

-  ``--count`` sets the number of results to display, the default is 5.
-  ``--location`` sets the dir to download the nzb files to if you are
   using an nzb search engine. This can be set in the ini file
-  ``--provider`` will set the provider to use. Look in the ini file to
   see how that can be specified there. NAME can be a partial name
-  ``--no-cache`` will use fresh info from thetvdb.com instead of using
   the cached data (which is valid for 4 hours)
-  ``--today`` will show info for today instead of the usuall which is
   to only show yesterday's and older
-  ``--ignore-warning`` does not check if you are connected to a vpn.
   This is documented in the tv\ :sub:`config`.ini section

And finally, you can specify a single show to only download that show
instead of downloading all.

**Calendar**

    tvoverlord calendar [--no-cache] [--today] [--sort-by-next]
                        [--no-color] [--days DAYS[,AFTER]] [SHOWNAME]

Display a calendar of all the current shows in your database. It
defaults to the width of the console.

-  ``--sort-by-next`` sorts by order of next episode instead of by name.
-  ``--days DAYS`` will narrow the calendar to DAYS days. For example,
   ``--days 10`` will show the next 10 days only.
-  ``--days DAYS,AFTER`` will display from DAYS to AFTER days. For
   example, ``--days 10,5`` will display from the 10th day to the 15th
   day.
-  ``--no-cache`` will use fresh info from thetvdb.com instead of using
   the cached data (which is valid for 4 hours)
-  ``--today`` will show info for today instead of the usuall which is
   to only show yesterday's and older

**History**

    tvoverlord history (list [-w FIELDS]|copy|redownload) [CRITERIA]

-  ``CRITERIA`` can be days, a date or a title or partial title
-  ``FIELDS`` is a comma seperated list if fields to show that only
   works with the list command. It may be any combination of these:
   date, title, season, episode, magnet, oneoff, complete, filename. If
   not specified it defaults to ='date,title,complete'=.

The ``list`` command generates a tab seperated list. This is usefull for
piping to various unix commands. For example this command will format
the output into columns.

    tvoverlord history list -w 'title,date,complete' | column -ts$'\t'

``copy`` and ``redownload`` show a list where the user can choose an
episode to redownload or copy a file to the destination set in the ini
file.

**Info**

    tvoverlord info [--no-cache] [--today] [--sort-by-next] [--show-links]
                    [--synopsis] [--ask-inactive] [SHOWNAME]

This will show you what shows are next, and how many days till they are
broadcast. Called without arguments, it lists all show except shows
marked inactive, in alphabetical order. A single show can be specified
also.

-  ``--sort-by-next`` this will sort the shows by order of which
   episodes are next
-  ``--show-links`` will display links to imdb.com and thetvdb.com for
   each show
-  ``--synopsis`` will show a show synopsis for each show
-  ``--ask-inactive`` When a show has been completely downloaded, and it
   has been cancelled or ended, it will ask you if you want to mark it
   inactive.

**Search and download non tracked**

    tvoverlord nondbshow [--count NUM] [--location FILEPATH]
                         [--provider NAME] SEARCHTERM

This will show you matches to your search. Anything downloaded this way
will not be recorded in your database.

-  ``--count`` is the number of search results to display
-  ``--location`` is where to download nzb files to
-  ``--provider`` will set the provider to use. NAME can be a partial
   name

**Providers**

    tvoverlord providers

This will list search providers available to the program. The default
one is the provider at the top of the list in config.ini.

**Edit db info**

    tvoverlord editdbinfo SHOWNAME

Edit the data in the database for show name. You can manually set a show
as 'inactive' here if you wish.

Configure
=========

TV Overlord looks for the database and ``config.ini`` in the
``~/.tv_overlord/`` directory. If that directory doesn't exist, the app
will create it.

Configuration file sections
---------------------------

``[App Settings]``

- ``ip: xxx.xxx.xxx.xxx``
   If used, TV Overlord will issue a warning if not connected to a
  vpn. This should be you ip address when **not** connected to a vpn,
  so if your current ip matches this one, the program stops. It uses
  http://api.ipify.org to get the current ip address.

- ``clean torrents: (yes|no)``
   If yes, the video file is extracted from the downloaded dir and
  renamed. For example:
  ``Z.Nation.2x09.INTERNAL.720p.HDTV.x264-KILLERS[ettv].mkv`` will be
  renamed to "``Z Nation S02E09 720p.mkv``" and then copied to the
  "``tv
   dir``" (description below). If that directory doesn't have a dir
  called "Z Nation", it's created.

  If no, then whatever was downloaded gets copied to the "tv dir" and
  put into the "Z Nation" directory

``[Search Providers]``

-  This is a list of search providers that come with the application.
   The first one is the default. The search engine used can be
   overridden on the command line with ``--provider=PROVIDERNAME``

``[File Locations]``

-  ``db file: FILEPATH``
    The location of the database.
-  ``tv dir: FILEPATH``
    If specified, this is where the post download script will put the
   episodes.
-  ``staging: FILEPATH``
    If using NZB searches, this is where the NZB files will be put.


Command line
============

``$ tvoverlord --help``

    $ tvoverlord -h
    Download and manage TV shows

    Usage:
      tv
      tv download    [-n] [-t] [-i] [-c COUNT] [-l LOCATION] [-p PROVIDER] [SHOW_NAME]
      tv showmissing [-n] [-t]
      tv info        [-n] [-a] [-x] [--ask-inactive] [--show-links] [--synopsis] [SHOW_NAME]
      tv calendar    [-n] [-a] [-x] [--no-color] [--days DAYS] [SHOW_NAME]
      tv addnew SHOW_NAME
      tv nondbshow SEARCH_STRING [-c COUNT] [-l LOCATION] [-p PROVIDER]
      tv editdbinfo SHOW_NAME
      tv providers
      tv history (list|copy|redownload) [CRITERIA]

      With no arguments, tv runs showmissing

      SHOW_NAME is a full or partial name of a tv show.  If SHOW_NAME is
      specified, tv will only act on matches to that name.  For example,
      if "fam" is used, "Family Guy" and "Modern Family" will be
      displayed.

    Options:
      -h, --help
      -c COUNT, --count COUNT
                        Count of search results to list. [default: 5]
      -l DOWNLOAD_LOCATION, --location DOWNLOAD_LOCATION
                        Location to download the nzb files to
      -n, --no-cache    Re-download the show data instead of using the cached data
      -p SEARCH_PROVIDER, --search-provider SEARCH_PROVIDER
                        Specify a different search engine instead of the one
                        in the config file.
      -i, --ignore-warning
                        Ignore 'Not connected to vpn' warning
      -a, --show-all    Show all shows including the ones marked inactive
      -x, --sort-by-next  Sort by release date instead of the default alphabetical
      -t, --today       Show or download today's episodes
      --ask-inactive    Ask to make inactive shows that are cancelled
      --show-links      Show links to IMDB.com and TheTVDb.com for each show
      -s --synopsis     Display the show synopsis
      --days DAYS       The number of days to show in the calendar
      --no-color        Don't use color in output. Useful if output is to be
                        used in email or text file.

