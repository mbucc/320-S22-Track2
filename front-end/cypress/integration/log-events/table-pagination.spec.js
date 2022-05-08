// run through a quick filter and test table pagination


before(() => {
  cy.visit('/LogEvent');
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
    cy.get(`[id='logevent-datepicker-fromdate-field']`).type('05/01/2022 9:00 AM')
        .type('{enter}');
    cy.get(`[id='logevent-datepicker-todate-field']`).type('05/01/2022 9:10 AM')
        .type('{enter}');
  });

  it('clicks apply', ()=>{
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
  });

  it('goes to the last page', ()=>{
    const visitNextPage = ()=>{
      cy.get('[title="Go to next page"]').then(($next)=>{
        if ($next.hasClass('Mui-disabled')) {
          return;
        }
        console.log($next);

        cy.get('[title="Go to next page"]').click();
        visitNextPage();
      });
    };
    visitNextPage();
  });
});
