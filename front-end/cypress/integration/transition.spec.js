// transition.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('My First Test', () => {
    it('visits page', () => {
      cy.visit("http://localhost:3000/LogEvent")

      //click menun button in header
      cy.get('.MuiIconButton-root').first().click()
      cy.get('.MuiMenuItem-root').first().click()
      
      //should take us back to home page
      cy.url().should('eq', "http://localhost:3000/")
    })
  })