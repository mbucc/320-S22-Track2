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
  cy.get(boxSelector).click({force: true});
  return cy.get('@selectedOptions').then((selectedOptions) => {
    // Sort selectedOptions object by key, so they lay in the same order as Launchpad.
    const sortedSelectedOptions = [];
    Object.keys(selectedOptions).sort().forEach((key) => {
      sortedSelectedOptions.push(selectedOptions[key]);
    });
    return sortedSelectedOptions;
  });
};

/**
 * @param {string} id
 * @param {string} domainName
 * @return {Cypress.Chainable<string[]>}
 */
export const selectSpecificDomain = (id, domainName) => {
  const boxSelector = `${id}-selector`;
  const listSelector = `${id}-selector-popper-list`;
  cy.get(boxSelector).click();
  cy.then(() => false).as('isSpecificDomainSelected');
  cy.get(listSelector)
      .children().each((index, element) => {
        cy.wrap(element).get(' & > span').invoke('text').then((text) => {
          if (text === domainName) {
            cy.wrap(element).click();
            cy.then(() => true).as('isSpecificDomainSelected');
          }
        });
      });
  cy.get(boxSelector).click({force: true});
  return cy.get('@isSpecificDomainSelected');
};

export const selectEAIDomain = (count) => {
  return domainSelection(count, '#bp-tree-filter-eai-domain');
};

export const selectPubDomain = (count) => {
  return domainSelection(count, '#bp-tree-filter-publishing-business-domain');
};

export const selectBusinessDomain = (count) => {
  return domainSelection(count, '#bp-activity-filter-business-domain');
};

// Use this function to select a specific EAI domain.
export const selectSpecificEAIDomain = (domainName) => {
  return selectSpecificDomain('#bp-tree-filter-eai-domain', domainName);
};

// Use this function to select a specific publishing business domain.
export const selectSpecificPubDomain = (domainName) => {
  return selectSpecificDomain('#bp-tree-filter-publishing-business-domain', domainName);
};

// Use this function to select a specific business domain (in activity filter).
export const selectSpecificBusinessDomain = (domainName) => {
  return selectSpecificDomain('#bp-activity-table-business-domain', domainName);
};
