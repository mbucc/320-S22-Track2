/* eslint-disable eol-last */

// TODO: Write tests for the tree view.
before(() => {
  cy.visit('/business-process');
  cy.get('.MuiButton-root').first().click();
});

const TopDomain = 'EAI Domain';
const BizDomain = 'Publishing Business Domain';
const BizProcess = 'Business Process';

describe('Visit the page.', () => {
  it('Successfully load the business process page.', () => {
    cy.get('#bp-root').should('be.visible');
  });
});

describe('Expand all shows all elements, and collapse all hides all elements.', ()=>{
  it('Clicks expand all.', () => {
    cy.get('#expand-collapse-all-button').contains('Expand').click();
    cy.get('.tree-log').each((log, index, list) =>{
      cy.wrap(log).scrollIntoView().should('be.visible');
    });
  });
  it('Clicks collapse all.', ()=>{
    cy.get('#expand-collapse-all-button').contains('Collapse').click();
    cy.get('.tree-log').each((log, index, list) =>{
      cy.wrap(log).scrollIntoView().should('not.be.visible');
    });
  });
  it('Expands each node.', ()=>{
    // let len = cy.wrap(allLogs).length
    cy.get('li.eai-domain').each((eai)=>{
      cy.wrap(eai).contains(TopDomain).click();
    })
        .children().get('li.publishing-biz-domain').each((pubBiz)=>{
          cy.wrap(pubBiz).contains(BizDomain).click();
        })
        .children().get('li.biz-process').each((bizProcess)=>{
          cy.wrap(bizProcess).contains(BizProcess).click();
        })
        .children().get('li.tree-log').each((log)=>{
          cy.wrap(log).click();
        });
  });
});
