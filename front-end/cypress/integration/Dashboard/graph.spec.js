describe('Testing See More Buttons in Timeline Component', () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get('#email').first().type('a')
        cy.get('#password').first().type('ab')
        cy.get('.MuiButton-root').first().click()
    })
    it('Check if Total Logs Navigates to Log Events', () => {
        cy.get('.MuiButton-root').eq(8).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Check if Total Logs Navigates to Log Events', () => {
        cy.get('.MuiButton-root').eq(9).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Check if Total Logs Navigates to Log Events', () => {
        cy.get('.MuiButton-root').eq(10).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
  })