from __future__ import absolute_import
from .core.cmd_fxn.io import find, out_dir, forward
from .models.Cosmos import Cosmos, default_get_submit_args
from .models.Task import Task
from .models.Stage import Stage
from .models.Execution import Execution
from . import ExecutionStatus, StageStatus, TaskStatus, NOOP

from .util.args import add_execution_args, pop_execution_args
from .util.relationship_patterns import one2one, one2many, many2one, group
from .util.helpers import make_dict
from .util.iterstuff import only_one

from .graph.draw import draw_task_graph, draw_stage_graph, pygraphviz_available
import funcsigs

from black_magic.decorator import partial
from decorator import decorator
from itertools import izip


def load_input(in_file, out_file=forward(u'in_file')): pass


def load_inputs(in_files, out_files=forward(u'in_files')): pass


def arg(name, value):
    if value:
        if value == True:
            return name
        else:
            return u' %s %s' % (name, value)
    else:
        return u''


def args(*args):
    return u" \\\n".join(arg(k, v) for k, v in args if arg(k, v) != u'')


@decorator
def bash_call(func, *args, **kwargs):
    u"""
    Experimental way to not have to write boiler plate argparse code.  Converts the function call to a bash script, when will be subsequently submitted
    like a normal command.

    Current Limitations:
       * function must be importable from anywhere in the VE
       * This means no partials!!! Parameters must all be passed as tags :(
    """


    # decorator.decorator passes everything as *args, use function signature to turn it into kwargs which is more explicit
    import pprint
    import json
    from collections import OrderedDict

    sig = funcsigs.signature(func)
    kwargs = dict(list(izip(sig.parameters.keys(), args)))

    return ur"""

python - <<EOF

from {func.__module__} import {func.__name__}

{func.__name__}(**
{param_str}
)

EOF""".format(func=func,
              param_str=pprint.pformat(kwargs, width=1, indent=1))  # todo assert values are basetypes
