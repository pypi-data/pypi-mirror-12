#!/usr/bin/env python

#############################################################
#                                                           #
# cliquery - a command-line browsing utility                #
# written by Hunter Hammond (huntrar@gmail.com)             #
#                                                           #
#############################################################


from __future__ import absolute_import
import argparse as argp
from collections import OrderedDict
import glob
import os
import re
from subprocess import call
from string import ascii_letters
import sys
import time
import webbrowser

import requests_cache

from cliquery import utils
from . import __version__


SYS_VERSION = sys.version_info[0]
if SYS_VERSION == 2:
    try:
        input = raw_input
    except NameError:
        pass
    try:
        range = xrange
    except NameError:
        pass

XDG_CACHE_DIR = os.environ.get('XDG_CACHE_HOME',
                               os.path.join(os.path.expanduser('~'), '.cache'))
CACHE_DIR = os.path.join(XDG_CACHE_DIR, 'cliquery')
CACHE_FILE = os.path.join(CACHE_DIR, 'cache{0}'.format(
    SYS_VERSION if SYS_VERSION == 3 else ''))

''' The maximum length of a preview message before having to see more '''
PREVIEW_MSG_MAX = 200

''' The length of the link prompt border '''
BORDER_LEN = 28
BORDER = ' '.join(['+']*BORDER_LEN)

CONFIG_DIR = os.path.dirname(os.path.realpath(__file__))
if os.path.isfile('{0}/.local.cliqrc'.format(CONFIG_DIR)):
    CONFIG_FPATH = '{0}/.local.cliqrc'.format(CONFIG_DIR)
else:
    CONFIG_FPATH = '{0}/.cliqrc'.format(CONFIG_DIR)

CONFIG = {}

LINK_HELP = ('Enter one of the following flags abbreviated or not,'
             'possibly followed by a link number:\n'
             '\th, help      show this help message\n'
             '\ts, search    display search links\n'
             '\to, open      open link manually\n'
             '\tw, wolfram   display wolfram results\n'
             '\td, describe  display page snippet\n'
             '\tb, bookmark  view and modify bookmarks\n'
             '\tp, print     print link to stdout\n'
             '\tc, config    print location of config file\n'
             '\tv, version   display current version\n')

BOOKMARK_HELP = ('Usage: '
                 '\nopen: [num or suburl or tag..]'
                 '\nadd: add [url..]'
                 '\ntag: tag [num or suburl] [tag..]'
                 '\nuntag: untag [num or suburl or tag] [subtag..]'
                 '\nmove: move [num or suburl or tag] [num or suburl or tag]'
                 '\ndelete: del [num or suburl or tag..]'
                 '\n')

SEE_MORE = 'See more? [Press Enter] '


def get_parser():
    parser = argp.ArgumentParser(description='a command-line browsing utility')
    parser.add_argument('query', metavar='QUERY', type=str, nargs='*',
                        help='keywords to search')
    parser.add_argument('-b', '--bookmark', help='view and modify bookmarks',
                        action='store_true')
    parser.add_argument('-c', '--config', help='print location of config file',
                        action='store_true')
    parser.add_argument('-C', '--clear-cache', help='clear the cache',
                        action='store_true')
    parser.add_argument('-d', '--describe', help='display page snippet',
                        action='store_true')
    parser.add_argument('-f', '--first', help='open first link',
                        action='store_true')
    parser.add_argument('-o', '--open', help='open link or browser manually',
                        action='store_true')
    parser.add_argument('-p', '--print', help='print link to stdout and exit',
                        action='store_true')
    parser.add_argument('-s', '--search', help='display search links',
                        action='store_true')
    parser.add_argument('-v', '--version', help='display current version',
                        action='store_true')
    parser.add_argument('-w', '--wolfram', help='display wolfram results',
                        action='store_true')
    return parser


