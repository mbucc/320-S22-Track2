// input test - testing the form components


describe('input test - EAI Domain', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('gives input to eai dropdown', ()=>{
    cy.get(`[data-testid='dropdown-eai']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("EAI Domain 1")').click();
    cy.get(`[data-testid='dropdown-eai']`).contains('EAI Domain 1');
  });
});
