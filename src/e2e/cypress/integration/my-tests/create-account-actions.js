beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit('/signup');
  cy.wait(3000);
});

describe('signup', () => {
  it('create account login user and delete account', () => {
    cy.get('[data-testid="Email Address"]').type('deletetest@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="Confirm Password"]').type('123456');
    cy.get('[data-testid="sign-up"]').click();
    cy.wait(8000);
    cy.get('[data-testid="company"]').type('delete this');
    cy.get('[data-testid="submit"]').click();
    cy.wait(5000);
    cy.get('[data-testid="logout"]').click();
    cy.wait(5000);
    cy.get('[data-testid="Email Address"]').type('deletetest@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="sign-in"]').click();
    cy.wait(5000);
    cy.get('[data-testid="delete"]').click();
    cy.get('[data-testid="cancel"]').click();
    cy.get('[data-testid="delete"]').click();
    cy.get('[data-testid="yes"]').click();
  });
});