def read_config():
    with open(CONFIG_FPATH, 'r') as cfg:
        lines = []
        api_key = ''
        browser = ''

        ''' first two lines of .cliqrc must contain api_key: and browser: '''
        for _ in range(2):
            line = cfg.readline()
            if line.startswith('api_key:'):
                api_key = line[8:].strip()
            if line.startswith('browser:'):
                browser = line[8:].strip()
            else:
                lines.append(line)

        bkmarks = []
        cfg_bkmarks = cfg.read()
        if cfg_bkmarks.startswith('bookmarks:'):
            cfg_bkmarks = cfg_bkmarks[10:].split('\n')
            bkmarks = [b.strip() for b in cfg_bkmarks if b.strip()]

        if not api_key and not browser:
            try:
                api_key = lines[0].strip()
                browser = lines[1].strip()
                return api_key, browser, bkmarks
            except IndexError:
                return '', '', bkmarks
        else:
            return api_key, browser, bkmarks


def enable_cache():
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)
    requests_cache.install_cache(CACHE_FILE)


def clear_cache():
    for cache in glob.glob('{0}*'.format(CACHE_FILE)):
        os.remove(cache)


def get_search_html(args):
    url_args = args['query']
    if args['bookmark']:
        return ''
    if not args['open']:
        if not args['wolfram']:
            return get_bing_html(url_args)
        else:
            return get_wolfram_html(url_args)
    else:
        return ''


def get_bing_html(url_args):
    base_url = 'www.bing.com'
    return utils.get_html('http://{0}/search?q={1}'.format(base_url, url_args))


def get_wolfram_html(url_args):
    base_url = 'http://api.wolframalpha.com/v2/query?input='
    api = CONFIG['api_key']
    return utils.get_html('{0}{1}&appid={2}'.format(base_url, url_args, api))


def open_link_range(args, urls, input_args):
    ''' Open a link number range '''

    split_args = ''.join(input_args).split('-')
    start = split_args[0].strip()
    end = split_args[1].strip()

    start_is_num = utils.check_input(start, num=True)
    end_is_num = utils.check_input(end, num=True)
    if start_is_num and end_is_num:
        ''' Open close-ended range of urls '''
        if int(start) > 0 and int(end) <= len(urls)+1:
            for i in range(int(start), int(end)+1, 1):
                open_url(args, urls[i-1])
    elif start_is_num:
        ''' Open open-ended range of urls '''
        if int(start) > 0:
            for i in range(int(start), len(urls)+1, 1):
                open_url(args, urls[i-1])
    elif end_is_num:
        ''' Open open-ended range of urls '''
        if int(end) < len(urls)+1:
            for i in range(1, int(end)+1, 1):
                open_url(args, urls[i-1])


def open_links(args, urls, input_args):
    ''' Open one or more links '''

    if not isinstance(input_args, list):
        input_args = [input_args]

    for num in input_args:
        if not utils.check_input(num.strip(), num=True):
            return

    links = []
    for num in input_args:
        if int(num) > 0 and int(num) <= len(urls):
            links.append(urls[int(num)-1])
    open_url(args, links)


def exec_bkmark(args, urls, input_args):
    ''' If adding a bookmark resolve URL '''
    if 'add' in input_args:
        temp_args = []
        for i, arg in enumerate(input_args):
            if utils.check_input(arg, num=True):
                temp_args.append(urls[i-1])
            else:
                temp_args.append(arg)
        input_args = temp_args

    if utils.check_input(input_args):
        args['query'] = input_args
        search(args)


def exec_prompt_cmd(args, urls, input_cmd, input_args, display_prompt):
    ''' Execute a command in the link prompt '''

    ''' If input_cmd is not a letter assume cmd is open
        Behavior is determined by the last flag entered
    '''
    reset_flags = True
    if input_cmd[0] not in ascii_letters:
        input_args = [input_cmd] + input_args
        input_cmd = 'o'
        reset_flags = False

    ''' A dictionary containing possible flag inputs with abbrevs.
        Keys are the first letter of the flag name
        Possible flag inputs are listed in LINK_HELP
    '''
    for key, value in utils.get_flags(args).items():
        if key == input_cmd or value == input_cmd:
            ''' Reset all flags and set chosen flag to True '''
            if reset_flags:
                args = utils.reset_flags(args)
                args[value] = True

            if key == 'b':
                exec_bkmark(args, urls, input_args)
            elif key == 'd' or key == 'o' or key == 'p':
                ''' Open/Print/Describe link(s) '''

                ''' Remove commas '''
                if any([',' in arg for arg in input_args]):
                    input_args = ''.join(input_args).split(',')
                    input_args = [arg for arg in input_args if arg]

                if any(['-' in arg for arg in input_args]):
                    ''' Open a link number range '''
                    open_link_range(args, urls, input_args)
                elif input_args and display_prompt:
                    ''' Open one or more links '''
                    open_links(args, urls, input_args)
            elif key == 'f':
                args['query'] = urls[0]
                search(args)
            elif key == 'v':
                print(__version__)
            elif key == 'c':
                print(CONFIG_FPATH)
            elif key == 's':
                args['query'] = input_args
                search(args)


