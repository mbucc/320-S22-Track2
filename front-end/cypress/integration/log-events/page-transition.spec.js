// transition.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/**
 * WARNING: THIS TEST WILL NOT WORK CURRENTLY. WAITING ON DASHBOARD TEAM TO
 * FIX ROUTING BEFORE WE CAN FIX THIS TEST.
 */
describe('Log Event Button', () => {
  it('At home page', () => {
    cy.visit('http://localhost:3000');

    // click Log Event page button in header
    cy.get('button').contains('CLICK TO SEE LOG EVENT PAGE').click();

    // should take us back to Log Event page
    cy.url().should('eq', 'http://localhost:3000/LogEvent');
  });
});

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
