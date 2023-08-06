Overview
========

This is a Python3 fork of dowser library.

Original repo: https://github.com/Infinidat/dowser


Usage
-----

To quickly start-up a CherryPy-based server:

    from dowser.utils import launch_memory_usage_server
    launch_memory_usage_server()


If you want to integrate dowser in your existing CherryPy app:

    from dowser import Root
    class ExistingCherryPyApp(object):
        dowser = Root()
        dowser.exposed = True
        trace = dowser.trace
        chart = dowser.chart

This will bind `/dowser`, `/trace` and `/chart` to the dowser CherryPy app


