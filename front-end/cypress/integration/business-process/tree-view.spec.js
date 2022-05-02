/* eslint-disable eol-last */

// TODO: Write tests for the tree view.

import {BPTreeMockAPI} from '../../support/business-process/mock-api/tree';
import moment from 'moment';
import {generatePath} from '../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../utils/business-process/date-options';
import {goThroughLogin} from '../../support/business-process/utility/general';

before(() => {
  cy.visit('/business-process');

  // This is a minimal example on how to generate a path and then intercept the API request.
  const currentTime = moment();
  const past30Minutes = currentTime.clone().subtract(30, 'minutes');
  const defaultPath = generatePath('/businessProcessTree', {
    'startTime': convertToAPIFormat(past30Minutes),
    'endTime': convertToAPIFormat(currentTime),
  });
  // IMPORTANT: Intercepting the corresponding API request when there is one.
  cy.intercept('GET', defaultPath, {
    statusCode: 200,
    body: BPTreeMockAPI.getTreeResult({}),
  }).as('getTree');

  cy.clock(currentTime.toDate().getTime());
  goThroughLogin();
});

const TopDomain = 'EAI Domain';
const BizDomain = 'Publishing Business Domain';
const BizProcess = 'Business Process';

describe('Visit the page.', () => {
  it('Successfully load the business process page.', () => {
    cy.wait('@getTree'); // IMPORTANT: Checking if the API request is made successfully.
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
