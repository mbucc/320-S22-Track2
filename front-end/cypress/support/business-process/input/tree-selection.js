export const selectTreeItem = (eaiTransactionId) => {
  // Expand all if needed.
  cy.get(`#expand-collapse-all-button`).invoke('text').then((text) => {
    if (text === 'Expand All') {
      cy.get(`#expand-collapse-all-button`).click();
    }
    cy.get(`#mui-1-bp-tree-instance-${eaiTransactionId}`).click();
  });
};
