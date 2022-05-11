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
    cy.visit('/');
    cy.get(`input`).first().type('a');
    cy.get('input').last().type('a');
    cy.get('button').contains('Log in').click();

    // click Log Event page button in header
    cy.get('button').contains('Log Events').click();

    // should take us back to Log Event page
    cy.url().should('includes', '/LogEvent');
  });
});

describe('Dashboard from Log Events', () => {
  it('Brings us to home page', () => {
    cy.visit('/LogEvent');

    cy.get(`input`).first().type('a');
    cy.get('input').last().type('a');
    cy.get('button').contains('Log in').click();

    // click menun button in header
    cy.get('button').contains('Dashboard').click();
    // should take us back to home page
    cy.url().should('includes', '/');
  });
});

describe('Business Process from Log Events', () => {
  it('Brings us to Business Process', () => {
    cy.visit('/LogEvent');
    cy.get(`input`).first().type('a');
    cy.get('input').last().type('a');
    cy.get('button').contains('Log in').click();

    // click menun button in header
    cy.get('button').contains('Business Process').click();
    // should take us back to home page
    cy.url().should('includes', 'business-process');
  });
});
