// testing user stories


// tests user story (Log Details (through log events))
describe.skip('input test - Log Details (through log events)', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('Click login', () => {
    cy.get(`[data-testid='button-login']`)
        .click({timeout: 12000});
  });

  it('Choose from date', () => {
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
  });

  it('Choose to date', () => {
    cy.get(`[id='logevent-datepicker-todate-field']`).type('05/01/2022 00:00')
        .type('{enter}');
  });

  //   it('Check all severity', () => {
  //     cy.get(`[id='logevent-severity-selector']`)
  //         .contains(`Check All`)
  //         .click();
  //   });

  //   it('Check all priority', () => {
  //     cy.get(`[id='logevent-priority-selector']`)
  //         .contains(`Check All`)
  //         .click();
  //   });

  //   it('Check all category', () => {
  //     cy.get(`[id='logevent-category-selector']`)
  //         .contains(`Check All`)
  //         .click();
  //   });

  it('Click apply all', () => {
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });

  it('Click first log detail hyperlink', () => {
    cy.get(`[hyperlink-testid='0']`)
        .click();
  });
});


// tests user story (Sorting Results (log events))

describe.skip('input test - Sorting Results (log events)', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/');
  });

  it('Click login', () => {
    cy.get(`[data-testid='button-login']`)
        .click({timeout: 12000});
  });

  it('Navigate to LogEvent view', () => {
    cy.get('.css-8nsog4-MuiButtonBase-root-MuiButton-root > a').click();
  });

  it('Choose from date', () => {
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
  });

  it('Choose to date', () => {
    cy.get(`[id='logevent-datepicker-todate-field']`).type('03/01/2022 00:00')
        .type('{enter}');
  });

  //   it('Check all severity', () => {
  //     cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
  //         .click();
  //   });

  //   it('Check all priority', () => {
  //     cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
  //         .click();
  //   });

  //   it('Check all category', () => {
  //     cy.get(`[data-testid='checkbox-category-checkAllButton']`)
  //         .click();
  //   });

  it('Click apply all', () => {
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });

  it('Sort dates from earliest to latest', () => {
    cy.get(`[data-testid='logevent-button-sort-date']`)
        .click()
        .click();
  });
});


// tests user story (Refresh (log events))
describe.skip('input test - Apply Button Functionality', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('Click login', () => {
    cy.get(`[data-testid='button-login']`)
        .click({timeout: 12000});
  });

  it('Choose from date', () => {
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('04/01/2022 00:00')
        .type('{enter}');
  });

  it('Choose to date', () => {
    cy.get(`[id='logevent-datepicker-todate-field']`).type('04/26/2022 00:00')
        .type('{enter}');
  });

  it('Check warning severity', () => {
    cy.get(`[id='logevent-severity-selector-option-success']`)
        .click();
    cy.get(`[id='logevent-severity-selector-option-info']`)
        .click();
    cy.get(`[id='logevent-severity-selector-option-error']`)
        .click();
  });

  it('Check high priority', () => {
    cy.get(`[id='logevent-priority-selector-option-medium']`)
        .click();
    cy.get(`[id='logevent-priority-selector-option-low']`)
        .click();
  });

  it('Check ReportFail category', () => {
    cy.get(`[id='logevent-category-selector-option-reportupdate']`)
        .click();
    cy.get(`[id='logevent-category-selector-option-reportpersisted']`)
        .click();
  });

  it('Click apply all', () => {
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });
});


// tests user story (Priorities and categories (log events))
describe.skip('input test - Select medium priority and status', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('Click login', () => {
    cy.get(`[data-testid='button-login']`)
        .click({timeout: 12000});
  });

  it('Choose from date', () => {
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
  });

  it('Choose to date', () => {
    cy.get(`[id='logevent-datepicker-todate-field']`).type('02/01/2022 00:00')
        .type('{enter}');
  });

  //   it('Check all severity', () => {
  //     cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
  //         .click();
  //   });

  it('Check medium priority', () => {
    cy.get(`[id='logevent-priority-selector-option-low']`)
        .click();
    cy.get(`[id='logevent-priority-selector-option-high']`)
        .click();
  });

  it('Check ReportUpdate category', () => {
    cy.get(`[id='logevent-category-selector-option-reportfail']`)
        .click();
    cy.get(`[id='logevent-category-selector-option-reportpersisted']`)
        .click();
  });

  it('Click apply all', () => {
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });
});


// tests user story (Severities (log events))
describe.skip('input test - Select warning and success severities', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('Click login', () => {
    cy.get(`[data-testid='button-login']`)
        .click({timeout: 12000});
  });

  it('Choose from date', () => {
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/01/2022 00:00')
        .type('{enter}');
  });

  it('Choose to date', () => {
    cy.get(`[id='logevent-datepicker-todate-field']`).type('02/01/2022 00:00')
        .type('{enter}');
  });

  it('Check success and warning severity', () => {
    cy.get(`[id='logevent-severity-selector-option-info']`)
        .click();
    cy.get(`[id='logevent-severity-selector-option-error']`)
        .click();
  });

  //   it('Check all priority', () => {
  //     cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
  //         .click();
  //   });

  //   it('Check all category', () => {
  //     cy.get(`[data-testid='checkbox-category-checkAllButton']`)
  //         .click();
  //   });

  it('Click apply all', () => {
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });
});


// tests user story (Start/End Time (log events))
describe.skip('input test - see all events from January 17, 2022 to April 11, 2022', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('Click login', () => {
    cy.get(`[data-testid='button-login']`)
        .click({timeout: 12000});
  });

  it('Choose from date', () => {
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('01/17/2022 00:00')
        .type('{enter}');
  });

  it('Choose to date', () => {
    cy.get(`[id='logevent-datepicker-todate-field']`).type('04/11/2022 00:00')
        .type('{enter}');
  });

  //   it('Check all severity', () => {
  //     cy.get(`[data-testid='checkbox-severity-checkAllButton']`)
  //         .click();
  //   });

  //   it('Check all priority', () => {
  //     cy.get(`[data-testid='checkbox-priority-checkAllButton']`)
  //         .click();
  //   });

  //   it('Check all category', () => {
  //     cy.get(`[data-testid='checkbox-category-checkAllButton']`)
  //         .click();
  //   });

  it('Click apply all', () => {
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });
});
