// run through a quick filter and test table pagination

before(() => {
  cy.visit('/LogEvent');
  cy.get('.MuiButton-root').first().click();
});

describe('testing pagination of the log event table', ()=>{
  it('logs in', ()=>{
    cy.get('.form > :nth-child(1)')
        .type('test');
    cy.get('.form > :nth-child(2)')
        .type('test');
    cy.get('.form > :nth-child(3)')
        .click();
  });

  it('inputs filters', ()=>{
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('05/01/2022 00:00')
        .type('{enter}');
    cy.get(`[id='logevent-datepicker-todate-field']`).type('05/02/2022 00:00')
        .type('{enter}');
  });

  it('paginates', ()=>{

  });
});
