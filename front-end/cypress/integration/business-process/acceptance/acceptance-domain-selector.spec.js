/*June, a staff member from the support team, receives a
ticket for incorrect Accounting information at 9AM today.*/

import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {selectSpecificPubDomain} from '.../.../.../support/business-process/input/domain-selection'
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';
import {
  interceptBusinessDomainList,
  interceptGridAPI,
  interceptTreeAPI,
} from '../../../support/business-process/utility/intercept';
import {clickTreeApplyButton} from '../../../support/business-process/input/apply-button';


const startDate = '5/9/2022, 9 AM';
const endDate = '5/9/2022 9:10 AM'

before(() => {
    cy.visit('/business-process');
    cy.clock(moment(startDate).utc().toDate().getTime());
    goThroughLogin();
  });

describe('Select accounting from publishing business domain', () => {
    const targetTime = moment(startDate); //9 am 
    const endTime = moment(endDate)
    it("Inputs proper start and end time and publishing business domain", () => {
        interceptTreeAPI({
            startDate : targetTime,
            endDate : endTime
        }).as('getTree');
    cy.get('#bp-tree-filter-publishing-business-domain-selector').click();
    selectSpecificPubDomain('accounting_app');
    clickTreeApplyButton();
    });
});
