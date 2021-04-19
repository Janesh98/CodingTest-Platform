/// <reference types="cypress"/>

beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  describe('setup tests', () => {
    it('login user create, setup test and logout', () => {
        cy.viewport('macbook-11')
        cy.get('[data-testid="Email Address"]').type('test123@mail.com');
        cy.get('[data-testid="Password"]').type('123456');
        cy.get('[data-testid="sign-in"]').click()
        cy.get('[data-testid="setup-test"]').click()
        cy.get('[data-testid="name"]').type('test1234');
        cy.get('[data-testid="continue"]').click()
        cy.wait(3000);
        cy.get('[data-testid="open"]').click()
        cy.get('[data-testid="close"]').click()
        cy.get('[id="title"]').type('Reverse string');
        cy.get('[data-testid="Problem Description"]').type('read in string and print to stdout');
        cy.get('[data-testid="Input Format"]').type('string');
        cy.get('[data-testid="Return Format"]').type('string');
        cy.get('[data-testid="Constraints"]').type('string less than 10000 characters');
        cy.get('[data-testid="Sample Input"]').type('hello world!');
        cy.get('[data-testid="Sample Output"]').type('!dlrow olleh');
        cy.get('[data-testid="Example with Explanation"]').type('hello world! reversed is !dlrow olleh');
        cy.get('[data-testid="test input 1"]').type('123');
        cy.get('[data-testid="test output 1"]').type('321');
        cy.get('[data-testid="test input 2"]').type('dcu');
        cy.get('[data-testid="test output 2"]').type('ucd');
        cy.get('[data-testid="test input 3"]').type('abcd');
        cy.get('[data-testid="test output 3"]').type('dcba');
        cy.get('[data-testid="test input 4"]').type('hi');
        cy.get('[data-testid="test output 4"]').type('ih');
        cy.get('[data-testid="test input 5"]').type('hello');
        cy.get('[data-testid="test output 5"]').type('olleh');
        cy.get('[data-testid="save"]').click()
        cy.wait(5000);
        cy.get('[id="continue"]').click()
        cy.get('[data-testid="Question 1"]').type('What is your name?');
        cy.get('[data-testid="Question 2"]').type('What year is this?');
        cy.get('[data-testid="Question 3"]').type('What time is it?');
        cy.get('[data-testid="save"]').click()
        cy.wait(5000);
        cy.get('[data-testid="open-menu"]').click()
        cy.get('[data-testid="edit-test-menu"]').click()
        cy.wait(3000);
        cy.get('[id="delete"]').first().click()
        cy.wait(5000);
        cy.get('[data-testid="logout"]').click()
    })

     it('login user create, setup test with out questions and logout', () => {
        cy.viewport('macbook-11')
        cy.get('[data-testid="Email Address"]').type('test123@mail.com');
        cy.get('[data-testid="Password"]').type('123456');
        cy.get('[data-testid="sign-in"]').click()
        cy.get('[data-testid="setup-test"]').click()
        cy.get('[data-testid="name"]').type('test12345');
        cy.get('[data-testid="continue"]').click()
        cy.wait(3000);
        cy.get('[data-testid="open"]').click()
        cy.get('[data-testid="close"]').click()
        cy.get('[id="title"]').type('Reverse string');
        cy.get('[data-testid="Problem Description"]').type('read in string and print to stdout');
        cy.get('[data-testid="Input Format"]').type('string');
        cy.get('[data-testid="Return Format"]').type('string');
        cy.get('[data-testid="Constraints"]').type('string less than 10000 characters');
        cy.get('[data-testid="Sample Input"]').type('hello world!');
        cy.get('[data-testid="Sample Output"]').type('!dlrow olleh');
        cy.get('[data-testid="Example with Explanation"]').type('hello world! reversed is !dlrow olleh');
        cy.get('[data-testid="test input 1"]').type('123');
        cy.get('[data-testid="test output 1"]').type('321');
        cy.get('[data-testid="test input 2"]').type('dcu');
        cy.get('[data-testid="test output 2"]').type('ucd');
        cy.get('[data-testid="test input 3"]').type('abcd');
        cy.get('[data-testid="test output 3"]').type('dcba');
        cy.get('[data-testid="test input 4"]').type('hi');
        cy.get('[data-testid="test output 4"]').type('ih');
        cy.get('[data-testid="test input 5"]').type('hello');
        cy.get('[data-testid="test output 5"]').type('olleh');
        cy.get('[data-testid="save"]').click()
        cy.wait(5000);
        cy.get('[id="continue"]').click()
        cy.get('[data-testid="exit"]').click()
        cy.wait(5000);
        cy.get('[data-testid="open-menu"]').click()
        cy.get('[data-testid="edit-test-menu"]').click()
        cy.wait(3000);
        cy.get('[id="delete"]').first().click()
        cy.wait(5000);
        cy.get('[data-testid="logout"]').click()
    })
})