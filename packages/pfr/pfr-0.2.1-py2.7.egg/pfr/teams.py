import datetime
import re
import urlparse

import requests
import numpy as np
import pandas as pd
from pyquery import PyQuery as pq

import pfr

__all__ = [
    'listTeams',
    'Team',
]

yr = datetime.datetime.now().year

def listTeams():
    doc = pfr.utils.getDoc(pfr.BASE_URL + '/teams/')
    table = doc('table#teams_active')
    df = pfr.utils.parseTable(table)
    return df.team_name.str[:3].values

class Team:

    def __init__(self, teamID):
        self.teamID = teamID
        self.relURL = '/teams/{}'.format(self.teamID)
        self.teamURL = urlparse.urljoin(BASE_URL, self.relURL)
        self.teamYearURL = lambda yr: urlparse.urljoin(
            BASE_URL, '/teams/{}/{}.htm'.format(self.teamID, yr))

    def name(self):
        """Returns the real name of the franchise given a team ID.

        Examples:
        'nwe' -> 'New England Patriots'
        'sea' -> 'Seattle Seahawks'

        :returns: A string corresponding to the team's full name.
        """
        doc = pfr.utils.getDoc(BASE_URL + '/teams/{}/'.format(self.teamID))
        headerwords = doc('div#info_box h1')[0].text_content().split()
        lastIdx = headerwords.index('Franchise')
        teamwords = headerwords[:lastIdx]
        return ' '.join(teamwords)

    def roster(self, year=yr):
        """Returns the roster table for the given year.

        :year: The year for which we want the roster; defaults to current year.
        :returns: A DataFrame containing roster information for that year.
        """
        raise "not yet implemented"

    def boxscores(self, year=yr):
        """Gets list of BoxScore objects corresponding to the box scores from
        that year.

        :year: The year for which we want the boxscores; defaults to current
        year.
        :returns: list of BoxScore objects
        """
        doc = pq(self.teamYearURL(year))
        table = doc('table#team_gamelogs')
        df = pfr.utils.parseTable(table)
        return df.boxscore_word.dropna().apply(pfr.boxscores.BoxScore).values
