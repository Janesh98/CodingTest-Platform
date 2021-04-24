beforeEach(() => {
  cy.visit('/codingtest/603eb0c20b376e4320e3b3be/607c75fda139d62d1817d7bb');
  cy.wait(4000);
});

describe('Coding Test', () => {
  it('Complete Coding Test in Python', () => {
    // Q1
    cy.get('[data-testid="editor"]')
      .get('textarea')
      .type('print("hello world")');
    cy.get('#runcode').get('button').contains('Run Code').click().wait(10000);
    cy.get('#vertical-tab-1').click();
    cy.get('#vertical-tab-1').get('.MuiTab-wrapper').get('svg').should('exist');
    // Q2
    cy.get('#scrollable-auto-tab-1').click();
    cy.get('[data-testid="editor"]')
      .get('textarea')
      .type('print("hello world")');
    cy.get('#runcode').get('button').contains('Run Code').click().wait(10000);
    cy.get('#vertical-tab-1').click();
    cy.get('#vertical-tab-1').get('.MuiTab-wrapper').get('svg').should('exist');
    // Submit Test
    cy.get('[data-testid="submit"]').contains('Submit Test').click();
  });
});
