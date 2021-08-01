#!/usr/bin/env python3

"""A simple python script template.

   To use HTTP simple authentication:
   
     requests.get('https://api.github.com/user', auth=('user', 'pass'))

   To run pdb debugger in emacs:

    M-x pdb
       python -m pdb template-test.py template-test.json

   To test with david-python docker container:

     docker run -v $(pwd):/app --rm -it  david-python python  /app/template-test.py "http://api.open-notify.org/astros.json"


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
    json_obj = json.dumps(response.json(), sort_keys=True, indent=2)
    print(json_obj)
    
    # Post

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
