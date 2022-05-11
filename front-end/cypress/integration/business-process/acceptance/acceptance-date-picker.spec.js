/*
* User Story #1 (functionality of DatePicker):
Ben from the maintenance team found an unknown issue reported on 05/01/2022 after 1:00:00 AM. He wants to look at one hour’s activities from all domains starting 1:00:00 AM to figure out the specific activity with the issue.
*/

import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {selectTreeItem} from '../../../support/business-process/input/tree-selection';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';
import {
  interceptBusinessDomainList,
  interceptGridAPI,
  interceptTreeAPI,
} from '../../../support/business-process/utility/intercept';
import {clickTableApplyButton, clickTreeApplyButton} from '../../../support/business-process/input/apply-button';

const testingEAITransactionId = 'eai-trans-id-bAXGNC-039696';
const testingTime = '2022-05-01T06:00:00+00:00';

const getStartDateByPopper = () => {
  cy.get('#bp-tree-filter-start-date-picker-field').clear().click();
  cy.get('.css-i6bazn > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root').click();
  cy.get('.MuiTypography-root').eq(0).click();
  cy.get('.css-1umqo6f').click(160, 30, {force: true}).click(110, 5, {force: true});
};

describe.skip('Acceptance Test of User 1', () => {
  it('Finish page preparation', () => {
    cy.visit('/business-process');
    cy.clock(moment(testingTime).utc().toDate().getTime());
    goThroughLogin();
  });

  const currentTime = moment(testingTime);
  const past1Hour = currentTime.clone().subtract(1, 'hours');

  it('DatePicker should show business processes correctly', () => {
    interceptTreeAPI({
      startDate: past1Hour,
      endDate: currentTime,
    }).as('getTree');

    getStartDateByPopper();
    inputEndDate('+1h');
    clickTreeApplyButton();
    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
    }).as('getGrid');

    selectTreeItem(testingEAITransactionId);
    cy.wait('@getGrid');

    interceptBusinessDomainList();
  });

  it('Business processes with errors would only be shown after applying severity filter', () => {
    cy.get('#bp-activity-filter-severity-checkall-button').click();

    // Filter the error activities
    cy.get(`#bp-activity-filter-severity-selector-option-error`).click();
    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
      severities: ['error'],
    }).as('getGrid');
    clickTableApplyButton();
    cy.wait('@getGrid');
  });
});
