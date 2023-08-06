# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s collective.sgvizler -t test_sgvizlerview.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src collective.sgvizler.testing.COLLECTIVE_SGVIZLER_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot src/plonetraining/testing/tests/robot/test_sgvizlerview.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a SGVizlerView
  Given a logged-in site administrator
    and an add sgvizlerview form
   When I type 'My SGVizlerView' into the title field
    and I submit the form
   Then a sgvizlerview with the title 'My SGVizlerView' has been created

Scenario: As a site administrator I can view a SGVizlerView
  Given a logged-in site administrator
    and a sgvizlerview 'My SGVizlerView'
   When I go to the sgvizlerview view
   Then I can see the sgvizlerview title 'My SGVizlerView'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add sgvizlerview form
  Go To  ${PLONE_URL}/++add++SGVizlerView

a sgvizlerview 'My SGVizlerView'
  Create content  type=SGVizlerView  id=my-sgvizlerview  title=My SGVizlerView


# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.title  ${title}

I submit the form
  Click Button  Save

I go to the sgvizlerview view
  Go To  ${PLONE_URL}/my-sgvizlerview
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a sgvizlerview with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the sgvizlerview title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
