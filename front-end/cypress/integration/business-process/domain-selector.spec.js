import {isValidTimeFormat} from '../../../utils/business-process/date-options';
import {goThroughLogin} from '../../support/business-process/utility/general';
import {domainSelection} from '../../support/business-process/input/domain-selection';

// TODO: Write tests for domain selectors.
before(() => {
  cy.visit('/business-process');
  goThroughLogin();
});

const selectEAIDomain = (count) => {
    return domainSelection(count, '#bp-tree-filter-eai-domain');
};

const selectPubDomain = (count, then) => {
    return domainSelection(count, '#bp-tree-filter-publishing-business-domain');
};

const selectActivitiesPubDomain = (count, then) => {
    return domainSelection(count, '#bp-activity-filter-business-domain');
};

describe('EAI domain field is working properly.', () => {
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
    selectEAIDomain(1).then((firstVal) => {
        cy.get('#bp-tree-filter-eai-domain-selector-selected-items').children().its(0).invoke('text').should((selectedVal) => {
            expect(firstVal[0]).to.eq(selectedVal);
        });
    });
  });

  it('If something is typed into the search bar, all entries will contain the searched keyword.', () => {

      cy.get('#bp-tree-filter-eai-domain-selector-selected-items').children().its(0).invoke('text').then((selectedVal) => {
          console.log(selectedVal);
          cy.get('#bp-tree-filter-eai-domain-selector').click();
          cy.get('#bp-tree-filter-eai-domain-selector-popper-search-field').type(selectedVal.substring(0, 3));
          cy.get('#bp-tree-filter-eai-domain-selector-popper-list').children().each(result => {
              expect(cy.wrap(result).contains(selectedVal.substring(0, 3)) != null).to.eq(true); //still WIP
     });

    
    });
  });
});

describe('Publishing Business domain field is working properly.', () => {
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

  it('Selecting an entry in the list displays it in the field.', () => {
    selectPubDomain(1).then((firstVal) => {
        cy.get('#bp-tree-filter-publishing-business-domain-selector-selected-items').children().its(0).invoke('text').should((selectedVal) => {
            expect(firstVal[0]).to.eq(selectedVal);
        });
    });
  });

  it('If something is typed into the search bar, all entries will contain the searched keyword.', () => {

  });
});

  describe('Activities Filter\'s Business Domain field is working properly.', () => {
    it('Click at (0, 0) to reset pop-ups', () => {
      cy.get('body').click(0, 0);
    });
  
    it('Business domain field is loaded', () => {
      cy.get('#bp-activity-filter-business-domain-selector').should('exist');
      cy.get('#bp-activity-filter-business-domain-selector-popper-list').should('not.exist');
    });
  
    it('The dropdown menu appears when the EAI domain field is clicked, and disappears if a click occurs elsewhere.', () => {
      cy.get('#bp-activity-filter-business-domain-selector').click();
      cy.get('#bp-activity-filter-business-domain-selector-popper-list').should('exist');
      cy.get('body').click(0, 0);
      cy.get('#bp-activity-filter-business-domain-selector-popper-list').should('not.exist');
    });
  
    it('Selecting an entry in the list displays it in the field.', () => {
      selectActivitiesPubDomain(1).then((firstVal) => {
          cy.get('#bp-activity-filter-business-domain-selector-selected-items').children().its(0).invoke('text').should((selectedVal) => {
              expect(firstVal[0]).to.eq(selectedVal);
          });
      });
    });
  
    it('If something is typed into the search bar, all entries will contain the searched keyword.', () => {
  
    });
});
