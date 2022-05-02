// input test - testing the dropdown components


describe.skip('input test - dropdowns', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/LogEvent');
    cy.get('.MuiButton-root').first().click();
  });

  it('gives input to eai dropdown', ()=>{
    cy.get(`[data-testid='dropdown-eai']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("EAI Domain 1")').click();
    cy.get(`[data-testid='dropdown-eai']`).contains('EAI Domain 1');
  });

  it('gives input to application dropdown', ()=>{
    cy.get(`[data-testid='dropdown-app']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("CRM")').click();
    cy.get(`[data-testid='dropdown-app']`).contains('CRM');
  });

  it('gives input to process/service dropdown', ()=>{
    cy.get(`[data-testid='dropdown-ps']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("Update Customer")').click();
    cy.get(`[data-testid='dropdown-ps']`).contains('Update Customer');
  });

  it('gives input to business subdomain dropdown', ()=>{
    cy.get(`[data-testid='dropdown-bsd']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("Business SubDomain 1")').click();
    cy.get(`[data-testid='dropdown-bsd']`).contains('Business SubDomain 1');
  });

  it('gives input to business domain dropdown', ()=>{
    cy.get(`[data-testid='dropdown-bd']`).trigger('mousedown', {button: 0});
    cy.get('[role=option]:contains("Business Domain 1")').click();
    cy.get(`[data-testid='dropdown-bd']`).contains('Business Domain 1');
  });
});
