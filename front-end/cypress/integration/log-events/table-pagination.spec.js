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
  });
});
