describe('Donut Charts Testing', () => {
    beforeEach('Bypass login page', () => {
        cy.visit('/')
        cy.get('input').eq(0).type('username@email.com')
        cy.get('input').eq(1).type('password')
        cy.get('button').eq(0).click()
        cy.get('#Dropdown').click().get('#1_Day').click()
        cy.wait(3000)
    })
    it('Clicking on Percent Contribution to Warnings donut chart navigates to Business Processes page', () => {
        cy.get('#__next').eq(0).click(120, 500)
        cy.url().should('eq', "http://localhost:3000/business-process")
    })
    it('Test clicking on Percent Contribution to Errors donut chart', () => {
        cy.get('#__next').eq(0).click(400, 500)
        cy.url().should('eq', "http://localhost:3000/business-process")
    })
})