def show_link_prompt(args, urls, url_descs):
    ''' Print the URL descriptions and display a prompt '''

    display_prompt = True
    while display_prompt:
        print('\n{0}'.format(BORDER))
        for i in range(len(urls)):
            print_desc = (str(i+1) + '. ' + url_descs[i]).encode('utf-8')
            print(print_desc)  # Print url choices
        print(BORDER)

        ''' Handle link prompt input '''
        try:
            link_input = [inp.strip() for inp in input(': ').split()]
            if not link_input:
                continue

            input_cmd = link_input[0]
            input_args = link_input[1:]
            while input_cmd == 'h' or input_cmd == 'help':
                print(LINK_HELP)
                link_input = [inp.strip() for inp in input(': ').split()]
                input_cmd = link_input[0]
                input_args = link_input[1:]
            print('\n')

            ''' Check input in case of quit '''
            utils.check_input(link_input)
            exec_prompt_cmd(args, urls, input_cmd, input_args, display_prompt)
        except (KeyboardInterrupt, ValueError, IndexError):
            return False


def bing_search(args, html):
    ''' Perform a Bing search and show an interactive prompt '''
    if html is None:
        return open_url(args, 'https://www.google.com')

    base_url = 'www.bing.com'

    try:
        unprocessed_urls = html.xpath('//h2/a/@href')
    except AttributeError:
        raise AttributeError('Failed to retrieve data from lxml object!')

    if not unprocessed_urls:
        sys.stderr.write('Failed to retrieve links from Bing.\n')
        return None

    urls = []
    url_descs = []
    for url in unprocessed_urls:
        if url.startswith('http://') or url.startswith('https://'):
            urls.append(url)
            if "'" in url:
                ld_xpath = '//h2/a[@href="{0}"]//text()'.format(url)
            else:
                ld_xpath = "//h2/a[@href='{0}']//text()".format(url)

            url_descs.append(''.join(html.xpath(ld_xpath)))
        elif url.startswith('/images/') or url.startswith('/videos/'):
            if base_url not in url:
                ''' Add missing base url to image links '''
                urls.append('http://{0}{1}'.format(base_url, url))
                if "'" in url:
                    ld_xpath = '//h2/a[@href="{0}"]//text()'.format(url)
                else:
                    ld_xpath = "//h2/a[@href='{0}']//text()".format(url)

                url_descs.append(''.join(html.xpath(ld_xpath)))

    if urls and url_descs:
        return show_link_prompt(args, urls, url_descs)

    return False


def clean_wolfram_entries(titles, entries):
    ''' Clean formatting '''

    output_list = []
    for title, entry in zip(titles, entries):
        try:
            if ' |' in entry:
                entry = '\n\t{0}'.format(entry.replace(' |', ':')
                                         .replace('\n', '\n\t'))
            if title == 'Result':
                output_list.append(entry.encode('utf-8'))
            else:
                output_list.append(title + ': ' + entry).encode('utf-8')
        except (AttributeError, UnicodeEncodeError):
            pass
    return output_list


