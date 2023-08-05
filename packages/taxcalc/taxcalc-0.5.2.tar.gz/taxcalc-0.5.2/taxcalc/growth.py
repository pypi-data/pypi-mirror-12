import copy
import json
import os
import numpy as np
from .policy import Policy
from .parameters_base import ParametersBase


class Growth(ParametersBase):

    JSON_START_YEAR = Policy.JSON_START_YEAR
    DEFAULTS_FILENAME = 'growth.json'
    DEFAULT_NUM_YEARS = Policy.DEFAULT_NUM_YEARS
    DEFAULT_INFLATION_RATES = {2013: 0.015, 2014: 0.020, 2015: 0.022,
                               2016: 0.020, 2017: 0.021, 2018: 0.022,
                               2019: 0.023, 2020: 0.024, 2021: 0.024,
                               2022: 0.024, 2023: 0.024, 2024: 0.024}

    def __init__(self, growth_dict=None,
                 start_year=JSON_START_YEAR,
                 num_years=DEFAULT_NUM_YEARS,
                 inflation_rates=DEFAULT_INFLATION_RATES):
        if growth_dict:
            if not isinstance(growth_dict, dict):
                raise ValueError('growth_dict is not a dictionary')
            self._vals = growth_dict
        else:  # if None, read defaults
            self._vals = self._params_dict_from_json_file()

        self.initialize(start_year, num_years)

    def update_economic_growth(self, reform):
        '''Update economic growth rates/targets
        for a reform, a dictionary
        consisting of year: modification dictionaries. For example:
        {2014: {'_BE_inc': [0.4, 0.3]}}'''
        self.set_default_vals()
        if self.current_year != self.start_year:
            self.set_year(self.start_year)

        for year in reform:
            if year != self.start_year:
                self.set_year(year)
            self._update({year: reform[year]})


def adjustment(calc, percentage, year):
    records = calc.records
    records.BF.AGDPN[year] += percentage
    records.BF.ATXPY[year] += percentage
    records.BF.AWAGE[year] += percentage
    records.BF.ASCHCI[year] += percentage
    records.BF.ASCHCL[year] += percentage
    records.BF.ASCHF[year] += percentage
    records.BF.AINTS[year] += percentage
    records.BF.ADIVS[year] += percentage
    records.BF.ACGNS[year] += percentage
    records.BF.ASCHEI[year] += percentage
    records.BF.ASCHEL[year] += percentage
    records.BF.ABOOK[year] += percentage
    records.BF.ACPIU[year] += percentage
    records.BF.ACPIM[year] += percentage
    records.BF.ASOCSEC[year] += percentage
    records.BF.AUCOMP[year] += percentage
    records.BF.AIPD[year] += percentage


def target(calc, target, inflation, year):
    # 2013 is the start year of all parameter arrays. Hard coded for now.
    # Need to be fixed later
    records = calc.records
    default_year = calc.policy.JSON_START_YEAR
    if year >= default_year and target[year - default_year] != 0:
        # user inputs theoretically should be based on GDP
        g = abs(records.BF.AGDPN[year] - 1)
        distance = (target[year - default_year] +
                    inflation[year - default_year]) - g

        # apply this ratio to all the dollar amount factors
        records.BF.AGDPN[year] += distance
        records.BF.ATXPY[year] += distance
        records.BF.AWAGE[year] += distance
        records.BF.ASCHCI[year] += distance
        records.BF.ASCHCL[year] += distance
        records.BF.ASCHF[year] += distance
        records.BF.AINTS[year] += distance
        records.BF.ADIVS[year] += distance
        records.BF.ACGNS[year] += distance
        records.BF.ASCHEI[year] += distance
        records.BF.ASCHEL[year] += distance
        records.BF.ABOOK[year] += distance
        records.BF.ACPIU[year] += distance
        records.BF.ACPIM[year] += distance
        records.BF.ASOCSEC[year] += distance
        records.BF.AUCOMP[year] += distance
        records.BF.AIPD[year] += distance
