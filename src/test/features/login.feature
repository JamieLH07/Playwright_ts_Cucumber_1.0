Feature: User Authentication tests

  Background: 
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be successful
    And User enters the username as 'ortoni'
    And User enters the password as 'Pass1234'
    When User clicks on the login button
    Then Login should be successful

  Scenario: Login should not be successful
    Given User enters the username as 'koushik'
    Given User enters the password as 'Passkoushik'
    When User clicks on the login button
    But Login should not be successful
