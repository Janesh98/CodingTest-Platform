beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit('/login');
});

describe('setup and edit tests', () => {
  it('login user create, setup test, edit test and logout', () => {
    cy.get('[data-testid="Email Address"]').type('test123@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="sign-in"]').click();
    cy.get('[data-testid="setup-test"]').click();
    cy.get('[data-testid="name"]').type('test1234567');
    cy.get('[data-testid="continue"]').click();
    cy.wait(5000);
    cy.get('[data-testid="open"]').click();
    cy.get('[data-testid="close"]').click();
    cy.get('[id="title"]').type('Reverse string');
    cy.get('[data-testid="Problem Description"]').type(
      'read in string and print to stdout'
    );
    cy.get('[data-testid="Input Format"]').type('string');
    cy.get('[data-testid="Return Format"]').type('string');
    cy.get('[data-testid="Constraints"]').type(
      'string less than 10000 characters'
    );
    cy.get('[data-testid="Sample Input"]').type('hello world!');
    cy.get('[data-testid="Sample Output"]').type('!dlrow olleh');
    cy.get('[data-testid="Example with Explanation"]').type(
      'hello world! reversed is !dlrow olleh'
    );
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
    cy.get('[data-testid="save"]').click();
    cy.wait(5000);
    cy.get('[id="continue"]').click();
    cy.get('[data-testid="exit"]').click();
    cy.get('[data-testid="edit-test"]').click();
    cy.wait(3000);
    cy.get('[id="edit"]').first().click();
    cy.wait(5000);
    cy.get('[id="edit-challenge"]').first().click();
    cy.wait(5000);
    cy.get('[data-testid="Problem Description"]').type(
      '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace} from sys.argv and print to stdout'
    );
    cy.get('[data-testid="save"]').click();
    cy.wait(5000);
    cy.get('[id="edit-questions"]').first().click();
    cy.wait(5000);
    cy.get('[data-testid="Question 1"]').type('What is your name?');
    cy.get('[data-testid="Question 2"]').type('What year is this?');
    cy.get('[data-testid="Question 3"]').type('What time is it?');
    cy.get('[data-testid="save"]').click();
    cy.wait(3000);
    cy.get('[data-testid="addChallenge"]').click();
    cy.wait(3000);
    cy.get('[data-testid="open"]').click();
    cy.get('[data-testid="close"]').click();
    cy.get('[id="title"]').type('Reverse string');
    cy.get('[data-testid="Problem Description"]').type(
      'read in string and print to stdout'
    );
    cy.get('[data-testid="Input Format"]').type('string');
    cy.get('[data-testid="Return Format"]').type('string');
    cy.get('[data-testid="Constraints"]').type(
      'string less than 10000 characters'
    );
    cy.get('[data-testid="Sample Input"]').type('hello world!');
    cy.get('[data-testid="Sample Output"]').type('!dlrow olleh');
    cy.get('[data-testid="Example with Explanation"]').type(
      'hello world! reversed is !dlrow olleh'
    );
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
    cy.get('[data-testid="save"]').click();
    cy.wait(3000);
    cy.get('[data-testid="addParticipants"]').click();
    cy.wait(3000);
    cy.get('[data-testid="Email"]').type('participant@mail.com');
    cy.get('[data-testid="send"]').click();
    cy.wait(5000);
    cy.get('[data-testid="exit"]').click();
    cy.wait(3000);
    cy.get('[id="deleteChallenge"]').first().click();
    cy.wait(3000);
    cy.get('[id="deleteQuestions"]').first().click();
    cy.wait(3000);
    cy.get('[data-testid="open-menu"]').click();
    cy.get('[data-testid="edit-test-menu"]').click();
    cy.wait(3000);
    cy.get('[id="delete"]').first().click();
    cy.wait(5000);
    cy.get('[data-testid="logout"]').click();
  });
});