def wolfram_search(args, html):
    ''' Search WolframAlpha using their API, requires API key in .cliqrc '''
    if html is None:
        return open_url(args, 'http://www.wolframalpha.com')

    try:
        ''' Filter unnecessary title fields '''
        titles = list(OrderedDict.fromkeys(
            html.xpath("//pod[@title != '' and "
                       "@title != 'Number line' and "
                       "@title != 'Input' and "
                       "@title != 'Visual representation' and "
                       "@title != 'Image' and "
                       "@title != 'Manipulatives illustration' and "
                       "@title != 'Quotient and remainder']"
                       "/@title")))
    except AttributeError:
        raise AttributeError('Failed to retrieve data from lxml object!')

    entries = []
    if titles:
        for title in titles:
            entry_xpath = ("//pod[@title='{0}']/subpod/plaintext/text()"
                           .format(title.encode('ascii', 'ignore')))
            entry = html.xpath(entry_xpath)
            if entry:
                entries.append(entry[0])

        entries = list(OrderedDict.fromkeys(entries))

        ''' Return False if results were empty '''
        if len(entries) == 1 and entries[0] == '{}':
            return False

        output_list = clean_wolfram_entries(titles, entries)
        if not output_list:
            return False
        elif len(output_list) > 2:
            print('\n'.join(output_list[:2]).encode('utf-8'))

            if utils.check_input(input(SEE_MORE), empty=True):
                print('\n'.join(output_list[2:]).encode('utf-8'))
        else:
            print('\n'.join(output_list).encode('utf-8'))
        return True
    else:
        return False


def bing_instant(html):
    ''' Check for a Bing instant result '''
    try:
        inst_result = html.xpath('//span[@id="rcTB"]/text()'
                                 '|//div[@class="b_focusTextMedium"]/text()'
                                 '|//p[@class="b_secondaryFocus df_p"]'
                                 '/text()'
                                 '|//div[@class="b_xlText b_secondaryText"]'
                                 '/text()'
                                 '|//input[@id="uc_rv"]/@value'
                                 '|//ol[@class="b_dList b_indent"]'  # define
                                 '/li/div/text()')
    except AttributeError:
        raise AttributeError('Failed to retrieve data from lxml object!')

    try:
        if inst_result:
            if len(inst_result) == 1:
                print(inst_result[0].encode('utf-8'))
            else:
                print('\n'.join(inst_result).encode('utf-8'))
            return True
    except AttributeError:
        pass
    return False


def open_first(args, html):
    ''' Open the first Bing link available, `Feeling Lucky` '''
    base_url = 'www.bing.com'

    try:
        bing_urls = html.xpath('//h2/a/@href')

        if not bing_urls:
            sys.stderr.write('Failed to retrieve links from Bing.\n')
            return None

        if args['describe']:
            url = ''
            for bing_url in bing_urls:
                if (not bing_url.startswith('/images/') and
                        not bing_url.startswith('/videos/')):
                    url = bing_url
                    break
            if not url:
                sys.stderr.write('Failed to find a link to describe.\n')
                return None
        else:
            url = bing_urls[0]
    except (AttributeError, IndexError):
        raise AttributeError('Failed to retrieve data from lxml object!')

    if url.startswith('/images/') or url.startswith('/videos/'):
        url = 'http://{0}{1}'.format(base_url, url)

    if url.startswith('http://') or url.startswith('https://'):
        return open_url(args, url)
    else:
        return open_url(args, 'http://{0}'.format(url))


def reload_bookmarks():
    CONFIG['bookmarks'] = read_config()[2]


def find_bookmark_idx(url_arg):
    bkmarks = CONFIG['bookmarks']

    url_arg = url_arg.strip()
    for i, bkmark in enumerate(bkmarks):
        if url_arg in bkmark:
            return i+1
    return -1


def add_bookmark(urls):
    try:
        with open(CONFIG_FPATH, 'a') as cfg:
            if isinstance(urls, list):
                for url in urls:
                    cfg.write('\n{0}'.format(url))
            elif isinstance(urls, str):
                cfg.write('\n{0}'.format(urls))
        reload_bookmarks()
        return True
    except Exception as err:
        sys.stderr.write('Error adding bookmark: {0}\n'.format(str(err)))
        return False


