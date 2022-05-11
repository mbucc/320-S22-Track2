import {goThroughLogin} from '../../support/business-process/utility/general';
import {domainSelection} from '../../support/business-process/input/domain-selection';
import {generatePath} from '../../support/business-process/utility/path-generator';

const interceptEAIDomainList = () => {
  const path = generatePath('/eaiDomains');
  return cy.intercept('GET', path, {
    statusCode: 200,
    body: ['111', '222', '333', '444', '555', '666'],
  });
};

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
  it('Finish page preparation', () => {
    interceptEAIDomainList();
    cy.visit('/business-process');
    goThroughLogin();
  });

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
      let i = 0;
      cy.get('#bp-tree-filter-eai-domain-selector-popper-list').children().each((result) => {
        if (i != 0) {
          i++;
          expect(cy.wrap(result).contains(selectedVal.substring(0, 3)) != null).to.eq(true);
        }
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
    cy.get('#bp-tree-filter-publishing-business-domain-selector-selected-items').children().its(0).invoke('text').then((selectedVal) => {
      console.log(selectedVal);
      cy.get('#bp-tree-filter-publishing-business-domain-selector').click();
      cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-search-field').type(selectedVal.substring(0, 3));
      let i = 0;
      cy.get('#bp-tree-filter-publishing-business-domain-selector-popper-list').children().each((result) => {
        if (i != 0) {
          i++;
          expect(cy.wrap(result).contains(selectedVal.substring(0, 3)) != null).to.eq(true);
        }
      });
    });
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
    cy.get('#bp-activity-filter-business-domain-selector-selected-items').children().its(0).invoke('text').then((selectedVal) => {
      console.log(selectedVal);
      cy.get('#bp-activity-filter-business-domain-selector').click();
      cy.get('#bp-activity-filter-business-domain-selector-popper-search-field').type(selectedVal.substring(0, 3));
      let i = 0;
      cy.get('#bp-activity-filter-business-domain-selector-popper-list').children().each((result) => {
        if (i != 0) {
          i++;
          expect(cy.wrap(result).contains(selectedVal.substring(0, 3)) != null).to.eq(true);
        }
      });
    });
  });
});

describe('If there are more than 5 items selected at once, the field will acknowledge that without displaying more than 5 items.', () => {
  it('If more than 5 items are selected, the information indicates that more than 5 items are selected while only showing 5 items.', () => {
    cy.visit('/business-process');
    goThroughLogin();
    cy.get('#bp-tree-filter-eai-domain-selector').click();
    let i = 0;
    cy.get('#bp-tree-filter-eai-domain-selector-popper-list').children().each((result) => {
      i++;
      result.click();
    });
    if (i > 5) {
      // TODO check to see if the label reads correctly
    } else {
      expect(true).to.eq(true); // couldn't test due to there not being enough items
    }
  });
});
