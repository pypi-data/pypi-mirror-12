# -*- encoding: utf-8 -*-
# Copyright (C) 2015  Alejandro López Espinosa (kudrom)

from importlib import import_module

from twisted.application import service

from settings import settings
from lupulo.exceptions import NotListenerFound, InvalidListener


def get_listener_name(name_listener):
    """
        Transforms the name_listener into CamelCase and adds the Listener to
        the end.
    """
    name_splitted = name_listener.split("_")
    CamelCase = "".join(map(lambda x: x.capitalize(), name_splitted))
    return CamelCase + "Listener"


def connect_listener(parent, sse_resource):
    """
        Load, instantiate and registers a Listener.
    """
    module_name = settings["listener"] + "_listener"
    try:
        module = import_module("lupulo.listeners.%s" % module_name)
    except ImportError as e:
        try:
            module = import_module("listeners.%s" % module_name)
        except ImportError:
            raise NotListenerFound(e.message.split(" ")[-1])

    # Find the Listener class
    listener_name = get_listener_name(settings["listener"])
    try:
        Listener = getattr(module, listener_name)
    except AttributeError as e:
        raise NotListenerFound(e.message.split(" ")[-1])

    if not issubclass(Listener, service.Service):
        raise InvalidListener(Listener.__name__)

    # Instantiate it and register towards the application
    listener = Listener(sse_resource)
    listener.setServiceParent(parent)
    return listener
