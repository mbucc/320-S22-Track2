export const inputStartDate = (content) => {
  cy.get('#bp-tree-filter-start-date-picker-field').clear();
  cy.get('#bp-tree-filter-start-date-picker-field').type(content).type('{enter}');
};

export const inputEndDate = (content) => {
  cy.get('#bp-tree-filter-end-date-picker-field').clear();
  cy.get('#bp-tree-filter-end-date-picker-field').type(content).type('{enter}');
};
