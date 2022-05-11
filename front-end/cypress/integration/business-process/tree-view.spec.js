/* eslint-disable eol-last*/
/* eslint-disable require-jsdoc*/
/* eslint-disable guard-for-in*/

// TODO: Write tests for the tree view.

import {BPTreeMockAPI} from '../../support/business-process/mock-api/tree';
import moment from 'moment';
import {goThroughLogin} from '../../support/business-process/utility/general';
import {interceptTreeAPI} from '../../support/business-process/utility/intercept';
import {clickTreeApplyButton} from '../../support/business-process/input/apply-button';

const currentTime = moment();
const past30Days = currentTime.clone().subtract(30, 'days');
const MockData = BPTreeMockAPI.getTreeResult({
  startDate: past30Days,
  endDate: currentTime,
});

function countLogs(data) {
  let count = 0;
  Object.keys(data).forEach((eai) =>{
    Object.keys(data[eai]).forEach((pub) =>{
      Object.keys(data[eai][pub]).forEach((bp)=>{
        count += data[eai][pub][bp].length;
      });
    });
  });

  return count;
}

before(() => {
  interceptTreeAPI({
    startDate: past30Days,
    endDate: currentTime,
  }).as('getTree');
  cy.visit('/business-process');
  cy.clock(currentTime.toDate().getTime());
  goThroughLogin();
});

describe('Populate the tree with test data.', () => {
  it('Enters mock start and end date', () => {
    cy.get('#bp-tree-filter-start-date-picker-field').type('-30d').type('{enter}');
    cy.get('#bp-tree-filter-end-date-picker-field').type('now').type('{enter}');
    clickTreeApplyButton();
    cy.wait('@getTree');
  });
});

describe('Expand all shows all elements, and collapse all hides all elements.', () => {
  it('Clicks expand all.', () => {
    cy.get('#expand-collapse-all-button').contains('Expand All').click();
    cy.get('.tree-log').each((log, index, list) =>{
      cy.wrap(log).scrollIntoView().should('be.visible');
    });
    cy.get('.tree-log').should('have.length', countLogs(MockData.eaiMap));
  });

  it('Clicks collapse all.', ()=>{
    cy.get('#expand-collapse-all-button').contains('Collapse All').click();
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
    cy.get('.tree-log').should('have.length', countLogs(MockData.eaiMap));
  });
});
