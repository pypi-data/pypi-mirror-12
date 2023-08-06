# -*- coding: utf-8 -*-
"""
Created on Tue Aug 11 16:05:22 2015

@author: thomas.douenne
"""

import pkg_resources
import os

from ipp_macro_series_parser.agregats_transports.parser_cleaner_prix_carburants import prix_annuel_carburants_90_14, \
    prix_mensuel_carburants_90_15

prix_annuel_carburants_90_14['Date'] = prix_annuel_carburants_90_14['Date'].astype(int)
prix_annuel_carburants_90_14 = prix_annuel_carburants_90_14.set_index('Date')

prix_mensuel_carburants_90_15[['annee'] + ['mois']] = prix_mensuel_carburants_90_15[['annee'] + ['mois']].astype(str)
prix_mensuel_carburants_90_15['Date'] = \
    prix_mensuel_carburants_90_15['annee'] + '/' + prix_mensuel_carburants_90_15['mois']
prix_mensuel_carburants_90_15 = prix_mensuel_carburants_90_15.drop(['annee', 'mois'], axis = 1)
prix_mensuel_carburants_90_15 = prix_mensuel_carburants_90_15.set_index('Date')

assets_directory = os.path.join(
    pkg_resources.get_distribution('openfisca_france_indirect_taxation').location
    )

prix_annuel_carburants_90_14.to_csv(os.path.join(assets_directory, 'openfisca_france_indirect_taxation', 'assets',
    'prix_annuel_carburants.csv'), sep = ';')
prix_mensuel_carburants_90_15.to_csv(os.path.join(assets_directory, 'openfisca_france_indirect_taxation', 'assets',
    'prix_mensuel_carburants.csv'), sep = ';')
