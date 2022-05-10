import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {generatePath} from '../../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';
import {selectEAIDomain, selectPubDomain} from '../../../support/business-process/input/domain-selection';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';

beforeEach(() => {
  cy.visit('/business-process');
  goThroughLogin();
});

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
