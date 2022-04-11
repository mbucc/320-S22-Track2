/* eslint-disable eol-last */

// TODO: Write tests for the tree view.
before(() => {
    cy.visit('/business-process');
  });
  
describe('Visit the page.', () => {
  it('Successfully load the business process page.', () => {
    cy.get('#bp-root').should('be.visible');
  });
});

describe('Expand all shows all elements, and collapse all hides all elements.',()=>{
  it('Clicks expand all.',()=>{
    cy.get('#expand-collapse-all-button').contains('Expand').click()
    cy.get('#BPTree-log').should('be.visible')
  });
  it('Clicks collapse all.',()=>{
    cy.get('#expand-collapse-all-button').contains('Collapse').click()
    cy.get('#BPTree-log').should('not.be.visible')
  });
});
