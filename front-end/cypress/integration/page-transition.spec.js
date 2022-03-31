// transition.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Home Button', () => {
  it('Brings us to home page', () => {
    cy.visit('http://localhost:3000/LogEvent');

    // click menun button in header
    cy.get('.MuiIconButton-root').first().click();
    cy.get('.MuiMenuItem-root').first().click();

    // should take us back to home page
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
