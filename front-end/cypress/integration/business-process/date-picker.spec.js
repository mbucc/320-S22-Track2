/* eslint-disable camelcase */
import {dateOptions} from '../../../utils/business-process/date-options';
import {goThroughLogin} from '../../support/business-process/utility/general';

describe('Magic commands is working properly with shortcut commands.', () => {
  it('Finish page preparation', () => {
    cy.visit('/business-process');
    goThroughLogin();
  });
  it('Support rough date format.', () => {
    const rough1 = '12/20/2021 9am';
    const rough2 = '12/20/2021 9:00';
    const rough3 = '12/20/2021 9 AM';
    const correct = '12/20/2021, 9:00:00 AM';

    cy.get('#bp-tree-filter-start-date-picker-field').should('have.value', '');
    cy.get('#bp-tree-filter-start-date-picker-field').type(rough1).type('{enter}').should('have.value', correct).clear();
    cy.get('#bp-tree-filter-start-date-picker-field').type(rough2).type('{enter}').should('have.value', correct).clear();
    cy.get('#bp-tree-filter-start-date-picker-field').type(rough3).type('{enter}').should('have.value', correct).clear();
  });
  it('Support date modifiers.', () => {
    cy.clock(new Date().getTime(), ['Date']);
    let baseTime = new Date();
    // Test h(hour)
    baseTime.setHours(parseInt(baseTime.getHours()) - 1);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1h').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
    // Test m(minute)
    baseTime = new Date();
    baseTime.setMinutes(parseInt(baseTime.getMinutes()) - 1);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1m').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
    // Test d(day)
    baseTime = new Date();
    baseTime.setDate(parseInt(baseTime.getDate()) - 1);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1d').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
    // Test mo(month)
    baseTime = new Date();
    baseTime.setMonth(parseInt(baseTime.getMonth()) - 1);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1mo').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
    // Test y(year)
    baseTime = new Date();
    baseTime.setFullYear(parseInt(baseTime.getFullYear()) - 1);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1y').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();

    baseTime = new Date();
    baseTime.setMonth(parseInt(baseTime.getMonth()) - 1);
    baseTime.setDate(parseInt(baseTime.getDate()) + 1);
    baseTime.setHours(9);
    baseTime.setMinutes(0);
    baseTime.setSeconds(0);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1mo +1d 9am').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
  });

  it('Magic commands should only work when Enter is pressed', () => {
    cy.clock(new Date().getTime(), ['Date']);
    const baseTime = new Date();
    cy.get('#bp-tree-filter-start-date-picker-field').type(baseTime.toLocaleString('en-US', dateOptions)).type('{enter}').clear();

    const newMonth = parseInt(baseTime.getMonth()) - 1;
    baseTime.setMonth(newMonth);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1mo').should('have.value', '-1mo');
    cy.get('#bp-tree-filter-start-date-picker-field').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions));
  });

  it('Help documentation button works properly.', () => {
    cy.get(':nth-child(1) > .helper-modal-content-children').should('not.exist');
    cy.get('svg.icon.icon-tabler.icon-tabler-help').eq(0).click();
    cy.get(':nth-child(1) > .helper-modal-content-children').should('exist');
    cy.get('.helper-modal-close-btn').click();
    cy.get(':nth-child(1) > .helper-modal-content-children').should('not.exist');
  });
});

