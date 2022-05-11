describe('Counts Testing', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('input').eq(0).type('username@email.com')
        cy.get('input').eq(1).type('password')
        cy.get('button').eq(0).click()
    })
    it('Clicking on See More under High Priority Logs navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(0).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Clicking on See More under Medium priority logs navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(1).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Clicking on See More under Error logs navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(2).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Clicking on See More under Warning logs navigates to Log Events page', () => {
        cy.get('.MuiButton-sizeMedium').eq(3).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
})