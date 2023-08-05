
# Copyright (c) 2013 Calin Crisan
# This file is part of motionEye.
#
# motionEye is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>. 

import logging
import urllib2
import urlparse

import settings


def parse_options(parser, args):
    parser.add_argument('method', help='the HTTP method to use')
    parser.add_argument('url', help='the URL for the request')

    return parser.parse_args(args)


def main(parser, args):
    import meyectl
    
    options = parse_options(parser, args)
    
    meyectl.configure_logging('webhook', options.log_to_file)
    meyectl.configure_tornado()

    logging.debug('hello!')
    logging.debug('method = %s' % options.method)
    logging.debug('url = %s' % options.url)
    
    if options.method == 'POST':
        parts = urlparse.urlparse(options.url)
        data = parts.query

    else:
        data = None

    request = urllib2.Request(options.url, data)
    try:
        urllib2.urlopen(request, timeout=settings.REMOTE_REQUEST_TIMEOUT)
        logging.debug('webhook successfully called')
    
    except Exception as e:
        logging.error('failed to call webhook: %s' % e)

    logging.debug('bye!')
