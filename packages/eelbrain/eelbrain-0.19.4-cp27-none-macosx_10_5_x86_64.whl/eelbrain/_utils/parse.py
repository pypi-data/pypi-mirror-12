# Author: Christian Brodbeck <christianbrodbeck@nyu.edu>
import parser


def find_variables(expr):
    "Find the variables participating in an expressions"
    return _find_vars(parser.expr(expr).totuple())


def _find_vars(st):
    if isinstance(st, str):
        return ()
    elif st[0] == 318:
        if st[1][0] == 1:
            return st[1][1],
        else:
            return ()
    else:
        return sum((_find_vars(b) for b in st[1:]), ())
