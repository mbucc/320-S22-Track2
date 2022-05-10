export const clickTreeApplyButton = () => {
  return cy.get('#bp-tree-filter-apply-button').click();
};

export const clickTableApplyButton = () => {
  return cy.get('#bp-activity-filter-apply-button').click();
};
