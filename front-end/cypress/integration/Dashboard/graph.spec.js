describe('Timeline Testing', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('input').eq(0).type('username@email.com')
        cy.get('input').eq(1).type('password')
        cy.get('button').eq(0).click()
    })
    it('Clicking on See More under Total Logs navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(4).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Clicking on See More under Total Errors Navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(5).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Clicking on See More under Total Warnings Navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(6).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
  })