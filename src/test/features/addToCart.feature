Feature: Product test

  Background: 
    Given User navigates to the application
    And User click on the login link

  Scenario Outline: Add to cart
    And User enters the username as "<username>"
    And User enters the password as "<password>"
    And User clicks on the login button
    And User searches for a "<book>"
    When User adds the book to the cart
    Then the cart badge should get updated

    Examples: 
      | username | password  | book            |
      | ortoni   | pass1234$ | Roomies         |
      | ortonikc | pass1234  | The Simple Wild |
