#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
from target_interaction_finder import TargetInteractionFinder


def main():

    parser = argparse.ArgumentParser(
        description='''Extract subgraph(s) from XGMML network(s).''')
    parser.add_argument('ids',
                        type=str,
                        help='identifier or file path to identifier list')
    parser.add_argument('-c', '--column',
                        default=1,
                        type=int,
                        help='''column number for identifiers in identifier list file
                        (default = 1)''')
    parser.add_argument('-s', '--source',
                        default='./source_xgmml/',
                        help='''source file or directory path(s) to database XGMML
                        (default = directory named "source_xgmml"
                            in current working directory)''')
    parser.add_argument('-t', '--type',
                        default='rna',
                        help='input type (rna or protein; default = rna)')
    parser.add_argument('-o', '--output',
                        default='.',
                        help='''output directory path
                        (default = current working directory)''')
    parser.add_argument('--cache',
                        default=True,
                        type=bool,
                        help='''Cache source_xgmml graph(s) and use in
                        subsequent runs to reduce parse time
                        (default = True)''')
    parser.add_argument('-d', '--debug',
                        default=False,
                        type=bool,
                        help='Show debug messages (default = False)')
    args = parser.parse_args()

    node_ids = args.ids
    source_xgmml = args.source
    node_id_list_column_index = args.column - 1
    node_type = args.type
    output_dir = args.output
    cache = args.cache
    debug = args.debug

    return TargetInteractionFinder(
        source_xgmml=source_xgmml,
        node_ids=node_ids,
        node_id_list_column_index=node_id_list_column_index,
        node_type=node_type,
        output_dir=output_dir,
        cache=cache,
        debug=debug)

if __name__ == '__main__':
    main()
