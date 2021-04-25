beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit('/codingtest/6082bed8047d59e806271639/60841db403eaf51b98058e27');
  cy.wait(8000);
});

describe('Coding Test', () => {
  it('Should Complete Coding Test in Python and Submit', () => {
    // Q1
    cy.get('[data-testid="editor"]')
      .get('textarea')
      .type('print("hello world")');
    cy.get('#runcode').get('button').contains('Run Code').click().wait(10000);
    cy.get('#vertical-tab-0').click();
    cy.get('#vertical-tab-0').get('.MuiTab-wrapper').get('svg').should('exist');
    // Q2
    cy.get('#scrollable-auto-tab-1').click();
    cy.get('[data-testid="editor"]')
      .get('textarea')
      .type('print("hello world")');
    cy.get('#runcode').get('button').contains('Run Code').click().wait(10000);
    cy.get('#vertical-tab-0').click();
    cy.get('#vertical-tab-0').get('.MuiTab-wrapper').get('svg').should('exist');
    // Submit Test
    cy.get('[data-testid="submit"]').contains('Submit Test').click();
  });
});
