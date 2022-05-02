/* eslint-disable eol-last*/
/* eslint-disable require-jsdoc*/
/* eslint-disable guard-for-in*/

// TODO: Write tests for the tree view.

import {BPTreeMockAPI} from '../../support/business-process/mock-api/tree';
import moment from 'moment';
import {generatePath} from '../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../utils/business-process/date-options';
import {goThroughLogin} from '../../support/business-process/utility/general';

const MockData = BPTreeMockAPI.getTreeResult({});


function countLogs(MockData) {
  let count = 0;
  for (const eai in MockData) {
    for (const pub in eai) {
      for (const bp in pub) {
        count += bp.length;
      }
    }
  }
  return count;
}
before(() => {
  cy.visit('/business-process');
  // This is a minimal example on how to generate a path and then intercept the API request.
  const currentTime = moment();
  const past30Minutes = currentTime.clone().subtract(30, 'minutes');
  const defaultPath = generatePath('/businessProcessTree', {
    'startTime': convertToAPIFormat(past30Minutes),
    'endTime': convertToAPIFormat(currentTime),
  });
  cy.intercept('GET', defaultPath, {
    statusCode: 200,
    body: MockData,
  });

  cy.clock(currentTime.toDate().getTime());
  goThroughLogin();
});

// const TopDomain = 'EAI Domain';
// const BizDomain = 'Publishing Business Domain';
// const BizProcess = 'Business Process';


describe('Populate the tree with test data.', ()=>{
  it('Enters mock start and end date', () => {
    cy.get('#bp-tree-filter-end-date-picker-field').type('now').type('{enter}');
    cy.get('#bp-tree-filter-start-date-picker-field').type('-30m').type('{enter}');
  });
});

describe('Expand all shows all elements, and collapse all hides all elements.', ()=>{
  it('Clicks expand all.', () => {
    cy.get('#expand-collapse-all-button').contains('Expand').click();
    cy.get('.tree-log').each((log, index, list) =>{
      cy.wrap(log).scrollIntoView().should('be.visible');
    });
    cy.get('.tree-log').should('have.length', countLogs(MockData));
  });

  it('Clicks collapse all.', ()=>{
    cy.get('#expand-collapse-all-button').contains('Collapse').click();
    cy.get('.tree-log').each((log, index, list) =>{
      cy.wrap(log).should('not.exist');
    });
  });
});
describe('Manually clicks each node.', ()=>{
  it('Expands each node.', ()=>{
    // let len = cy.wrap(allLogs).length
    cy.get('li.eai-domain').each((eai)=>{
      // cy.wrap(eai).contains(TopDomain).click();
      cy.wrap(eai).click();
    })
        .children().get('li.publishing-biz-domain').each((pubBiz)=>{
          // cy.wrap(pubBiz).contains(BizDomain).click();
          cy.wrap(pubBiz).click();
        })
        .children().get('li.biz-process').each((bizProcess)=>{
          // cy.wrap(bizProcess).contains(BizProcess).click();
          cy.wrap(bizProcess).click();
        })
        .children().get('li.tree-log').each((log)=>{
          cy.wrap(log).scrollIntoView().should('be.visible');
        });
  });
});