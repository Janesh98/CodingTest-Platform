beforeEach(() => {
  cy.visit('/login');
});

describe('login', () => {
  it('login user', () => {
    cy.viewport('macbook-11');
    cy.get('[data-testid="Email Address"]').type('test123@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="sign-in"]').click();
  });
  it('login user and logout', () => {
    cy.viewport('macbook-11');
    cy.get('[data-testid="Email Address"]').type('test123@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="sign-in"]').click();
    cy.get('[data-testid="logout"]').click();
  });
});
