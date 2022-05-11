import {goThroughLogin} from '../../support/business-process/utility/general';
import {severityOptions} from '../../../utils/business-process/severity';

before(() => {
  cy.visit('/business-process');
  goThroughLogin();
});

const clickSeverity = (option) => {
  cy.get(`#bp-activity-filter-severity-selector-option-${option}`).click();
};

const clickCheckAllButton = () => {
  cy.get('#bp-activity-filter-severity-checkall-button').click();
};

describe('Severity checkboxes and check/uncheck all buttons are working properly', () => {
  it('Checkboxes can be unchecked and checked.', () => {
    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('exist');
      clickSeverity(option);
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('not.exist');
    });

    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('not.exist');
      clickSeverity(option);
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('exist');
    });
  });

  it('\"Check All\"/\"Uncheck All\" button works correctly.', () => {
    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('exist');
    });

    clickCheckAllButton();

    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('not.exist');
    });

    clickCheckAllButton();

    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('exist');
    });

    clickCheckAllButton();
    clickSeverity(severityOptions[0]);
    clickCheckAllButton();

    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('exist');
    });

    cy.wrap(Array.from(severityOptions)).each((option) => {
      clickSeverity(option);
    });

    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('not.exist');
    });

    cy.wrap(Array.from(severityOptions)).each((option) => {
      clickSeverity(option);
    });

    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('exist');
    });

    clickCheckAllButton();
    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('not.exist');
    });
  });

  it('Error state activates when there is no severity checked.', () => {
    cy.wrap(Array.from(severityOptions)).each((option) => {
      cy.get(`#bp-activity-filter-severity-selector-option-${option} > div > .icon`).should('not.exist');
    });

    cy.get('[style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; width: 100%; padding-top: 4px; color: rgb(220, 38, 38);"]').should('exist');
    clickSeverity(severityOptions[0]);
    cy.get('[style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; width: 100%; padding-top: 4px; color: rgb(220, 38, 38);"]').should('not.exist');
    clickCheckAllButton();
    cy.get('[style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; width: 100%; padding-top: 4px; color: rgb(220, 38, 38);"]').should('not.exist');
    clickCheckAllButton();
    cy.get('[style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; width: 100%; padding-top: 4px; color: rgb(220, 38, 38);"]').should('exist');
  });
});
