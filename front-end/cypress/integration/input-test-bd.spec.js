// input test - testing the form components


describe('input test - Business Domain', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('gives input to business domain dropdown', ()=>{
    cy.get(`[data-testid='dropdown-bd']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("Business Domain 1")').click();
    cy.get(`[data-testid='dropdown-bd']`).contains('Business Domain 1');
  });
});
