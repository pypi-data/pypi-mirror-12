# -*- coding: utf-8 -*-
#
# This file is part of hepcrawl.
# Copyright (C) 2015 CERN.
#
# hepcrawl is a free software; you can redistribute it and/or modify it
# under the terms of the Revised BSD License; see LICENSE file for
# more details.

import os
import re

from netrc import netrc
from harvestingkit.ftp_utils import FtpHandler
from tempfile import mkstemp
from zipfile import ZipFile


def unzip_xml_files(filename, target_folder):
    """Unzip files (XML only) into target folder."""
    z = ZipFile(filename)
    xml_files = []
    for filename in z.namelist():
        if filename.endswith(".xml"):
            absolute_path = os.path.join(target_folder, filename)
            if not os.path.exists(absolute_path):
                z.extract(filename, target_folder)
            xml_files.append(absolute_path)
    return xml_files


def ftp_connection_info(ftp_host, netrc_file):
    logininfo = netrc(netrc_file).authenticators(ftp_host)
    connection_string = "ftp://{0}".format(ftp_host)
    connection_params = {
        "ftp_user": logininfo[0],
        "ftp_password": logininfo[2],
    }
    return connection_string, connection_params


def ftp_list_files(server_folder, target_folder, **serverinfo):
    """List files from given FTP's server folder to target folder."""
    ftp = FtpHandler(**serverinfo)
    ftp.cd(server_folder)
    missing_files = []
    all_files = []
    for filename in ftp.ls()[0]:
        destination_file = os.path.join(target_folder, filename)
        source_file = os.path.join(server_folder, filename)
        if not os.path.exists(destination_file):
            missing_files.append(source_file)
        all_files.append(source_file)
    return all_files, missing_files


def get_first(iterable, default=None):
    """Get first item in iterable or default."""
    if iterable:
        for item in iterable:
            return item
    return default


def collapse_initials(name):
    """Remove the space between initials, eg T. A. --> T.A."""
    if len(name.split(".")) > 1:
        name = re.sub(r'([A-Z]\.)[\s\-]+(?=[A-Z]\.)', r'\1', name)
    return name


def get_temporary_file(prefix="tmp_",
                       suffix="",
                       directory=None):
    """Generate a safe and closed filepath."""
    try:
        file_fd, filepath = mkstemp(prefix=prefix,
                                    suffix=suffix,
                                    dir=directory)
        os.close(file_fd)
    except IOError, e:
        try:
            os.remove(filepath)
        except Exception:
            pass
        raise e
    return filepath
