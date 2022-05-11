import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {selectTreeItem} from '../../../support/business-process/input/tree-selection';
import {severityOptions} from '../../../../utils/business-process/severity';
import {interceptGridAPI, interceptTreeAPI} from '../../../support/business-process/utility/intercept';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';

const testingEAITransactionId = 'eai-trans-id-mHyeYm-292953';
const testingTime = '2022-05-08T18:25:00+00:00';

const prepare = () => {
  it('Finish page preparation', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment(testingTime);
    const past = currentTime.clone().subtract(30, 'minutes');
    interceptTreeAPI({
      startDate: past,
      endDate: currentTime,
    }).as('getTree');

    cy.visit('/business-process');
    cy.clock(currentTime.toDate().getTime());
    goThroughLogin();

    inputStartDate(past.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
  });
};

describe('Activity Filter Basic Testing', () => {
  prepare();

  it('Correct API should be request by clicking tree item.', () => {
    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
    }).as('getGrid');
    // Select the corresponding tree item.
    selectTreeItem(testingEAITransactionId);
    cy.wait('@getGrid');
  });
});
