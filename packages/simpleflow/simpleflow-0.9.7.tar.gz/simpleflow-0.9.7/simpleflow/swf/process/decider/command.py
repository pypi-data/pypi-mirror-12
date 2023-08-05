from __future__ import absolute_import

from . import helpers


def start(workflows, domain, task_list, log_level=None, nb_processes=None):
    decider = helpers.make_decider(workflows, domain, task_list, nb_processes)
    decider.is_alive = True
    decider.start()