def tag_bookmark(bk_idx, tags):
    try:
        bkmarks = CONFIG['bookmarks']

        if isinstance(tags, list):
            tags = ' '.join(tags)

        with open(CONFIG_FPATH, 'w') as cfg:
            cfg.write('api_key: {0}'.format(CONFIG['api_key']))
            cfg.write('\nbrowser: {0}'.format(CONFIG['browser']))
            cfg.write('\nbookmarks: ')

            for i, bkmark in enumerate(bkmarks):
                if i == int(bk_idx)-1:
                    ''' Save previous tags if any, enclosed in parentheses '''
                    prev_tags = re.search('(?<=\().*(?=\))', bkmark)
                    if prev_tags:
                        tags = '{0} {1}'.format(prev_tags.group(), tags)

                    cfg.write('\n{0} ({1})'
                              .format(bkmark.split('(')[0].strip(), tags))
                else:
                    cfg.write('\n{0}'.format(bkmark))
        reload_bookmarks()
        return True
    except Exception as err:
        sys.stderr.write('Error tagging bookmark: {0}\n'.format(str(err)))
        return False


def untag_bookmark(bk_idx, tags_to_rm):
    try:
        bkmarks = CONFIG['bookmarks']

        with open(CONFIG_FPATH, 'w') as cfg:
            cfg.write('api_key: {0}'.format(CONFIG['api_key']))
            cfg.write('\nbrowser: {0}'.format(CONFIG['browser']))
            cfg.write('\nbookmarks: ')

            for i, bkmark in enumerate(bkmarks):
                if i == int(bk_idx)-1 and '(' in bkmark and ')' in bkmark:
                    ''' Remove tags '''
                    split_bkmark = bkmark.split('(')

                    if tags_to_rm:
                        curr_tags = split_bkmark[1].rstrip(')').split()
                        new_tags = list(curr_tags)

                        ''' Match current tags by substrings of tags to rm '''
                        for tag in curr_tags:
                            for rm_tag in tags_to_rm:
                                if rm_tag in tag:
                                    new_tags.remove(tag)

                        if new_tags:
                            cfg.write('\n{0} ({1})'.format(split_bkmark[0],
                                                           ' '.join(new_tags)))
                        else:
                            cfg.write('\n{0}'.format(split_bkmark[0]))
                    else:
                        cfg.write('\n{0}'.format(split_bkmark[0]))
                else:
                    cfg.write('\n{0}'.format(bkmark))
        reload_bookmarks()
        return True
    except Exception as err:
        sys.stderr.write('Error untagging bookmark: {0}\n'.format(str(err)))
        return False


def mv_bookmarks(bk1, bk2):
    try:
        bkmarks = CONFIG['bookmarks']
        b_len = len(bkmarks)

        with open(CONFIG_FPATH, 'w') as cfg:
            cfg.write('api_key: {0}'.format(CONFIG['api_key']))
            cfg.write('\nbrowser: {0}'.format(CONFIG['browser']))
            cfg.write('\nbookmarks: ')

            idx1 = int(bk1)-1
            idx2 = int(bk2)-1

            ''' Pairs that are both out of range are incorrect '''
            if (idx1 < 0 or idx1 >= b_len) and (idx2 < 0 or idx2 >= b_len):
                sys.stderr.write('Both bookmark indices out of range.\n')
                return True

            ''' Move a bookmark to the start or end, or swap two '''
            if idx1 < 0:
                if idx2 >= 0 and idx2 < b_len:
                    bkmarks.insert(0, bkmarks.pop(idx2))
            elif idx1 >= len(bkmarks):
                if idx2 >= 0 and idx2 < b_len:
                    bkmarks.append(bkmarks.pop(idx2))
            elif idx2 < 0:
                if idx1 >= 0 and idx1 < b_len:
                    bkmarks.insert(0, bkmarks.pop(idx1))
            elif idx2 >= len(bkmarks):
                if idx1 >= 0 and idx1 < b_len:
                    bkmarks.append(bkmarks.pop(idx1))
            else:
                bkmarks[idx1], bkmarks[idx2] = bkmarks[idx2], bkmarks[idx1]

            for bkmark in bkmarks:
                cfg.write('\n{0}'.format(bkmark))
        reload_bookmarks()
        return True
    except Exception as err:
        sys.stderr.write('Error moving bookmarks: {0}\n'.format(str(err)))
        return False


