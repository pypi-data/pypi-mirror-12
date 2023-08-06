# -*- python -*-
# -*- coding: utf-8 -*-
#
#  This file is part of DREAMTools software
#
#  Copyright (c) 2015, DREAMTools Development Team
#  All rights reserved
#
#  Distributed under the BSD 3-Clause License.
#  See accompanying file LICENSE distributed with this software
#
#  File author(s): Thomas Cokelaer <cokelaer@ebi.ac.uk>
#
#  website: http://github.com/dreamtools
#
##############################################################################
"""A module dedicated to synapse

The class :class:`SynapseClient` is a specialised class built upon
synapseclient package, which source code is on GitHub::

    git clone git://github.com/Sage-Bionetworks/synapsePythonClient.git
    cd synapsePythonClient
    python setup.py install

This class may be removed but for now it is used in D8C1 challenge.


::

    >>> from dreamtools.core import sageutils
    >>> s = sageutils.SynapseClient()


"""
import synapseclient
from synapseclient import entity


__all__ = ["SynapseClient", "Login"]


class Login(object):
    """A simple class to login to synapse

    :param client: Connection to synapse takes a
        couple of seconds. This may be too much if in a debugging mode or
        accessing to synapse from different places. The login can be instantiate
        with an existing instance of SynapseClient, if which case, the instance
        creation is fast. Otherwise, the default behaviour is to create a new
        connection.

    ::

        >>> from dreamtools.sageutils import Login
        >>> l = Login()
        This is a SynapseClient built on top of Synapse class.
        Trying to login automatically.
        Welcome, *****************
        You're logged in Synapse
        Welcome, XXX

        In [10]: l = sageutils.Login(l)

    """
    def __init__(self, client=None, username=None, password=None):
        if client is None:
            self.client = SynapseClient(username, password)
        else:
            self.client = client

# note that synapseclient.Synapse does not inherit from object, hence the
# additional base class here below that contains Synapse and object as base
# classes
class SynapseClient(synapseclient.Synapse, object):
    """This class inherits all methods from synapseClient.

    Be aware that most of the functionalities are now available in synapseclient
    itself. So, most of the methods that were written are hidden (double
    underscore) and may be removed in the future.

    The only remaining feature is the automatic login, and simple version of the
    downloadSubmission method. There is also a :meth:`json` method used
    throughout the dream8hpn code.

    """
    def __init__(self, username=None, password=None):
        """.. rubric:: Constructor

        :param username: your synapse usename
        :param password: your synapse password

        You can create create a file called **.synapseConfig** (note the dot)
        in your home directory and add something like::

            [authentication]
            username: yourlogin
            password: yourpassword

        """
        super(SynapseClient, self).__init__()
        # TODO: should be moved to Login ??
        print("This is a SynapseClient built on top of Synapse class. ")
        print("Trying to login automatically. ")
        try:
            self.login(username, password)
            print("You're logged in Synapse")
        except Exception as err:
            print("Failed to login automatically.")
            print("Either the login is wrong or missing")
            print("You must have a synapse account")
            print("Create a Synapse login on http://synapse.org")
            print("Create a file called .synapseConfig in your HOME directory")
            print("Add this code in the file:\n")
            print("[authentication]")
            print("For now, let us try to login manually:")
            print("username: yourlogin")
            print("password: yourpassword")
            print("")

            # use input instead of raw_input (Python3 has only input())
            try:
                input = raw_input
            except NameError: pass
            username = str(input("Synapse username:"))
            password = str(input("Synapse password:"))

            try:
                self.login(username, password)
            except Exception as err2:
                raise Exception(err2)

    def __getDataPath(self, entity, version=1):
        """

        obsolet .to be deleted. Feb 2014

        """
        try:
            eid = entity['id']
            e = self.get(eid, version=version, downloadFile=True)
        except:
            e = self.get(entity, version=version, downloadFile=True)
        return e['path']

    def downloadSubmissionAndFilename(self, sub, downloadFile=True, **kargs):
        """Return filename of a submission downloaded from synapse.

        :param sub:  A submission (as a dictionary).
        :param version:  The specific version to get. Defaults to the most
            recent version.
        :param downloadFile: Whether associated files(s) should be downloaded.
             Defaults to True. If set to False, downloadLocation and ifcollision are ignored
        :param downloadLocation: Directory where to download the Synapse File Entity.
            Defaults to the local cache.
        :param ifcollision: Determines how to handle file collisions.
            May be "overwrite.local", "keep.local", or "keep.both".
            Defaults to "keep.both".

        .. warning:: ifcollision does not seem to work (0.5.1)

        """

        if isinstance(sub, dict) == False:
            raise TypeError("input must be a submission (dictionary)")

        if downloadFile == False:
            filename = self.getSubmission(sub, downloadFile=False)['filePath']
        else:
            filename = self.getSubmission(sub, downloadFile=True, **kargs)['filePath']

        return filename

    def __setProvenance(self, entity, name):
        """Set provenance

        :param entity: a valid entity object
        :param name: name to set on an activity

        ::

            s.setProvenance("syn375811", name="test")

        .. warning:: may be obsolet. Look into original synapseclient instead
        """
        activity = synapseclient.Activity(name=name)
        super(SynapseClient, self).setProvenance(entity, activity)

    def __getEvaluation(self, eid):
        """Returns an evaluation

        obsolet available in synapseclient now"""
        e = self.restGET("/evaluation/%s" % eid)
        return e

    def __createWiki(self, owner, title, markdown, owner_type=None):
        """

        :param owner: the owner object (entity, competition, evaluation)
            with which the new wiki page will be associated
        :param markdown: the contents of the wiki page in markdown
        :param owner_type: if not provided, the client tries to figure out the type.
            e.g., Works for evaluation
        """
        try:
            res = self._createWiki(owner, title, markdown, owner_type=owner_type)
            return res
        except Exception as err:
            print("Could not create the wiki. Exists already ?")
            raise Exception(err)

    def __getWiki_TC(self, owner, owner_type):
        """Returns wiki given owner and owner_type

        """
        res = self.restGET("/%s/%s/wiki" % (owner_type, owner['id']))
        return res

    def __createWikiChild(self, owner, title):
        # retrieve the main wiki
        wiki = self.getWiki_TC(owner, "evaluation")
        wikiURI = "/evaluation/%s/wiki" % owner['id']

        print(wikiURI)
        wikiChild = synapseclient.Wiki(title=title, markdown="", parentWikiId=wiki['id'])
        res = self.restPOST(wikiURI, wikiChild.getjson())

        return res

    def getMyProfile(self):
        """Returns user profile"""
        return self.restGET("/userProfile")

    def __joinEvaluation(self, evalId):
        """Join an existing evaluation

        :param evalIe: a valid evaluation identifier
        """
        prof =  self.getMyProfile()
        try:
            self.restPOST("/evaluation/%s/participant/%s" % (evalId, prof['ownerId']), list())
        except Exception as err:
            print("Joining evaluation failed. Maybe you've already joined.")

    def json(self, data):
        """Transform relevant object into json object"""
        import json
        data = json.dumps(data)
        return data
