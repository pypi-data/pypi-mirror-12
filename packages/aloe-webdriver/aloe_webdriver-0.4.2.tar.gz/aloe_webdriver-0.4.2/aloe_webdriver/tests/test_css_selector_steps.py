"""Test CSS selector steps."""

from aloe.testing import FeatureTest

from aloe_webdriver.tests.base import feature, PAGES


class TestCSS(FeatureTest):
    """Test CSS steps."""

    @feature()
    def test_css_match(self):
        """
Feature: Wait and match CSS
    Scenario: Everything fires up
        When I go to "{page}"
        Then There should be an element matching $("textarea[name='bio']") within 1 second
        """  # noqa

        return dict(page=PAGES['basic_page'])

    @feature()
    def test_forms(self):
        """
Feature: CSS-based formstuff
    Scenario: Everything fires up
        When I go to "{page}"
        Then I fill in $("input[name='user']") with "A test string"
        And I check $("input[value='Bike']")
        """

        return dict(page=PAGES['basic_page'])
