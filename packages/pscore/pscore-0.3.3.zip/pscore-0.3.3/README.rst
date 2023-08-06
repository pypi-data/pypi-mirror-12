======
PSCORE
======

``pscore`` provides a range of selenium webdrivers for local, grid and saucelabs execution, including test setup and teardown. It has been tested and used with the ``nose2`` test runner which enables multi-threaded test execution. ``pscore`` offers up a ``WebDriverTestCase`` which can be sub-classed in your automation test cases and will provide access to a ``webdriver`` object via ``self.driver``

An example test looks like this::

    from pscore.core.wd_testcase import WebDriverTestCase
    from pscore.nose2.tags import tagger
    from the_internet_model.pages.home import Home

    class TestTheInternet(WebDriverTestCase):

    @tagger('Home')
     def test_can_load_homepage(self):
         home = Home(self.driver).load()
         self.assertTrue(home.is_loaded(), "Error loading homepage")

And is run like this::

    nose2 -c nose2.cfg -A tags=Home

Test configuration is managed by reading environment variables.

Required environment variables
""""""""""""""""""""""""""""""

* ``PSCORE_ENVIRONMENT`` - Specifies the execution environment.  Accepted values: `grid`, `local`, `saucelabs`, `sauce`, `amazon`
* ``PSCORE_BROWSER`` - Specifies the browser.  Accepted values: `ie`, `chrome`, `firefox`, `iphone`, `ipad`, `android`, `safari` (`ie`, `chrome`, `firefox`, `android` options can be used on local development)
* ``PSCORE_HOMEPAGE`` - Specifies the homepage.  e.g. http://www.google.com

Others
""""""

* ``PSCORE_BROWSER_VERSION`` (e.g. if using saucelabs) - specify browser version
* ``PSCORE_SCREENSHOT_DIR`` - Specifies the directory to write screenshots to
* ``PSCORE_AGENT_ID``- (optional) name to set the ``environment`` of your test run e.g. ``"MyTeamIntReview"``
* ``PSCORE_SELENIUM_HUB_URL`` - Specifies the URL of a standard selenium hub instance e.g. ``http://gridhub:4444/wd/hub``

Saucelabs
"""""""""

* ``PSCORE_SAUCE_USERNAME`` - The username to use for Saucelabs authentication
* ``PSCORE_SAUCE_KEY`` - The access key to use for Saucelabs authentication
* ``PSCORE_SAUCE_TUNNEL_ID`` - in order to see internal test environments, we need to use a sauce connect tunnel - use the tunnel ID name
* ``PSCORE_SAUCE_PARENT_ACCOUNT`` - if you are a sub-account of someone else, put that username here
