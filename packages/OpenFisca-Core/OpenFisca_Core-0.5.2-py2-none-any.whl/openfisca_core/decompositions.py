# -*- coding: utf-8 -*-


# OpenFisca -- A versatile microsimulation software
# By: OpenFisca Team <contact@openfisca.fr>
#
# Copyright (C) 2011, 2012, 2013, 2014, 2015 OpenFisca Team
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


import collections
import copy
import os
import xml

from . import conv
from . import decompositionsxml


def calculate(simulations, decomposition_json):
    assert decomposition_json is not None

    response_json = copy.deepcopy(decomposition_json)  # Use decomposition as a skeleton for response.
    for node in iter_decomposition_nodes(response_json, children_first = True):
        children = node.get('children')
        if children:
            node['values'] = map(lambda *l: sum(l), *(
                child['values']
                for child in children
                ))
        else:
            node['values'] = values = []
            for simulation in simulations:
                simulation.calculate_output(node['code'])
                holder = simulation.get_holder(node['code'])
                column = holder.column
                values.extend(
                    column.transform_value_to_json(value)
                    for value in holder.new_test_case_array(simulation.period).tolist()
                    )
    return response_json


def get_decomposition_json(tax_benefit_system, xml_file_path = None):
    if xml_file_path is None:
        xml_file_path = os.path.join(tax_benefit_system.DECOMP_DIR, tax_benefit_system.DEFAULT_DECOMP_FILE)
    decomposition_tree = xml.etree.ElementTree.parse(xml_file_path)
    decomposition_xml_json = conv.check(decompositionsxml.xml_decomposition_to_json)(decomposition_tree.getroot(),
        state = conv.State)
    decomposition_xml_json = conv.check(decompositionsxml.make_validate_node_xml_json(tax_benefit_system))(
        decomposition_xml_json, state = conv.State)
    decomposition_json = decompositionsxml.transform_node_xml_json_to_json(decomposition_xml_json)
    return decomposition_json


def iter_decomposition_nodes(node_or_nodes, children_first = False):
    if isinstance(node_or_nodes, list):
        for node in node_or_nodes:
            for sub_node in iter_decomposition_nodes(node, children_first = children_first):
                yield sub_node
    else:
        if not children_first:
            yield node_or_nodes
        children = node_or_nodes.get('children')
        if children:
            for child_node in children:
                for sub_node in iter_decomposition_nodes(child_node, children_first = children_first):
                    yield sub_node
        if children_first:
            yield node_or_nodes


def make_validate_node_json(tax_benefit_system):
    def validate_node_json(node, state = None):
        if node is None:
            return None, None
        if state is None:
            state = conv.default_state
        validated_node, errors = conv.pipe(
            conv.condition(
                conv.test_isinstance(list),
                conv.uniform_sequence(
                    validate_node_json,
                    drop_none_items = True,
                    ),
                conv.pipe(
                    conv.condition(
                        conv.test_isinstance(basestring),
                        conv.function(lambda code: dict(code = code)),
                        conv.test_isinstance(dict),
                        ),
                    conv.struct(
                        dict(
                            children = conv.pipe(
                                conv.test_isinstance(list),
                                conv.uniform_sequence(
                                    validate_node_json,
                                    drop_none_items = True,
                                    ),
                                conv.empty_to_none,
                                ),
                            code = conv.pipe(
                                conv.test_isinstance(basestring),
                                conv.cleanup_line,
                                ),
                            ),
                        constructor = collections.OrderedDict,
                        default = conv.noop,
                        drop_none_values = 'missing',
                        keep_value_order = True,
                        ),
                    ),
                ),
            conv.empty_to_none,
            )(node, state = state)
        if validated_node is None or errors is not None:
            return validated_node, errors

        if isinstance(validated_node, dict) and not validated_node.get('children'):
            validated_node, errors = conv.struct(
                dict(
                    code = conv.pipe(
                        conv.test_in(tax_benefit_system.column_by_name),
                        conv.not_none,
                        ),
                    ),
                default = conv.noop,
                )(validated_node, state = state)
        return validated_node, errors

    return validate_node_json
