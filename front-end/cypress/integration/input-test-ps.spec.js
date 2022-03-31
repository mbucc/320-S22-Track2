// input test - testing the form components


describe('input test - Process/Service', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/LogEvent');
  });

  it('gives input to process/service dropdown', ()=>{
    cy.get(`[data-testid='dropdown-ps']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("Update Customer")').click();
    cy.get(`[data-testid='dropdown-ps']`).contains('Update Customer');
  });
});
