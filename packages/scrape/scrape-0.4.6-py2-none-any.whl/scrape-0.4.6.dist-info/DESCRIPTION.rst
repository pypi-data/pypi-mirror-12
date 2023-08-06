# scrape [![Build Status](https://travis-ci.org/huntrar/scrape.svg?branch=master)](https://travis-ci.org/huntrar/scrape) [![PyPI](https://img.shields.io/pypi/dm/scrape.svg?style=flat)]()

## a command-line web scraping tool

scrape can extract, filter, and convert webpages to text, pdf, or HTML files. A link crawler can traverse websites using regular expression keywords. Users may also choose to enter local files to filter and/or convert.

## Installation
    pip install scrape

or

    pip install git+https://github.com/huntrar/scrape.git#egg=scrape

or

    git clone https://github.com/huntrar/scrape
    cd scrape
    python setup.py install

You must [install wkhtmltopdf](https://github.com/pdfkit/pdfkit/wiki/Installing-WKHTMLTOPDF) to save files to pdf.

## Usage
    usage: scrape.py [-h] [-a [ATTRIBUTES [ATTRIBUTES ...]]]
                     [-c [CRAWL [CRAWL ...]]] [-ca] [-f [FILTER [FILTER ...]]]
                     [-ht] [-mp MAXPAGES] [-ml MAXLINKS] [-n] [-p] [-q] [-t] [-v]
                     [urls [urls ...]]

    a command-line web scraping tool

    positional arguments:
      urls                  URLs/files to scrape

    optional arguments:
      -h, --help            show this help message and exit
      -a [ATTRIBUTES [ATTRIBUTES ...]], --attributes [ATTRIBUTES [ATTRIBUTES ...]]
                            extract text using tag attributes
      -c [CRAWL [CRAWL ...]], --crawl [CRAWL [CRAWL ...]]
                            regexp rules for following new pages
      -ca, --crawl-all      crawl all pages
      -f [FILTER [FILTER ...]], --filter [FILTER [FILTER ...]]
                            regexp rules for filtering text
      -ht, --html           write pages as HTML
      -mp MAXPAGES, --maxpages MAXPAGES
                            max number of pages to crawl
      -ml MAXLINKS, --maxlinks MAXLINKS
                            max number of links to scrape
      -n, --nonstrict       allow crawler to visit any domain
      -p, --pdf             write pages as pdf
      -q, --quiet           suppress program output
      -t, --text            write pages as text (default)
      -v, --version         display current version

## Author
* Hunter Hammond (huntrar@gmail.com)

## Notes
* Supports both Python 2.x and Python 3.x.
* Pages are converted to text by default, you can specify --html or --pdf to save to a different format.
* Filtering text is done by entering one or more regexps to --filter.
* You may specify specific tag attributes to extract from the page using --attributes. The default choice is to extract only text attributes, but you can specify one or many different attributes (such as href, src, title, or any attribute available..).
* Pages are saved temporarily as PART.html files during processing. Unless saving pages as HTML, these files are removed automatically upon conversion or exit.
* To crawl pages with no restrictions use the --crawl-all flag, or filter which pages to crawl by URL keywords by passing one or more regexps to --crawl.
* If you want the crawler to follow links outside of the given URL's domain, use --nonstrict.
* Crawling can be stopped by Ctrl-C or alternatively by setting the number of pages or links to be crawled using --maxpages and --maxlinks. A page may contain zero or many links to more pages.


News
====

0.4.6
------

 - fixed html => text
 - all conversions fixed, test_scrape.py added to keep it this way

0.4.5
------

 - added docstrings to all functions
 - fixed IOError when trying to convert local html to html
 - fixed IOError when trying to convert local html to pdf
 - fixed saving scraped files to text, was saving PART filenames instead

0.4.4
------

 - prompts for filetype from user if none entered
 - modularized a couple functions

0.4.3
------

 - fixed out_file naming
 - pep8 and pylint reformatting

0.4.2
------

 - removed read_part_files in place of get_part_files as pdfkit reads filenames

0.4.1
------

 - fixed bug preventing writing scraped urls to pdf

0.4.0
------

 - can now read in text and filter it
 - recognizes local files, no need for user to enter special flag
 - moved html/ files to testing/ and added a text file to it
 - added better distinction between input and output files
 - changed instances of file to f_name in utils
 - pep8 reformatting

0.3.9
------

 - add scheme to urls if none present
 - fixed bug where raw_html was calling get_html rather than get_raw_html

0.3.8
------

 - made distinction between links and pages with multiple links on them
 - use --maxpages to set the maximum number of pages to get links from
 - use --maxlinks to set the maximum number of links to parse
 - improved the argument help messages
 - improved notes/description in README

0.3.7
------

 - fixes to page caching and writing PART files
 - use --local to read in local html files
 - use --max to indicate max number of pages to crawl
 - changed program description and keywords

0.3.6
------

 - cleanup using pylint as reference

0.3.5
------

- updated long program description in readme
- added pypi monthly downloads image in readme

0.3.4
------

 - updated description header in readme

0.3.3
------

 - added file conversion to program description

0.3.2
------

 - added travis-ci build status to readme

0.3.1
------

 - updated program description and added extra installation instructions
 - added .travis.yml and requirements.txt

0.3.0
------

 - added read option for user inputted html files, currently writes files individually and not grouped, to do next is add grouping option
 - added html/ directory containing test html files
 - made relative imports explicit using absolute_import
 - added proxies to utils.py

0.2.10
------

 - moved OrderedSet class to orderedset.py rather than utils.py

0.2.9
------

 - updated program description and keywords in setup.py

0.2.8
------

 - restricts crawling to seed domain by default, changed --strict to --nonstrict for crawling outside given website

0.2.5
------

 - added requests to install_requires in setup.py

0.2.4
------

 - added attributes flag which specifies which tag attributes to extract from a given page, such as text, href, etc.

0.2.3
------

 - updated flags and flag help messages
 - verbose now by default and reduced number of messages, use --quiet to silence messages
 - changed name of --files flag to --html for saving output as html
 - added --text flag, default is still text

0.2.2
------

 - fixed character encoding issue, all unicode now

0.2.1
------

 - improvements to exception handling for proper PART file removal

0.2.0
------

 - pages are now saved as they are crawled to PART.html files and processed/removed as necessary, this greatly saves on program memory
 - added a page cache with a limit of 10 for greater duplicate protection
 - added --files option for keeping webpages as PART.html instead of saving as text or pdf, this also organizes them into a subdirectory named after the seed url's domain
 - changed --restrict flag to --strict for restricting the domain to the seed domain while crawling
 - more --verbose messages being printed

0.1.10
------

 - now compares urls scheme-less before updating links to prevent http:// and https:// duplicates and replaced set_scheme with remove_scheme in utils.py
 - renamed write_pages to write_links

0.1.9
------

 - added behavior for --crawl keywords in crawl method
 - added a domain check before outputting crawled message or adding to crawled links
 - domain key in args is now set to base domain for proper --restrict behavior
 - clean_url now rstrips / character for proper link crawling
 - resolve_url now rstrips / character for proper out_file writing
 - updated description of --crawl flag

0.1.8
------

 - removed url fragments
 - replaced set_base with urlparse method urljoin
 - out_file name construction now uses urlparse 'path' member
 - raw_links is now an OrderedSet to try to eliminate as much processing as possible
 - added clear method to OrderedSet in utils.py

0.1.7
------

 - removed validate_domain and replaced it with a lambda instead
 - replaced domain with base_url in set_base as should have been done before
 - crawled message no longer prints if url was a duplicate

0.1.6
------

 - uncommented import __version__

0.1.5
------

 - set_domain was replaced by set_base, proper solution for links that are relative
 - fixed verbose behavior
 - updated description in README

0.1.4
------

 - fixed output file generation, was using domain instead of base_url
 - minor code cleanup

0.1.3
------

 - blank lines are no longer written to text unless as a page separator
 - style tags now ignored alongside script tags when getting text

0.1.2
------

 - added shebang

0.1.1
------

 - uncommented import __version__

0.1.0
------

 - reformatting to conform with PEP 8
 - added regexp support for matching crawl keywords and filter text keywords
 - improved url resolution by correcting domains and schemes
 - added --restrict option to restrict crawler links to only those with seed domain
 - made text the default write option rather than pdf, can now use --pdf to change that
 - removed page number being written to text, separator is now just a single blank line
 - improved construction of output file name

0.0.11
------

 - fixed missing comma in install_requires in setup.py
 - also labeled now as beta as there are still some kinks with crawling

0.0.10
------

 - now ignoring pdfkit load errors only if more than one link to try to prevent an empty pdf being created in case of error

0.0.9
------

 - pdfkit now ignores load errors and writes as many pages as possible

0.0.8
------

 - better implementation of crawler, can now scrape entire websites
 - added OrderedSet class to utils.py

0.0.7
------

 - changed --keywords to --filter and positional arg url to urls

0.0.6
------

 - use --keywords flag for filtering text
 - can pass multiple links now
 - will not write empty files anymore

0.0.5
------

 - added --verbose argument for use with pdfkit
 - improved output file name processing

0.0.4
------

 - accepts 0 or 1 url's, allowing a call with just --version

0.0.3
------

 - Moved utils.py to scrape/

0.0.2
------

 - First entry




