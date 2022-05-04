import {goThroughLogin} from '../../../support/business-process/utility/general';
import {domainSelection} from '../../../support/business-process/input/domain-selection';
import moment from 'moment';
import {generatePath} from '../../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';
import {BPTreeMockAPI} from '../../../support/business-process/mock-api/tree';
import {selectTreeItem} from '../../../support/business-process/input/tree-selection';
import {severityOptions, sortSeverityTags} from '../../../../utils/business-process/severity';

const testingEAITransactionId = 'eai_acc_server_25781_1';

// Call before every test to prepare the environment.
const prepare = () => {
  before(() => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    const treePath = generatePath('/businessProcessTree', {
      'startTime': convertToAPIFormat(past30Minutes),
      'endTime': convertToAPIFormat(currentTime),
    });
    // IMPORTANT: Intercepting the corresponding API request when there is one.
    cy.intercept('GET', treePath, {
      statusCode: 200,
      body: BPTreeMockAPI.getTreeResult({}),
    }).as('getTree');

    cy.visit('/business-process');
    cy.clock(currentTime.toDate().getTime());
    goThroughLogin();

    const gridPath = generatePath('/businessProcessGrid', {
      'eaiTransactionId': testingEAITransactionId,
    });
    cy.intercept('GET', gridPath, {
      statusCode: 200,
      body: [],
    }).as('getGrid');
    // Select the first tree item in order to test the grid.
    selectTreeItem(testingEAITransactionId);
    cy.wait('@getGrid');
  });
};

const selectBusinessDomain = (count) => {
  return domainSelection(count, '#bp-activity-filter-business-domain');
};

// Click on a severity tag by option key.
const clickSeverity = (option) => {
  cy.get(`#bp-activity-filter-severity-selector-option-${option}`).click();
};

// Click apply button of activity filter.
const clickApply = () => {
  cy.get('#bp-activity-filter-apply-button').click();
};

describe('Activity filter basic integration', () => {
  prepare();

  it('Severity sort function should work properly.', () => {
    const sortedSeverity = sortSeverityTags(['warning', 'success', 'info']);
    expect(sortedSeverity).to.deep.equal(['success', 'info', 'warning']);

    const sortedSeverity2 = sortSeverityTags(['info', 'success', 'warning']);
    expect(sortedSeverity2).to.deep.equal(['success', 'info', 'warning']);
  });

  it('API should be fired correctly without filter.', () => {
    const gridPath = generatePath('/businessProcessGrid', {
      'eaiTransactionId': testingEAITransactionId,
      'severities': sortSeverityTags(severityOptions),
    });
    cy.intercept('GET', gridPath, {
      statusCode: 200,
      body: [],
    }).as('getGrid');
    clickApply();
    cy.wait('@getGrid');
  });

  it('API Path is fired correctly with domain selected.', () => {
    selectBusinessDomain(2).then((selectedDomain) => {
      const gridPath = generatePath('/businessProcessGrid', {
        'eaiTransactionId': testingEAITransactionId,
        'businessDomain': selectedDomain,
        'severities': sortSeverityTags(severityOptions),
      });
      cy.intercept('GET', gridPath, {
        statusCode: 200,
        body: [],
      }).as('getGrid');
      clickApply();
      cy.wait('@getGrid');
    });
  });
});

describe('Activity filter severity integration', () => {
  prepare();

  // Generate a random number of options to be selected.
  const shouldSelectCount = Math.floor(Math.random() * (severityOptions.length - 1)) + 1;
  const randomOptions = new Set();
  while (randomOptions.size < shouldSelectCount) {
    randomOptions.add(severityOptions[Math.floor(Math.random() * severityOptions.length)]);
  }

  it('Click on random severity options should work.', () => {
    cy.wrap(Array.from(randomOptions)).each((option) => {
      clickSeverity(option);
    });
    const gridPath = generatePath('/businessProcessGrid', {
      'eaiTransactionId': testingEAITransactionId,
      'severities': sortSeverityTags(
          severityOptions.filter((option) => !randomOptions.has(option))
      ),
    });
    cy.intercept('GET', gridPath, {
      statusCode: 200,
      body: [],
    }).as('getGrid');
    clickApply();
    cy.wait('@getGrid');
  });

  it('API Path is fired correctly with domain selected.', () => {
    selectBusinessDomain(2).then((selectedDomain) => {
      const gridPath = generatePath('/businessProcessGrid', {
        'eaiTransactionId': testingEAITransactionId,
        'businessDomain': selectedDomain,
        'severities': sortSeverityTags(
            severityOptions.filter((option) => !randomOptions.has(option))
        ),
      });
      cy.intercept('GET', gridPath, {
        statusCode: 200,
        body: [],
      }).as('getGrid');
      clickApply();
      cy.wait('@getGrid');
    });
  });
});