def del_bookmark(bk_idx):
    try:
        bkmarks = CONFIG['bookmarks']

        with open(CONFIG_FPATH, 'w') as cfg:
            cfg.write('api_key: {0}'.format(CONFIG['api_key']))
            cfg.write('\nbrowser: {0}'.format(CONFIG['browser']))
            cfg.write('\nbookmarks: ')

            if isinstance(bk_idx, list):
                bk_idx = [int(x)-1 for x in bk_idx]
                for i, bkmark in enumerate(bkmarks):
                    if i not in bk_idx:
                        cfg.write('\n{0}'.format(bkmark))
            else:
                for i, bkmark in enumerate(bkmarks):
                    if i != int(bk_idx)-1:
                        cfg.write('\n{0}'.format(bkmark))
        reload_bookmarks()
        return True
    except Exception as err:
        sys.stderr.write('Error deleting bookmark: {0}\n'.format(str(err)))
        return False


def print_bookmarks(bkmarks):
    print('Bookmarks:')
    for i, bkmark in enumerate(bkmarks):
        if '(' in bkmark and ')' in bkmark:
            bkmark = bkmark.split('(')[1].rstrip(')')
        print('{0}. {1}'.format(str(i+1), bkmark))
    return True


def bkmark_add_cmd(url_arg):
    ''' add: add [url] '''

    url_arg = url_arg[3:].strip()
    url_args = url_arg.split()

    clean_bkmarks = []
    for u_arg in url_args:
        u_arg = utils.append_scheme(u_arg)

        if '.' not in u_arg:
            u_arg = '{0}.com'.format(u_arg)

        clean_bkmarks.append(u_arg)

    return add_bookmark(clean_bkmarks)


def bkmark_tag_cmd(url_arg):
    ''' tag: tag [num or suburl] [tag]'''
    split_args = url_arg[3:].strip().split()
    url_arg = split_args[0]
    tags = split_args[1:]

    if not utils.check_input(url_arg, num=True):
        ''' If input is not a number then find the correct number '''

        bk_idx = find_bookmark_idx(url_arg)
        if bk_idx > 0:
            url_arg = bk_idx

    if utils.check_input(url_arg, num=True):
        return tag_bookmark(url_arg, tags)
    else:
        sys.stderr.write('Failed to tag bookmark {0}.\n'
                         .format(str(url_arg)))


def bkmark_untag_cmd(url_arg):
    ''' untag: untag [num or suburl or tag] '''
    split_args = url_arg[5:].strip().split()
    tags_to_rm = split_args[1:]

    ''' Find the bookmark index '''
    bkmark_idx = 0
    if not utils.check_input(split_args[0], num=True):
        ''' If input is not a number then find the correct number '''

        bk_idx = find_bookmark_idx(split_args[0])
        if bk_idx > 0:
            bkmark_idx = bk_idx
    else:
        bkmark_idx = split_args[0]

    return untag_bookmark(bkmark_idx, tags_to_rm)


def bkmark_move_cmd(url_arg):
    split_args = url_arg[4:].strip().split()
    bk1 = bk1_idx = split_args[0]
    bk2 = bk2_idx = split_args[1]

    if len(split_args) != 2:
        sys.stderr.write(BOOKMARK_HELP)
        return True

    if not utils.check_input(bk1, num=True):
        bk1_idx = find_bookmark_idx(bk1)
    if not utils.check_input(bk2, num=True):
        bk2_idx = find_bookmark_idx(bk2)

    if bk1_idx < 0:
        sys.stderr.write('Failed to find bookmark {0}.\n'.format(bk1))
        return False
    if bk2_idx < 0:
        sys.stderr.write('Failed to find bookmark {0}.\n'.format(bk2))
        return False

    return mv_bookmarks(bk1_idx, bk2_idx)


def bkmark_del_cmd(url_arg):
    ''' delete: del [num or suburl or tag] '''
    split_args = url_arg[3:].strip().split()

    bkmark_idxs = []
    for u_arg in split_args:
        if not utils.check_input(u_arg, num=True):
            ''' If input is not a number then find the correct number '''

            bk_idx = find_bookmark_idx(u_arg)
            if bk_idx > 0:
                bkmark_idxs.append(bk_idx)
        else:
            bkmark_idxs.append(u_arg)

    return del_bookmark(bkmark_idxs)


