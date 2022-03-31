// input test - testing the form components


describe('input test - Business Subdomain', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('gives input to business subdomain dropdown', ()=>{
    cy.get(`[data-testid='dropdown-bsd']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("Business SubDomain 1")').click();
    cy.get(`[data-testid='dropdown-bsd']`).contains('Business SubDomain 1');
  });
});
