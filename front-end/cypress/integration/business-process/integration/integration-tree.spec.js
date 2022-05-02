import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {generatePath} from '../../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';

beforeEach(() => {
  cy.visit('/business-process');
  goThroughLogin();
});

const inputStartDate = (content) => {
  cy.get('#bp-tree-filter-start-date-picker-field').clear();
  cy.get('#bp-tree-filter-start-date-picker-field').type(content).type('{enter}');
};

const inputEndDate = (content) => {
  cy.get('#bp-tree-filter-end-date-picker-field').clear();
  cy.get('#bp-tree-filter-end-date-picker-field').type(content).type('{enter}');
};

const domainSelectionHelper = ({listSelector, index}) => {
  cy.get('@selectedOptions').then((selectedOptions) => {
    cy.get(`${listSelector} > :nth-child(${index})`).click();
    cy.get(`${listSelector} > :nth-child(${index}) > span`)
        .invoke('text')
        .then((text) => {
          selectedOptions[index] = text;
          return selectedOptions;
        })
        .as('selectedOptions');
  });
};

/**
 * @param {int} count
 * @param {string} id
 * @return {Cypress.Chainable<string[]>}
 */
const domainSelection = (count, id) => {
  const boxSelector = `${id}-selector`;
  const listSelector = `${id}-selector-popper-list`;
  cy.get(boxSelector).click();
  cy.get(listSelector)
      .children().its('length').then((length) => {
        const optionsCount = length - 1;
        // Create this variable as an empty object to store the (sorted) selected options.
        cy.then(() => ({})).as('selectedOptions');
        if (optionsCount > 1) {
          // Generate count number of unique random numbers between 1 and the number of options.
          const randomNumbers = new Set();
          while (randomNumbers.size < count && randomNumbers.size < optionsCount) {
            randomNumbers.add(Math.floor(Math.random() * optionsCount) + 2);
          }
          cy.wrap(Array.from(randomNumbers)).each((index) => {
            domainSelectionHelper({
              listSelector: listSelector,
              index: index,
            });
          });
        }
      });
  cy.get('body').click(0, 0);
  return cy.get('@selectedOptions').then((selectedOptions) => {
    // Sort selectedOptions object by key, so they lay in the same order as Launchpad.
    const sortedSelectedOptions = [];
    Object.keys(selectedOptions).sort().forEach((key) => {
      sortedSelectedOptions.push(selectedOptions[key]);
    });
    return sortedSelectedOptions;
  });
};

const selectEAIDomain = (count) => {
  return domainSelection(count, '#bp-tree-filter-eai-domain');
};

const selectPubDomain = (count, then) => {
  return domainSelection(count, '#bp-tree-filter-publishing-business-domain');
};

describe('Tree Filter Integration with timing only', () => {
  it('API path is matched.', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    const defaultPath = generatePath('/businessProcessTree', {
      'startTime': convertToAPIFormat(past30Minutes),
      'endTime': convertToAPIFormat(currentTime),
    });
    cy.intercept('GET', defaultPath, {
      statusCode: 200,
      body: {},
    }).as('getTree');
    cy.get('#bp-tree-filter-apply-button').click();
    cy.wait('@getTree');
  });
});

describe('Tree Filter Integration with EAI Domain fields', () => {
  it('API Path is fired correctly.', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    selectEAIDomain(2).then((selectedDomain) => {
      const defaultPath = generatePath('/businessProcessTree', {
        'startTime': convertToAPIFormat(past30Minutes),
        'endTime': convertToAPIFormat(currentTime),
        'eaiDomain': selectedDomain.join(','),
      });
      cy.intercept('GET', defaultPath, {
        statusCode: 200,
        body: {},
      }).as('getTree');
      cy.get('#bp-tree-filter-apply-button').click();
      cy.wait('@getTree');
    });
  });
});

describe('Tree Filter Integration with Pub Domain fields', () => {
  it('API Path is fired correctly.', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    selectPubDomain(2).then((selectedDomain) => {
      const defaultPath = generatePath('/businessProcessTree', {
        'startTime': convertToAPIFormat(past30Minutes),
        'endTime': convertToAPIFormat(currentTime),
        'publishingBusinessDomain': selectedDomain.join(','),
      });
      cy.intercept('GET', defaultPath, {
        statusCode: 200,
        body: {},
      }).as('getTree');
      cy.get('#bp-tree-filter-apply-button').click();
      cy.wait('@getTree');
    });
  });
});

describe('Tree Filter Integration with all filter fields', () => {
  it('API Path is fired correctly.', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    selectEAIDomain(8).then((selectedEAIDomain) => {
      selectPubDomain(8).then((selectedPubDomain) => {
        const defaultPath = generatePath('/businessProcessTree', {
          'startTime': convertToAPIFormat(past30Minutes),
          'endTime': convertToAPIFormat(currentTime),
          'eaiDomain': selectedEAIDomain.join(','),
          'publishingBusinessDomain': selectedPubDomain.join(','),
        });
        cy.intercept('GET', defaultPath, {
          statusCode: 200,
          body: {},
        }).as('getTree');
        cy.get('#bp-tree-filter-apply-button').click();
        cy.wait('@getTree');
      });
    });
  });
});
