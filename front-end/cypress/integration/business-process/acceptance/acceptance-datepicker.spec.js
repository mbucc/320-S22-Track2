/*
* User Story #1 (functionality of DatePicker):
Ben from the maintenance team found an unknown issue reported on 05/01/2022 after 1:00:00 AM. He wants to look at one hour’s activities from all domains starting 1:00:00 AM to figure out the specific activity with the issue.
*/

import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';
import {
  interceptBusinessDomainList,
  interceptGridAPI,
  interceptTreeAPI,
} from '../../../support/business-process/utility/intercept';
import {clickTreeApplyButton} from '../../../support/business-process/input/apply-button';

const testingTime = '2022-05-01T06:00:00+00:00';

// Call before every test to prepare the environment.
before(() => {
  cy.visit('/business-process');
  cy.clock(moment(testingTime).utc().toDate().getTime());
  goThroughLogin();
});

const getStartDateByPopper = () => {
  cy.get('#bp-tree-filter-start-date-picker-field').clear().click();
  cy.get('.css-i6bazn > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root').click();
  cy.get('.MuiTypography-root').eq(0).click();
  cy.get('.css-1umqo6f').click(160, 30, {force: true}).click(110, 5, {force: true});
};

describe('Acceptance Test of User 1', () => {
  const currentTime = moment(testingTime);
  const past1Hour = currentTime.clone().subtract(1, 'hours');

  it('Test Functionality of DatePicker', () => {
    interceptTreeAPI({
      startDate: past1Hour,
      endDate: currentTime,
    }).as('getTree');

    getStartDateByPopper();
    inputEndDate('+1h');
    clickTreeApplyButton();
    cy.get('#expand-collapse-all-button').click();
  });
});
