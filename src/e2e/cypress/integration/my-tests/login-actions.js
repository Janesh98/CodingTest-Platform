beforeEach(() => {
  cy.viewport(1920, 1080);

  cy.visit('/login');
});

describe('login', () => {
  it('login user', () => {
    cy.get('[data-testid="Email Address"]').type('test123@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="sign-in"]').click();
  });
  it('login user and logout', () => {
    cy.get('[data-testid="Email Address"]').type('test123@mail.com');
    cy.get('[data-testid="Password"]').type('123456');
    cy.get('[data-testid="sign-in"]').click();
    cy.get('[data-testid="logout"]').click();
  });
});
