
describe.skip('Checks if see more working properly', () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get('.MuiButton-root').first().click()
    })

    it('High priority logs navigates to log events', () => {
        cy.get('.MuiButton-root').eq(4).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Medium priority logs navigates to log events', () => {
        cy.get('.MuiButton-root').eq(5).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Error logs navigates to log events', () => {
        cy.get('.MuiButton-root').eq(6).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Warning logs navigates to log events', () => {
        cy.get('.MuiButton-root').eq(7).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
})
