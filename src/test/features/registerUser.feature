Feature: Register User

@test
Scenario: Register a new User
    Given I navigate to the register page
    When I create a new User
    Then I confirm the user registration is successful