import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {generatePath} from '../../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';
import {BPTreeMockAPI} from '../../../support/business-process/mock-api/tree';
import {selectTreeItem} from '../../../support/business-process/input/tree-selection';
import {severityOptions, sortSeverityTags} from '../../../../utils/business-process/severity';

const testingEAITransactionId = 'eai_acc_server_25781_1';

beforeEach(() => {
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

  cy.visit('/business-process');
  cy.clock(currentTime.toDate().getTime());
  goThroughLogin();
});

describe('Activity Filter Basic Testing', () => {
  it('Correct API should be request by clicking tree item.', () => {
    const defaultPath = generatePath('/businessProcessGrid', {
      'eaiTransactionId': testingEAITransactionId,
      'severities': sortSeverityTags(severityOptions),
    });
    cy.intercept('GET', defaultPath, {
      statusCode: 200,
      body: [],
    }).as('getGrid');
    // Select the corresponding tree item.
    selectTreeItem(testingEAITransactionId);
    cy.wait('@getGrid');
  });
});
