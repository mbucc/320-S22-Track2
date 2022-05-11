import {goThroughLogin} from '../../../support/business-process/utility/general';
import moment from 'moment';
import {selectEAIDomain, selectPubDomain} from '../../../support/business-process/input/domain-selection';
import {inputEndDate, inputStartDate} from '../../../support/business-process/input/date-picker';
import {interceptTreeAPI} from '../../../support/business-process/utility/intercept';

const prepare = () => {
  it('Finish page preparation', () => {
    cy.visit('/business-process');
    goThroughLogin();
  });
};

const testDatePickerIntegration = (startDate, endDate) => {
  // Lock the current time (so the generated API time will be the same with the test time).
  cy.clock(endDate.toDate().getTime());
  inputStartDate(startDate.format('MM/DD/YYYY HH:mm:ss A'));
  inputEndDate(endDate.format('MM/DD/YYYY HH:mm:ss A'));
  interceptTreeAPI({
    startDate: startDate,
    endDate: endDate,
  }).as('getTree');
  cy.get('#bp-tree-filter-apply-button').click();
  cy.wait('@getTree');
};

const testEAIDomain = (testTitle) => {
  prepare();
  it(testTitle, () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss A'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss A'));
    selectEAIDomain(2).then((selectedDomain) => {
      interceptTreeAPI({
        startDate: past30Minutes,
        endDate: currentTime,
        eaiDomains: selectedDomain,
      }).as('getTree');
      cy.get('#bp-tree-filter-apply-button').click();
      cy.wait('@getTree');
    });
  });
};

const testPubDomain = (testTitle) => {
  prepare();
  it(testTitle, () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss A'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss A'));
    selectPubDomain(2).then((selectedDomain) => {
      interceptTreeAPI({
        startDate: past30Minutes,
        endDate: currentTime,
        pubDomains: selectedDomain,
      }).as('getTree');
      cy.get('#bp-tree-filter-apply-button').click();
      cy.wait('@getTree');
    });
  });
};

describe('DatePicker Integration only', () => {
  prepare();
  for (let i = 1; i < 6; ++i) {
    // Randomly generate a number from 1 to 100000.
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    const currentTime = moment().subtract(randomNumber, 'minutes');
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    it(`DatePicker API Path. Random ${i}.`, () => {
      testDatePickerIntegration(past30Minutes, currentTime);
    });
  }
});

describe('Tree Filter Integration with EAI Domain fields', () => {
  testEAIDomain('EAI Domain API Path. Random 1.');
  testEAIDomain('EAI Domain API Path. Random 2.');
  testEAIDomain('EAI Domain API Path. Random 3.');
  testEAIDomain('EAI Domain API Path. Random 4.');
});

describe('Tree Filter Integration with Pub Domain fields', () => {
  testPubDomain('Pub Domain API Path. Random 1.');
  testPubDomain('Pub Domain API Path. Random 2.');
  testPubDomain('Pub Domain API Path. Random 3.');
  testPubDomain('Pub Domain API Path. Random 4.');
});

describe('Tree Filter Integration with all filter fields', () => {
  prepare();
  it('API Path is fired correctly.', () => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment();
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    // Lock the current time (so the generated API time will be the same with the test time).
    cy.clock(currentTime.toDate().getTime());
    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    selectEAIDomain(3).then((selectedEAIDomain) => {
      selectPubDomain(3).then((selectedPubDomain) => {
        interceptTreeAPI({
          startDate: past30Minutes,
          endDate: currentTime,
          eaiDomains: selectedEAIDomain,
          pubDomains: selectedPubDomain,
        }).as('getTree');
        cy.get('#bp-tree-filter-apply-button').click();
        cy.wait('@getTree');
      });
    });
  });
});
