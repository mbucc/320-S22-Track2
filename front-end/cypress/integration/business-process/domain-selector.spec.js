import {isValidTimeFormat} from '../../../utils/business-process/date-options';

// TODO: Write tests for domain selectors.
before(() => {
  cy.visit('/business-process');
  cy.get('.MuiButton-root').first().click();
});

describe.skip('EAI domain field is working properly.', () => {
  it('Click at (0, 0) to reset pop-ups', () => {
    cy.get('body').click(0, 0);
  });

  it('EAI domain field is loaded', () => {
    cy.get('#bp-tree-filter-eai-domain-selector').should('exist');
    cy.get('#bp-tree-filter-eai-domain-selector-popper-list').should('not.exist');
  });

  it('The dropdown menu appears when the EAI domain field is clicked, and disappears if a click occurs elsewhere.', () => {
    cy.get('#bp-tree-filter-eai-domain-selector').click();
    cy.get('#bp-tree-filter-eai-domain-selector-popper-list').should('exist');
    cy.get('body').click(0, 0);
    cy.get('#bp-tree-filter-eai-domain-selector-popper-list').should('not.exist');
  });

  const entry = '';

  it('Selecting an entry in the list displays it in the field.', () => {
    cy.get('#bp-tree-filter-eai-domain-selector').click();
    cy.get('#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(2)').invoke('text').then((firstEntry) => {
      cy.get('#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(2)').click();
      cy.get('body').click(0, 0);
      cy.get('#bp-tree-filter-eai-domain-selector-selected-items').children().its(0).invoke('text').should((selectedVal) => {
        expect(firstEntry).to.eq(selectedVal);
      });
    });
  });

  it('If something is typed into the search bar, all entries will contain the searched keyword.', () => {
    cy.get('#bp-tree-filter-eai-domain-selector').click();
    cy.get('#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(2)').invoke('text').then((query) => {
      cy.get('#bp-tree-filter-eai-domain-selector-popper-search-field').type(query.substring(0, 1));
      cy.get('#bp-tree-filter-eai-domain-selector-popper-list').each((val, index, collection) => {
        // check that each result contains the substring
      });
    });
  });
});

describe.skip('Publishing Business domain field is working properly.', () => {
  it('Click at (0, 0) to reset pop-ups', () => {
    cy.get('body').click(0, 0);
  });

  it('Publishing Business domain field is loaded', () => {
    cy.get('#bp-tree-filter-publishing-business-domain-selector').should('exist');
    cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-list').should('not.exist');
  });

  it('The dropdown menu appears when the EAI domain field is clicked, and disappears if a click occurs elsewhere.', () => {
    cy.get('#bp-tree-filter-publishing-business-domain-selector').click();
    cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-list').should('exist');
    cy.get('body').click(0, 0);
    cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-list').should('not.exist');
  });

  const entry = '';

  it('Selecting an entry in the list displays it in the field.', () => {
    cy.get('#bp-tree-filter-publishing-business-domain-selector').click();
    cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-list > :nth-child(2)').invoke('text').then((firstEntry) => {
      cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-list > :nth-child(2)').click();
      cy.get('body').click(0, 0);
      cy.get('#bp-tree-filter-publishing-business-domain-selector-selected-items').children().its(0).invoke('text').should((selectedVal) => {
        expect(firstEntry).to.eq(selectedVal);
      });
    });
  });

  it('If something is typed into the search bar, all entries will contain the searched keyword.', () => {

  });
});
