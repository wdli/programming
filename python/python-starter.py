#!/usr/local/bin/python
#
# Description: This is a Python starter template with cmdline parser
#              It's tested using david-python container images so the 
#              Python path is /usr/local/bin/python. Make sure to change it
#              if the test env is different 
#
# Use:         ./python-starter.py --help # Will display all positional args required
#
# Example:     ./python-starter.py -f1 8888 -f2 foo 9999
#              or
#              ./python-starter.py foo 9999 -f1 888 -f2 
#
#

# Required argparse module
import argparse

parser = argparse.ArgumentParser()

# How to add a positional arg
parser.add_argument('echo1', help="echo1 is the 1st required arg, type is string")
parser.add_argument('echo2', type=int, help="echo2 is the 2nd required arg, type is int") 


# How to add optional args
parser.add_argument("-f1", "--flag1", type=int, help="optional, require a followup input after the flag")
parser.add_argument("-f2", "--flag2", help="optional, it's just a flag, no followup needed ", action="store_true")

# Parse all args
args = parser.parse_args()


#
# main program to test the args
#
print ("1st arg: {} ".format(args.echo1))
print ("2nd arg: {} ".format(args.echo2))


if (args.flag1):
    print(" f1 is set with a value: {}".format(args.flag1))
    
if (args.flag2):
    print(" f2 is set")