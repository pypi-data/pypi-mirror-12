# -*- coding: utf-8 -*-
"""Base module for unittesting."""

from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import login
from zope.configuration import xmlconfig
from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import PloneSandboxLayer
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.app.testing import TEST_USER_NAME
from plone.testing import z2

import unittest2 as unittest


class CollectiveBannerLayer(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        """Set up Zope."""
        # Load ZCML
        import plone.app.dexterity
        xmlconfig.file(
            'configure.zcml',
            plone.app.dexterity,
            context=configurationContext)
        import collective.behavior.banner
        self.loadZCML(package=collective.behavior.banner)
        # ease tests
        xmlconfig.file(
            'testing.zcml',
            collective.behavior.banner,
            context=configurationContext
        )
        z2.installProduct(app, 'collective.behavior.banner')

    def setUpPloneSite(self, portal):
        """Set up Plone."""
        # Install into Plone site using portal_setup
        applyProfile(portal, 'collective.behavior.banner:default')
        # ease tests
        applyProfile(portal, 'collective.behavior.banner:testing')

        # Login and create some test content
        setRoles(portal, TEST_USER_ID, ['Manager'])
        login(portal, TEST_USER_NAME)
        portal.invokeFactory('Folder', 'folder')

        # Commit so that the test browser sees these objects
        portal.portal_catalog.clearFindAndRebuild()
        import transaction
        transaction.commit()

    def tearDownZope(self, app):
        """Tear down Zope."""
        z2.uninstallProduct(app, 'collective.behavior.banner')


FIXTURE = CollectiveBannerLayer()
INTEGRATION_TESTING = IntegrationTesting(
    bases=(FIXTURE,), name="ICollectiveBannerLayer:Integration")
FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(FIXTURE,), name="ICollectiveBannerLayer:Functional")


class IntegrationTestCase(unittest.TestCase):
    """Base class for integration tests."""

    layer = INTEGRATION_TESTING


class FunctionalTestCase(unittest.TestCase):
    """Base class for functional tests."""

    layer = FUNCTIONAL_TESTING
