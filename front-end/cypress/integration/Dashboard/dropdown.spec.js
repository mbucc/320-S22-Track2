describe('Dropdown testing', () => {
    beforeEach('Bypass login page', () => {
        cy.visit('/');
        cy.get('input').eq(0).type('username@email.com');
        cy.get('input').eq(1).type('password');
        cy.get('button').eq(0).click();
    });
    it('Test each dropdown selection', () => {
        cy.get('#Dropdown').click();
        cy.get('#15_Minutes').click();
        cy.get('#Dropdown').click();
        cy.get('#30_Minutes').click();
        cy.get('#Dropdown').click();
        cy.get('#1_Hour').click();
        cy.get('#Dropdown').click();
        cy.get('#4_Hours').click();
        cy.get('#Dropdown').click();
        cy.get('#12_Hours').click();
        cy.get('#Dropdown').click();
        cy.get('#1_Day').click();
    });
    it('Test refresh button', () => {
        cy.get('.MuiIconButton-root').click();
    });
});