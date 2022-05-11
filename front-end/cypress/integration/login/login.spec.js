describe('Login testing', () => {
    beforeEach('Load Login page', () => {
        cy.visit('/')
    })
    it("Entering no email or password doesn't navigate to Dashboard", () => {
        cy.get('button').eq(0).click()
        cy.url().should('eq', "http://localhost:3000/")
    })
    it("Entering an email and no password doesn't navigate to Dashboard", () => {
        cy.get('input').eq(0).type('username@email.com')
        cy.get('button').eq(0).click()
        cy.url().should('eq', "http://localhost:3000/")
    })
    it("Entering a password and no email doesn't navigate to Dashboard", () => {
        cy.get('input').eq(1).type('password')
        cy.get('button').eq(0).click()
        cy.url().should('eq', "http://localhost:3000/")
    })
    it("Entering an email and a password navigates to Dashboard", () => {
        cy.get('input').eq(0).type('username@email.com')
        cy.get('input').eq(1).type('password')
        cy.get('button').eq(0).click()
        cy.url().should('eq', "http://localhost:3000/")
    })
    it("Clicking on Forgot Password works without error", () => {
        cy.get('button').eq(1).click()
    })
})