def bkmark_open_cmd(args, url_arg, bkmarks):
    ''' open: [num or suburl or tag] '''
    split_args = url_arg.strip().split()

    for u_arg in split_args:
        if utils.check_input(u_arg, num=True):
            ''' open: [num] '''
            try:
                bkmark = bkmarks[int(u_arg) - 1]
                if '(' in bkmark and ')' in bkmark:
                    open_url(args, bkmark.split('(')[0].strip())
                else:
                    open_url(args, bkmark)
                return True
            except IndexError:
                sys.stderr.write('Bookmark {0} not found.\n'
                                 .format(u_arg))
                return False
        else:
            ''' open: [suburl or tag] '''
            bk_idx = find_bookmark_idx(u_arg)
            if bk_idx > 0:
                try:
                    bkmark = bkmarks[int(bk_idx)-1]
                    if '(' in bkmark and ')' in bkmark:
                        open_url(args, bkmark.split('(')[0].strip())
                    else:
                        open_url(args, bkmark)
                    return True
                except IndexError:
                    sys.stderr.write('Bookmark {0} not found.\n'
                                     .format(bk_idx))
                    return False
            else:
                sys.stderr.write(BOOKMARK_HELP)
                return True


def bookmarks(args, url_arg):
    ''' Open, add, tag, untag, move, or delete bookmarks '''
    bkmarks = CONFIG['bookmarks']

    if isinstance(url_arg, list):
        url_arg = ' '.join(url_arg)

    if not url_arg:
        ''' Print bookmarks if no arguments provided '''
        return print_bookmarks(bkmarks)

    if url_arg.startswith('add'):
        return bkmark_add_cmd(url_arg)
    elif url_arg.startswith('tag'):
        return bkmark_tag_cmd(url_arg)
    elif url_arg.startswith('untag'):
        return bkmark_untag_cmd(url_arg)
    elif url_arg.startswith('move'):
        return bkmark_move_cmd(url_arg)
    elif url_arg.startswith('del'):
        return bkmark_del_cmd(url_arg)
    else:
        return bkmark_open_cmd(args, url_arg, bkmarks)


def open_browser(url):
    if CONFIG['browser'] == 'cygwin':
        call(['cygstart', url])
    else:
        if CONFIG['br']:
            CONFIG['br'].open(url)
        else:
            sys.stderr.write('Failed to open browser.\n')


def open_url(args, urls):
    if args['print']:
        urls = utils.append_scheme(urls)
        if isinstance(urls, list):
            for url in urls:
                print(url)
        else:
            print(urls)
        return urls
    elif args['describe']:
        urls = utils.append_scheme(urls)
        if isinstance(urls, list):
            for url in urls:
                describe_url(url)
        else:
            describe_url(urls)
        return urls
    else:
        if not urls:
            open_browser('')
        else:
            urls = utils.append_scheme(urls)
            if isinstance(urls, list):
                for url in urls:
                    open_browser(url)
            else:
                open_browser(urls)
        return True


def describe_url(url):
    ''' Print the text of a given url
        Printed lines must be greater than the average length / qualifier
    '''
    try:
        if url.startswith('/images/') or url.startswith('/videos/'):
            sys.stderr.write('Link was an image/video, could not describe.\n')
            return False
        elif not url.startswith('http://') and not url.startswith('https://'):
            desc_url = 'http://{0}'.format(url)
        else:
            desc_url = url
    except AttributeError:
        sys.stderr.write('Failed to describe link {0}\n.'.format(url))
        return False

    qualifier = 5

    html = utils.get_html(desc_url)
    body = ''.join(html.xpath('//body//*[not(self::script) and '
                              'not(self::style)]/text()')).split('\n')
    if not body:
        print(('{0}\n'.format(desc_url)).encode('utf-8'))
        print('Extended description not found.\n')
        return False

    stripped_body = []
    for line in body:
        stripped_body.append(line.strip())

    filtered_body = list(filter(None, stripped_body))
    if not filtered_body:
        print(('{0}\n'.format(desc_url)).encode('utf-8'))
        print('Extended description not found.\n')
        return False

    body_sum = 0
    for line in filtered_body:
        body_sum += len(line)
    body_avg_sum = body_sum / len(filtered_body)+1
    print_body = []

    ''' Print lines greater than the average length / qualifier '''
    for line in filtered_body:
        if len(line) > (body_avg_sum / qualifier):
            print_body.append(line)

    if print_body:
        print(('{0}\n'.format(desc_url)).encode('utf-8'))

        see_more = False
        msg_count = 0
        for msg in print_body:
            msg_count += len(msg)
            print(msg.encode('utf-8'))
            if msg_count > PREVIEW_MSG_MAX:
                if not utils.check_input(input(SEE_MORE), empty=True):
                    break
                see_more = True
                msg_count = 0
                print('')
    else:
        print(('{0}\n'.format(desc_url)).encode('utf-8'))
        print('Extended description not found.\n')
        return False

    if not see_more:
        time.sleep(1)

    print('')
    return True


