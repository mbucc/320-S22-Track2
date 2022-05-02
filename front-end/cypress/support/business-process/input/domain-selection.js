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
export const domainSelection = (count, id) => {
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
