import { isValidTimeFormat } from "../../../utils/business-process/date-options";

// TODO: Write tests for domain selectors.
before(() => {
    cy.visit('/business-process');
  });

  describe('EAI domain is working properly.', () => {
    it('EAI domain field is loaded', () => {
        cy.get('#bp-tree-filter-eai-domain-selector').should('exist');
        cy.get('#bp-tree-filter-eai-domain-selector-popper-list').should('not.exist');
    })

    it('The dropdown menu appears when the EAI domain field is clicked, and disappears if a click occurs elsewhere.', () => {
        cy.get('#bp-tree-filter-eai-domain-selector').click();
        cy.get('#bp-tree-filter-eai-domain-selector-popper-list').should('exist');
        cy.get('body').click(0, 0);
        cy.get('#bp-tree-filter-eai-domain-selector-popper-list').should('not.exist');
    })

    let entry = "";

    it('Selecting an entry in the list displays it in the field.', () => {
        cy.get('#bp-tree-filter-eai-domain-selector').click();
        cy.get('#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(2)').invoke('text').then(firstEntry => {
            cy.get('#bp-tree-filter-eai-domain-selector-popper-list > :nth-child(2)').click();
            cy.get('body').click(0, 0);
            cy.get('#bp-tree-filter-eai-domain-selector').invoke('val').should((selectorVal) => {
                expect(entry).to.eq(selectorVal);
            });
            
        })
        
    })

    it('If something is typed into the search bar, all entries will contain the searched keyword.', () => {

    })
    
  })
