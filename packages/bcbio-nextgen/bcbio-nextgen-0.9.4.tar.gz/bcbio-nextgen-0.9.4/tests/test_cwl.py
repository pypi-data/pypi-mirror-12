"""Tests for the bcbio integration with the Common Workflow Language
"""
import os
import unittest
import subprocess

from nose.plugins.attrib import attr
import yaml

class CWLTest(unittest.TestCase):
    """ Run a simple CWL workflow.
    """
    #@attr(speed=1)
    #@attr(cwl=True)
    #def test_1_cwl_docker(self):
    #    cl = ["cwltool", "--verbose", "../cwl/bcbio2cwl.cwl", "../cwl/testinput-args.json"]
    #
    #    subprocess.check_call(cl)

    # @attr(speed=2)
    # @attr(cwl=True)
    # def test_2_cwl_nocontainer(self):
    #     cl = ["cwltool", "--verbose", "--preserve-environment", "PATH", "HOME", "--no-container",
    #           "../cwl/bcbio2cwl.cwl", "../cwl/testinput-args.json"]

    #     subprocess.check_call(cl)
