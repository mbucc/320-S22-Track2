import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {generatePath} from '../../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';

before(() => {
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

const selectEAIDomain = (count, then) => {
  cy.get('#bp-tree-filter-eai-domain-selector').click();
  cy.get('#bp-tree-filter-eai-domain-selector-popper-list')
      .children().its('length').then((length) => {
        const optionsCount = length - 1;
        if (optionsCount > 1) {
          // Generate a random number between 1 and the number of options.
          const randomNumber = Math.floor(Math.random() * optionsCount) + 2;
          cy.get(`#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(${randomNumber})`).click();

          cy.get(`#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(${randomNumber}) > span`).invoke('text').as('selectedDomain');
        }
      });
  cy.get('body').click(0, 0);
  cy.get('@selectedDomain').then((value) => {
    then(value);
  });
};

describe('Tree Filter Integration with timing only', () => {
  it('Successfully load the business process page.', () => {
    cy.get('#bp-root').should('be.visible');

    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    const defaultPath = generatePath('/businessProcessTree', {
      'startTime': convertToAPIFormat(past30Minutes),
      'endTime': convertToAPIFormat(currentTime),
    });

    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());

    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));

    // IMPORTANT: Intercepting the corresponding API request when there is one.
    cy.intercept('GET', defaultPath, {
      statusCode: 200,
      body: {},
    }).as('getTree');

    cy.get('#bp-tree-filter-apply-button').click();

    cy.wait('@getTree');
  });
});

describe('Tree Filter Integration with all filter fields', () => {
  it('Successfully load the business process page.', () => {
    cy.get('#bp-root').should('be.visible');

    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');

    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());

    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    selectEAIDomain(1, (selectedDomain) => {
      const defaultPath = generatePath('/businessProcessTree', {
        'startTime': convertToAPIFormat(past30Minutes),
        'endTime': convertToAPIFormat(currentTime),
        // eslint-disable-next-line no-invalid-this
        'eaiDomain': selectedDomain,
      });

      // IMPORTANT: Intercepting the corresponding API request when there is one.
      cy.intercept('GET', defaultPath, {
        statusCode: 200,
        body: {},
      }).as('getTree');

      cy.get('#bp-tree-filter-apply-button').click();

      cy.wait('@getTree');
    });
  });
});
