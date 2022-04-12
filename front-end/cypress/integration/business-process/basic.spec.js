// This test is checking if the business process page can be visited successfully.

before(() => {
  cy.visit('/business-process');
});

describe('Visit the page.', () => {
  it('Successfully load the business process page.', () => {
    cy.get('#bp-root').should('be.visible');
  });
});