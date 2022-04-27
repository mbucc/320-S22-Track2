// testing user stories


// tests user story (Log Details (through log events))
describe('input test - Log Details (through log events)', ()=>{
    before(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    it('Click login', () => { 
        cy.get(`[data-testid='button-login']`)
        .click();
    });

    it('Choose from date', () => { 
        cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
    });

    it('Choose to date', () => { 
        cy.get(`[id='logevent-datepicker-todate-field']`).type('03/01/2022 00:00')
        .type('{enter}'); 
    });

    it('Check all severity', () => { 
        cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
        .click();
    });

    it('Check all priority', () => { 
        cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
        .click();
    });

    it('Check all category', () => { 
        cy.get(`[data-testid='checkbox-category-checkAllButton']`)
        .click();
    });

    it('Click apply all', () => { 
        cy.get(`[data-testid='button-apply']`)
        .click();
    });

    it('Click first log detail hyperlink', () => { 
        cy.get(`[hyperlink-testid='0']`)
        .click();
    });
});


// tests user story (Sorting Results (log events))

describe('input test - Sorting Results (log events)', ()=>{
    before(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    it('Click login', () => { 
        cy.get(`[data-testid='button-login']`)
        .click();
    });

    it('Choose from date', () => { 
        cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
    });

    it('Choose to date', () => { 
        cy.get(`[id='logevent-datepicker-todate-field']`).type('03/01/2022 00:00')
        .type('{enter}'); 
    });

    it('Check all severity', () => { 
        cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
        .click();
    });

    it('Check all priority', () => { 
        cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
        .click();
    });

    it('Check all category', () => { 
        cy.get(`[data-testid='checkbox-category-checkAllButton']`)
        .click();
    });

    it('Click apply all', () => { 
        cy.get(`[data-testid='button-apply']`)
        .click();
    });

    it('Sort dates from earliest to latest', () => { 
        cy.get(`[data-testid='button-sort-date']`)
        .click()
        .click();
    });
});


// tests user story (Refresh (log events))
describe('input test - Apply Button Functionality', ()=>{
    before(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    it('Click login', () => { 
        cy.get(`[data-testid='button-login']`)
        .click();
    });

    it('Choose from date', () => { 
        cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
    });

    it('Choose to date', () => { 
        cy.get(`[id='logevent-datepicker-todate-field']`).type('02/01/2022 00:00')
        .type('{enter}'); 
    });

    it('Check warning severity', () => { 
        cy.get(`[data-testid='checkbox-severity-warning']`)
        .click();
    });

    it('Check high priority', () => { 
        cy.get(`[data-testid='checkbox-priority-high']`)
        .click();
    });

    it('Check stop category', () => { 
        cy.get(`[data-testid='checkbox-category-stop']`)
        .click();
    });

    it('Click apply all', () => { 
        cy.get(`[data-testid='button-apply']`)
        .click();
    });

});


// tests user story (Priorities and categories (log events))
describe('input test - Select medium priority and status', ()=>{
    before(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    it('Click login', () => { 
        cy.get(`[data-testid='button-login']`)
        .click();
    });

    it('Choose from date', () => { 
        cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
    });

    it('Choose to date', () => { 
        cy.get(`[id='logevent-datepicker-todate-field']`).type('02/01/2022 00:00')
        .type('{enter}'); 
    });

    it('Check all severity', () => { 
        cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
        .click();
    });

    it('Check medium priority', () => { 
        cy.get(`[data-testid='checkbox-priority-medium']`)
        .click();
    });

    it('Check status category', () => { 
        cy.get(`[data-testid='checkbox-category-status']`)
        .click();
    });

    it('Click apply all', () => { 
        cy.get(`[data-testid='button-apply']`)
        .click();
    });

});


// tests user story (Severities (log events))
describe('input test - Select warning and success severities', ()=>{
    before(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    it('Click login', () => { 
        cy.get(`[data-testid='button-login']`)
        .click();
    });

    it('Choose from date', () => { 
        cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
    });

    it('Choose to date', () => { 
        cy.get(`[id='logevent-datepicker-todate-field']`).type('02/01/2022 00:00')
        .type('{enter}'); 
    });

    it('Check warning severity', () => { 
        cy.get(`[data-testid='checkbox-severity-warning']`)
        .click();
    });

    it('Check success severity', () => { 
        cy.get(`[data-testid='checkbox-severity-success']`)
        .click();
    });

    it('Check all priority', () => { 
        cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
        .click();
    });

    it('Check all category', () => { 
        cy.get(`[data-testid='checkbox-category-checkAllButton']`)
        .click();
    });

    it('Click apply all', () => { 
        cy.get(`[data-testid='button-apply']`)
        .click();
    });

});


// tests user story (Start/End Time (log events))
describe('input test - see all events from January 17, 2022 to April 11, 2022', ()=>{
    before(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    it('Click login', () => { 
        cy.get(`[data-testid='button-login']`)
        .click();
    });

    it('Choose from date', () => { 
        cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/17/2022 00:00')
        .type('{enter}');
    });

    it('Choose to date', () => { 
        cy.get(`[id='logevent-datepicker-todate-field']`).type('04/11/2022 00:00')
        .type('{enter}'); 
    });

    it('Check all severity', () => { 
        cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
        .click();
    });

    it('Check all priority', () => { 
        cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
        .click();
    });

    it('Check all category', () => { 
        cy.get(`[data-testid='checkbox-category-checkAllButton']`)
        .click();
    });

    it('Click apply all', () => { 
        cy.get(`[data-testid='button-apply']`)
        .click();
    });
});