describe('Date format is parsed correctly', () => {
  it('Support seconds input correctly.', () => {
    const baseTime = new Date();
    cy.get('#bp-tree-filter-start-date-picker-field').clear();
    baseTime.setHours(10);
    baseTime.setMinutes(0);
    baseTime.setSeconds(0);

    cy.get('#bp-tree-filter-start-date-picker-field').type('10 AM').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();

    const noSeconds = '12/20/2021 9:10am';
    const correct = '12/20/2021, 9:10:00 AM';
    cy.get('#bp-tree-filter-start-date-picker-field').clear().type(noSeconds).type('{enter}').should('have.value', correct);

    const withSeconds = '12/20/2021 9:10:05am';
    cy.get('#bp-tree-filter-start-date-picker-field').clear().type(withSeconds).type('{enter}').should('have.value', '12/20/2021, 9:10:05 AM');
  });
  it('Start date field parses the command based on current time.', () => {
    cy.clock(new Date().getTime(), ['Date']);
    cy.get('#bp-tree-filter-start-date-picker-field').clear();
    cy.get('#bp-tree-filter-start-date-picker-field').should('have.value', '');
    const baseTime = new Date();
    const newMonth = parseInt(baseTime.getMonth()) - 1;
    baseTime.setMonth(newMonth);
    cy.get('#bp-tree-filter-start-date-picker-field').type('-1mo').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
  });

  it('End date field parses the command based on the start date.', () => {
    cy.get('#bp-tree-filter-start-date-picker-field').type('12/20/2021, 9:00 AM').type('{enter}');
    cy.get('#bp-tree-filter-end-date-picker-field').should('have.value', '');
    cy.get('#bp-tree-filter-end-date-picker-field').type('-1mo').type('{enter}').should('have.value', '11/20/2021, 9:00:00 AM');
  });
  it('Support date format parsing and separated time format parsing.', () => {
    const baseTime = new Date();
    baseTime.setHours(9);
    baseTime.setMinutes(0);
    baseTime.setSeconds(0);
    cy.get('#bp-tree-filter-start-date-picker-field').clear().type('9:00 AM').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
  });
  it('Support the date format that only has month and day.', () => {
    cy.clock(new Date().getTime(), ['Date']);
    const baseTime = new Date();
    baseTime.setMonth(9);
    baseTime.setDate(28);
    cy.get('#bp-tree-filter-start-date-picker-field').clear().type('10/28').type('{enter}').should('have.value', baseTime.toLocaleString('en-US', dateOptions)).clear();
  });
});

describe('Other tests in DatePicker component', () => {
  it('Popper should be dismissed when we click outside.', () => {
    cy.get('body').click(0, 0);
    cy.get('#bp-tree-filter-start-date-picker-popper').should('not.exist');
  });
  it('Date should be changed per actions of the popper .', () => {
    const baseTime = new Date();
    const second = baseTime.getSeconds();
    cy.clock(baseTime.getTime(), ['Date']);
    cy.visit('/business-process');
    goThroughLogin();
    cy.get('#bp-tree-filter-start-date-picker > .MuiInputBase-root').click();
    cy.get('#bp-tree-filter-start-date-picker-field').clear().type('10/28').type('{enter}').clear();
    const test_date = new Date(2021, 9, 20, 15, 15, second);
    cy.get('#bp-tree-filter-start-date-picker-field').clear().click();
    cy.get('#bp-tree-filter-start-date-picker-popper').should('exist');
    cy.get('[data-testid="ArrowDropDownIcon"]').click();
    cy.get(':nth-child(122) > .PrivatePickersYear-yearButton').click();
    cy.get(':nth-child(4) > :nth-child(4) > .MuiButtonBase-root').click();
    cy.get('.MuiTypography-root').eq(1).click();
    cy.get('.css-1umqo6f').click(220, 110, {force: true}).click(220, 110, {force: true});
    cy.get('#bp-tree-filter-start-date-picker-field').should('have.value', test_date.toLocaleDateString('en-US', dateOptions));
  });

  it('Support DLS correctly.', () => {
    cy.get('#bp-tree-filter-start-date-picker-field').clear();
    cy.get('#bp-tree-filter-start-date-picker-field').type('11/07/2021 1am').type('{enter}');
    cy.wait(500);
    cy.get('#bp-date-picker-conflict-option-earlier').should('exist');
    cy.get('#bp-date-picker-conflict-option-later').should('exist');
    cy.get('#bp-date-picker-conflict-option-later').click({force: true});
  });

  it('Support DLS correctly. 2', () => {
    cy.get('#bp-tree-filter-end-date-picker-field').clear().type('11/07/2021 1am').type('{enter}');
    cy.get('#bp-tree-filter-apply-button').click();
    cy.get('.icon-tabler-alert-circle').should('exist');
  });

  it('Support DLS forward correctly.', () => {
    cy.get('#bp-tree-filter-end-date-picker-field').clear();
    cy.get('#bp-tree-filter-end-date-picker-field').type('3/14/2021 2:30 AM').type('{enter}').should('have.value', '3/14/2021, 3:30:00 AM');
  });
});