def search(args):
    opn, bkm = args['open'], args['bookmark']
    src, wolf = args['search'], args['wolfram']

    ''' A query may be blank for only these flags above '''
    if not args['query'] and not opn and not bkm and not src and not wolf:
        sys.stderr.write('No search terms entered.\n')
        return False

    if args['query']:
        args['query'] = utils.clean_query(' '.join(args['query']),
                                          args['open'], args['bookmark'])
        html = get_search_html(args)
    else:
        html = None
    url_args = args['query']

    ''' Default search if no flags provided or Wolfram search fails '''
    default_search = False

    if args['open']:
        ''' Open a link manually '''
        return open_url(args, url_args)
    elif args['bookmark']:
        ''' Add, delete, or open bookmarks '''
        return bookmarks(args, url_args)
    elif args['search']:
        ''' Perform a Bing search and show an interactive prompt '''
        return bing_search(args, html)
    elif args['first']:
        ''' Open the first Bing link available, `Feeling Lucky` '''
        return open_first(args, html)
    elif args['wolfram']:
        ''' Search WolframAlpha and continues search if failed '''
        success = wolfram_search(args, html)
        if not success:
            default_search = True
        else:
            return success
    else:
        default_search = True

    if default_search:
        ''' Default program behavior
            1. Check Bing for an instant result
            2. Check WolframAlpha for a result
            3. Check Bing for search results
        '''
        result = None

        if args['wolfram']:
            bing_html = get_bing_html(url_args)
            wolf_html = html
        else:
            bing_html = html

        result = bing_instant(bing_html)
        if not result:
            if not args['wolfram']:
                wolf_html = get_wolfram_html(url_args)
            result = wolfram_search(args, wolf_html)
            if not result:
                return bing_search(args, bing_html)
        return result


def command_line_runner():
    parser = get_parser()
    args = vars(parser.parse_args())

    api_key, browser, bkmarks = read_config()
    CONFIG['api_key'] = api_key
    CONFIG['browser'] = browser
    CONFIG['bookmarks'] = bkmarks

    try:
        if browser and browser != 'cygwin':
            CONFIG['br'] = webbrowser.get(browser)
        else:
            CONFIG['br'] = webbrowser.get()
    except webbrowser.Error as err:
        sys.stderr.write('{0}: {1}\n'.format(str(err), browser))

    if args['version']:
        print(__version__)
        return

    if args['config']:
        print(CONFIG_FPATH)
        return

    if args['clear_cache']:
        clear_cache()
        print('Cleared {0}.'.format(CACHE_DIR))
        return

    ''' Enable cache unless user sets environ variable CLIQ_DISABLE_CACHE '''
    if not os.getenv('CLIQ_DISABLE_CACHE'):
        enable_cache()

    if not api_key and args['wolfram']:
        args['wolfram'] = False
        sys.stderr.write('Missing WolframAlpha API key in .cliqrc!\n')

    opn, bkm = args['open'], args['bookmark']
    src, wolf = args['search'], args['wolfram']

    ''' A query may be blank for only these flags above '''
    if not args['query'] and not opn and not bkm and not src and not wolf:
        parser = get_parser()
        parser.print_help()
        return
    else:
        search(args)


if __name__ == '__main__':
    command_line_runner()
