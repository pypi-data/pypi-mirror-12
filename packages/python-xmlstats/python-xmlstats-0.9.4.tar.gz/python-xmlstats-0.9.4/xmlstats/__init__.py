# -*- coding: utf-8 -*-
import sys
import io
import http.client
import http
import urllib
import urllib.request
import gzip
import json
import socket
import ssl
from time import sleep
from datetime import datetime


class ServerError(Exception):
    """
        raise when take error from server
    """
    pass


class UrlError(Exception):
    """
        raise when url error
    """
    pass


class XMLStats:

    def __init__(self, access_token, email):
        self.access_token = access_token
        self.user_agent = "python-xmlstats/0.7 ({email})".format(email=email)

    def make_request(self, host, sport, method, id, format, parameters):

        url = self._build_url(host, sport, method,
                              id, format, parameters)
        req = urllib.request.Request(url)
        req.add_header("Authorization", "Bearer " + self.access_token)
        # Set user agent
        req.add_header("User-agent", self.user_agent)
        # Tell server we can handle gzipped content
        req.add_header("Accept-encoding", "gzip")

        try:
            response = urllib.request.urlopen(req)
        except urllib.request.HTTPError as err:
            if err.code == 429:
                future = int(err.headers['xmlstats-api-reset'])
                now = int(datetime.now().strftime('%s'))
                delta = future-now
                print('wait {0} sec'.format(delta))
                sleep(delta)
                return self.make_request(host, sport, method, id, format, parameters)
            raise ServerError(
                "Server returned {code} error code!\n{message}".format(
                    code=err.code,
                    message=json.loads(err.read().decode('utf-8'))), err.code)
        except urllib.request.URLError as err:
            raise UrlError(
                "Error retrieving file: {}".format(
                    err.reason))

        data = None
        if "gzip" == response.info().get("Content-encoding"):
            buf = io.BytesIO(response.read())
            f = gzip.GzipFile(fileobj=buf)
            data = f.read()
        else:
            data = response.read()

        return json.loads(data.decode('utf-8'))

    def _build_url(self, host, sport, method, id, format, parameters):
        """
            build url from args
        """
        path = "/".join(filter(None, (sport, method, id)))
        url = "https://" + host + "/" + path + "." + format
        if parameters:
            paramstring = urllib.parse.urlencode(parameters)
            url = url + "?" + paramstring
        return url

    def get_teams(self):
        """ Return json current roster of team """
        return self.make_request(host="erikberg.com", sport='nba',
                                 method="teams", id=None,
                                 format="json",
                                 parameters={})
