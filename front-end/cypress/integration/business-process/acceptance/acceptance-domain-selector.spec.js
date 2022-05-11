/*June, a staff member from the support team, receives a
ticket for incorrect Accounting information at 9AM today.*/

import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';
import {
  interceptBusinessDomainList,
  interceptEAIDomainList,
  interceptGridAPI,
  interceptTreeAPI,
} from '../../../support/business-process/utility/intercept';
import {clickTableApplyButton, clickTreeApplyButton} from '../../../support/business-process/input/apply-button';
import { selectSpecificEAIDomain } from '../../../support/business-process/input/domain-selection';



import {interceptActivityFilter} from '../../../support/business-process/utility/intercept';
import {domainSelection} from '../../../support/business-process/input/domain-selection';
import {generatePath} from '../../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';
import {BPTreeMockAPI} from '../../../support/business-process/mock-api/tree';
import {selectTreeItem} from '../../../support/business-process/input/tree-selection';

const testingTime = '2022-05-09T02:10:32+00:00';
const testingEAITransactionId = 'eai-trans-id-rgewll-158495';

const prepare = () => {
  it('Finish page preparation', () => {
    const currentTime = moment(testingTime);
    interceptEAIDomainList();
    cy.visit('/business-process');
    interceptEAIDomainList();
    cy.clock(moment(testingTime).utc().toDate().getTime());
  });
};

describe('Acceptance Test of User 2', () => {
    prepare();
    const current = moment(testingTime);
    const past10 = current.clone().subtract(10, 'minutes');


  it('Test Domain Selector', () => {

    interceptTreeAPI({
        startDate: past10,
        endDate: current,
        eaiDomains: ['EAI Thompson 9239']
      }).as('getTree');
      selectSpecificEAIDomain('EAI Thompson 9239');
      inputStartDate(past10.format('MM/DD/YYYY HH:mm:ss A'));
      inputEndDate(current.format('MM/DD/YYYY HH:mm:ss A'));

    clickTreeApplyButton();
  });
});



