// input test - testing the form components


describe('input test - Application', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('gives input to application dropdown', ()=>{
    cy.get(`[data-testid='dropdown-app']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("CRM")').click();
    cy.get(`[data-testid='dropdown-app']`).contains('CRM');
  });
});
