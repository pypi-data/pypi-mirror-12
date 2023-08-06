﻿from task import Task, TaskController
from watcher import Watcher, WatcherController
#from utilities.condor_logger import CondorLogger
import sys, argparse

watcher_controller = WatcherController(None)
task_controller = TaskController(None)

parser = argparse.ArgumentParser()

tasks_names = []
arguments = []

commands_shortcuts = {
    'tasklist': '-t', 
    'arguments': '-a'
    }

def add_task_names(names):
    tasks.extend(names)
    print(tasks)

def setup(name, wdir, task):

    print("Setting up Condor for {0}".format(name))

    parser.add_argument(commands_shortcuts['tasklist'], nargs='*')
    parser.add_argument(commands_shortcuts['arguments'], nargs='*')

    parsed_arguments = vars(parser.parse_args())
    task_names = parsed_arguments['t']
    arguments = parsed_arguments['a']

    for t in task:
        print("Creating task {0}".format(t['name']) )

        if t['args'] != None:
            t['args'].update({'argv' : arguments})
        else:
            t['args'] = {'argv' : arguments}
        condor_task = Task(t['name'], wdir, t['args'], t['pipe'])
        if 'watch' in t.keys() and 'action' in t.keys():
            raise AttributeError("Task should not contain both action and watchers")
        if 'action' in t.keys():
            condor_task.add_action(t['action'])
        if 'watch' in t.keys():
            for w in t['watch']:
                condor_watcher = Watcher(wdir + w['path'], w['pattern'], w['action'], watcher_controller)
                condor_task.add_watcher(condor_watcher)
                print("Added watcher for task {0} for {1}".format(condor_task.name, condor_watcher.path + condor_watcher.pattern))
        if task_names == None or task_names.count(condor_task.name) > 0:
            task_controller.add_task(condor_task)

    watcher_controller.start()

    print("Condor is set up and now running...")

    task_controller.run()


