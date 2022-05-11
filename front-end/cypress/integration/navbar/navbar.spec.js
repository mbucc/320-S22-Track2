describe('Navbar Testing', () => {
    beforeEach('Bypass login page', () => {
        cy.visit('/')
        cy.get('input').eq(0).type('username@email.com')
        cy.get('input').eq(1).type('password')
        cy.get('button').eq(0).click()
    })
    it('Clicking on Dashboard navigates to Dashboard page', () => {
        cy.get('button').eq(0).click()
        cy.url().should('eq', "http://localhost:3000/")
    })
    it('Clicking on Business Processes navigates to Business Processes page', () => {
        cy.get('button').eq(1).click()
        cy.url().should('eq', "http://localhost:3000/business-process")
    })
    it('Clicking on Log Events navigates to Log Events page', () => {
        cy.get('button').eq(2).click()
        cy.url().should('eq', "http://localhost:3000/LogEvent")
    })
    it('Clicking on Log Out navigates to Login page', () => {
        cy.get('button').eq(3).click()
        cy.url().should('eq', "http://localhost:3000/")
    })
})