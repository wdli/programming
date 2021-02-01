#!/usr/bin/env python3

"""A simple python script template.

   To run pdb debugger in emacs
   M-x pdb
    python -m pdb template-test.py template-test.json
"""

import os
import sys
import argparse
import json
import requests

def main(arguments):

    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)

    parser.add_argument('<input file>', 
                        help="Input file name", 
                        type=argparse.FileType('r'))

    parser.add_argument('-o', '--outfile', 
                        help="Output file", default=sys.stdout, 
                        type=argparse.FileType('w'))

    #args = parser.parse_args(arguments)

    print(arguments)

    response = requests.get(arguments[0])
    print("Return code: {}".format(response.status_code))

    print("==== Ugly ====")
    print(response.json())

    print("==== Pretty ====")
    json_obj = json.dumps(response.json(), indent=2)
    print(json_obj)
    

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
