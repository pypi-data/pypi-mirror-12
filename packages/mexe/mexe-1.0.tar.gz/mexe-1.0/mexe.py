import argparse
import os

__version__ = "1.0"

shebangs = {
    '2': b"#!/usr/bin/env python2\n",
    '3': b"#!/usr/bin/env python3\n",
    'default': b"#!/usr/bin/env python\n"
}


def parse_arguments():
    """
    Parses all the command line arguments using argparse and returns them.
    """
    parser = argparse.ArgumentParser()

    parser.add_argument('file', metavar="FILE", nargs='+',
                        help='file to be made executable')
    parser.add_argument("-p", "--pyversion", metavar="VERSION",
                        help="python version (2 or 3)")
    parser.add_argument('-v', '--version', action='version',
                        version='%(prog)s ' + __version__, help='show version')
    parser.add_argument('-r', '--recursive', action='store_true',
                        help='recursively iterate the directories')

    args = parser.parse_args()
    return args


def contains_shebang(f):
    """
    Returns true if any shebang line is present in the first line of the file.
    """
    first_line = f.readline()
    if first_line in shebangs.values():
        return True
    return False


def put_shebang(f, version):
    """
    Writes a shebang to the first line of the file according to the specified
    version. (2 | 3 | default)
    """
    if not contains_shebang(f):
        f.seek(0)
        original_text = f.read()
        f.seek(0)
        f.write(shebangs[version] + original_text)


def make_exec(fname, version):
    """
    Writes the shebang and makes the file executable.
    """
    # if no version is specified, use system default.
    if version is None:
        version = 'default'

    # write the shebang and then make the file executable.
    with open(fname, 'rb+') as f:
        put_shebang(f, version)
    # make the file
    os.chmod(fname, os.stat(fname).st_mode | 0o0111)
    print("{} is now executable".format(fname))


def main():

    # call the function and get the arguments.
    args = parse_arguments()

    # if -r argument is given, then iterate the given directory recursively.
    if args.recursive:
        for root, dirs, files in os.walk(''.join(args.file)):
            for filename in files:
                if filename.endswith(".py"):
                    make_exec(os.path.join(root, filename), args.pyversion)
    else:
        for dir in args.file:
            if os.path.isfile(dir):
                if dir.endswith(".py"):
                    make_exec(dir, args.pyversion)
                else:
                    print("{} is not a python file".format(dir))
            else:
                for filename in os.listdir(dir):
                    if filename.endswith(".py"):
                        make_exec(filename, args.pyversion)

if __name__ == '__main__':
    main()
