before(() => {
    cy.visit("/")
    cy.get('.MuiButton-root').first().click()
})

describe('Line Graph Test', () => {
    it('Checks if see more working properly', () => {
        cy.get('.MuiButton-root').eq(4).click()
        cy.url().should('eq', "http://localhost:3000/log-events")
    })
  })