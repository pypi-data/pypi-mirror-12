#!/usr/bin/env python

import os, sys, time, argparse, shutil

def manage_console():
    parser = argparse.ArgumentParser()

    parser.add_argument('-project', '-startproject', '-p', type=str, help='Create project' )
    parser.add_argument('-app', '-startapp', '-a',         type=str, help='Create app'     )
    args = parser.parse_args()

    print( 'args.project', args.project)

    p_root = os.path.dirname(__file__)

    if '/core' in p_root:
        p_root = p_root[:-5]
    else:
        __import__('tao1')
        module = sys.modules['tao1']
        p_root = os.path.dirname( os.path.abspath(module.__file__) )

    if args.project is not None:
        shutil.copytree(  os.path.join( p_root , 'sites', 'daoerp'), os.path.join( str(args.project) ) )
        set_file = """
import os

session_key = b'Sixteen byte key'

debug = True

root_path = os.path.dirname(__file__)
tao_path  = '%s'

database={"login":"admin", "pass":"passwd", "host":["127.0.0.1:27017"], 'name':'test'}
        """ % p_root
        with open(os.path.join( str(args.project) , 'settings.py'), 'w') as f: f.write(set_file)

    elif args.app is not None:

        shutil.copytree( os.path.join( p_root, 'sites', 'daperp', 'apps', 'app'), os.path.join( str(args.app) ) )

    print( args )

# if __name__ == "__main__":
#     manage_console()















