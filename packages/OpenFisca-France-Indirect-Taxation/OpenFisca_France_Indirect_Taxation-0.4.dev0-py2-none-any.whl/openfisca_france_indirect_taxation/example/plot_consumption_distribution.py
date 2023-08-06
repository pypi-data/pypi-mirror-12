# -*- coding: utf-8 -*-


# OpenFisca -- A versatile microsimulation software
# By: OpenFisca Team <contact@openfisca.fr>
#
# Copyright (C) 2011, 2012, 2013, 2014 OpenFisca Team
# https://github.com/openfisca
#
# This file is part of OpenFisca.
#
# OpenFisca is free software; you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# OpenFisca is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from __future__ import division

from openfisca_france_indirect_taxation.example.utils_example import simulate_df, df_weighted_average_grouped, \
    graph_builder_bar


if __name__ == '__main__':
    import logging
    log = logging.getLogger(__name__)
    import sys
    logging.basicConfig(level = logging.INFO, stream = sys.stdout)


# Exemple: graphe par décile de revenu par uc de la ventilation de la consommation selon les postes agrégés de la CN
    # Lite des coicop agrégées en 12 postes
    list_coicop12 = []
    for coicop12_index in range(1, 13):
        list_coicop12.append('coicop12_{}'.format(coicop12_index))

    # Liste des variables que l'on veut simuler
    var_to_be_simulated = [
        'niveau_vie_decile',
        'consommation_totale',
        'pondmen',
        ]
    # Merge des deux listes
    var_to_be_simulated += list_coicop12

    # Constition d'une base de données agrégée par décile (= collapse en stata)
    for year in [2000, 2005, 2011]:
        simulation_data_frame = simulate_df(var_to_be_simulated = var_to_be_simulated, year = year)
        var_to_concat = list_coicop12 + ['consommation_totale']
        aggregates_data_frame = df_weighted_average_grouped(dataframe = simulation_data_frame,
            groupe = 'niveau_vie_decile', varlist = var_to_concat)

        # Construction des parts
        list_part_coicop12 = []
        for i in range(1, 13):
            aggregates_data_frame['part_coicop12_{}'.format(i)] = \
                aggregates_data_frame['coicop12_{}'.format(i)] / aggregates_data_frame['consommation_totale']
            'list_part_coicop12_{}'.format(i)
            list_part_coicop12.append('part_coicop12_{}'.format(i))

        df_to_graph = aggregates_data_frame[list_part_coicop12]

        graph_builder_bar(df_to_graph)
