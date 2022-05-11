import {goThroughLogin} from '../../../support/business-process/utility/general';
import {selectBusinessDomain} from '../../../support/business-process/input/domain-selection';
import moment from 'moment';
import {selectTreeItem} from '../../../support/business-process/input/tree-selection';
import {severityOptions, sortSeverityTags} from '../../../../utils/business-process/severity';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';
import {
  interceptBusinessDomainList,
  interceptGridAPI,
  interceptTreeAPI,
} from '../../../support/business-process/utility/intercept';
import {clickTableApplyButton, clickTreeApplyButton} from '../../../support/business-process/input/apply-button';

const testingEAITransactionId = 'eai-trans-id-XQShJj-596835';
const testingTime = '2022-05-03T21:34:00+00:00';

// Call before every test to prepare the environment.
const prepare = () => {
  it('Finish page preparation', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment(testingTime);
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    interceptTreeAPI({
      startDate: past30Minutes,
      endDate: currentTime,
    }).as('getTree');

    cy.visit('/business-process');
    cy.clock(moment(testingTime).utc().toDate().getTime());
    goThroughLogin();

    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    clickTreeApplyButton();

    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
    }).as('getGrid');

    // Select the first tree item in order to test the grid.
    selectTreeItem(testingEAITransactionId);
    cy.wait('@getGrid');

    interceptBusinessDomainList();
  });
};

// Click on a severity tag by option key.
const clickSeverity = (option) => {
  cy.get(`#bp-activity-filter-severity-selector-option-${option}`).click();
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
    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
      severities: severityOptions,
    }).as('getGrid');
    clickTableApplyButton();
    cy.wait('@getGrid');
  });

  it('API Path is fired correctly with domain selected.', () => {
    selectBusinessDomain(2).then((selectedDomain) => {
      interceptGridAPI({
        eaiTransactionId: testingEAITransactionId,
        businessDomains: selectedDomain,
        severities: severityOptions,
      }).as('getGrid');
      clickTableApplyButton();
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
    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
      severities: severityOptions.filter((option) => {
        return !randomOptions.has(option);
      }),
    }).as('getGrid');
    clickTableApplyButton();
    cy.wait('@getGrid');
  });

  it('API Path is fired correctly with domain selected.', () => {
    selectBusinessDomain(2).then((selectedDomain) => {
      interceptGridAPI({
        eaiTransactionId: testingEAITransactionId,
        businessDomains: selectedDomain,
        severities: severityOptions.filter((option) => {
          return !randomOptions.has(option);
        }),
      }).as('getGrid');
      clickTableApplyButton();
      cy.wait('@getGrid');
    });
  });
});


