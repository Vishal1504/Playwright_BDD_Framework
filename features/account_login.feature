Feature: Account creation and login on Parabank

  Scenario: Create an account, login, and print amount
    Given I open the Parabank website
    When I create an account with random username and password "Password123"
    And I login with that username and password "Password123"
    Then I print the account balance displayed on homepage


