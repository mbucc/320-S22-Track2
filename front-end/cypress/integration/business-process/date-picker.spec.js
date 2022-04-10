before(() => {
  cy.visit('/business-process');
});

describe('Magic commands is working properly with shortcut commands.', () => {
  it('Support rough date format.', () => {});
  it('Support single date modifiers.', () => {});
  it('Support multiple date modifiers.', () => {});
  it('Magic commands should only work when Enter is pressed', () => {
    cy.get('#bp-tree-filter-start-date-picker-field').type('+1h');
    cy.get('#bp-tree-filter-start-date-picker-field').type('{enter}');
  });
  it('Help documentation button works properly.', () => {});
});

describe('Date format is parsed correctly', () => {
  it('Start date field parses the command based on current time.', () => {});
  it('End date field parses the command based on the start date.', () => {});
  it('Support date format parsing and separated time format parsing.', () => {});
  it('Support the date format that only has month and day.', () => {});
});

describe('Other tests in DatePicker component', () => {
  it('Popper should be dismissed when we click outside.', () => {
    cy.get('body').click(0, 0);
    cy.get('#bp-tree-filter-start-date-picker-popper').should('not.exist');
  });
  it('Date should be changed per actions of the popper .', () => {});
});
