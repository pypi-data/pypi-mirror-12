# -*- coding: utf-8 -*-
from eralchemy.main import render_er
import argparse


def cli():
    """Entry point for the application script"""
    parser = argparse.ArgumentParser(prog='ERAlchemy')
    parser.add_argument('-i', nargs='?', help='Database URI to process.')
    parser.add_argument('-o', nargs='?', help='Name of the file to write.')
    parser.add_argument('-s', nargs='?', help='Name of the schema.')
    parser.add_argument('-x', nargs='*', help='Name of the table(s) to exclude.')

    args = parser.parse_args()
    render_er(args.i, args.o, exclude=args.x, schema=args.s)
