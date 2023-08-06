#! /usr/bin/env python
# -*- coding: utf-8 -*-
#
# Interpreter version: python 2.7
#
# Imports =====================================================================
import os
import os.path

import requests
from bottle import get
from bottle import abort
from bottle import request
from bottle import template
from bottle import static_file

import settings


# Variables ===================================================================
def _template_path(fn):
    return os.path.join(
        os.path.abspath(os.path.dirname(__file__)),
        "templates",
        fn,
    )


INDEX_PATH = _template_path("index_vertical.html")
STATIC_PATH = _template_path("static")


# Functions & classes =========================================================
def _read_index_template():
    with open(INDEX_PATH) as f:
        return f.read()


def render_registered(remote_info):
    return template(
        _read_index_template(),
        registered=True,
        url=remote_info["url"]
    )


def render_unregistered(error=None):
    return template(
        _read_index_template(),
        registered=False,
        error=error
    )


def get_remote_info(url_id):  # TODO: Add timeout, print error in case of exception
    resp = requests.get(settings.REMOTE_INFO_URL)
    resp.raise_for_status()
    data = resp.json()

    assert "url" in data

    return data


# TODO: REMOVE
@get("/" + settings.REMOTE_INFO_URL.split("/")[-1])
def mock_data():
    return {
        "url": "http://seznam.cz",
    }


@get("/" + settings.CONSPECT_API_URL.split("/")[-1])
def mock_conspect_data():
    with open(_template_path("conspect.json")) as f:
        return f.read()
# TODO: REMOVE


@get("/static/<fn:path>")
def static_data(fn):
    file_path = os.path.normpath(fn)
    full_path = os.path.join(STATIC_PATH, file_path)

    if not os.path.exists(full_path):
        abort(404, "Soubor '%s' neexistuje!" % fn)

    return static_file(
        file_path,
        STATIC_PATH
    )


@get("/")
def render_form_template():
    error = ""
    remote_info = {}
    registered_user_id = request.query.get("url_id", False)

    # try to read remote info, the the url_id parameter was specified
    if registered_user_id:
        try:
            remote_info = get_remote_info(registered_user_id)
        except AssertionError:  #: TODO: requests error
            registered_user_id = False
            error = "Server neposlal očekávaná data."

    if registered_user_id:
        return render_registered(remote_info)

    return render_unregistered(error)
