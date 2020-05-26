Feature:

Scenario: Exact match
  When I will match just this text
  Then I will match just this text and more

Scenario: Matching numbers
  When I order 10 burritos at £4.75 each

Scenario: Matching strings
  When the text is "John Doe"
  Then the name is generic
  When the text is ""
  Then the name is empty

Scenario: Pluralisation
  When I see 1 fox
  When I see 10 foxes

Scenario: Alternatives
  Given I have a dog
  Given I have a cat
  Given I have a fish


Scenario: Custom types
  Given I have no book
  Given I have 2 books
  Given I have some books