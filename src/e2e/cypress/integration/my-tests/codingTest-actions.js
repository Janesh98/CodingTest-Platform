beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit('/codingtest/6093ca74bb551c1e20f14fbf/60951493dca4551c5aa2cd73');
  cy.wait(8000);
});

describe('Coding Test', () => {
  it('Should Complete Coding Test in Python and Submit', () => {
    // Q1
    cy.get('[data-testid="editor"]')
      .get('textarea')
      .type('print("Hello World")');
    cy.get('#runcode').get('button').contains('Run Code').click().wait(15000);
    cy.get('#vertical-tab-0').click();
    cy.get('#vertical-tab-0').get('.MuiTab-wrapper').get('svg').should('exist');
    // Q2
    cy.get('#scrollable-auto-tab-1').click();
    cy.get('[data-testid="editor"]')
      .get('textarea')
      .type('print("Hello World")');
    cy.get('#runcode').get('button').contains('Run Code').click().wait(15000);
    cy.get('#vertical-tab-0').click();
    cy.get('#vertical-tab-0').get('.MuiTab-wrapper').get('svg').should('exist');
    // Submit Test
    cy.get('[data-testid="submit"]').contains('Submit Test').click();
  });
});
