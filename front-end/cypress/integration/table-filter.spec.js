//testing the table filtering when the user inputs filters

describe('testing table filters', ()=>{

    it('inputs filters', ()=>{
        cy.visit('http://localhost:3000/LogEvent');

        cy.get(`[data-testid='checkbox-severity']`)
            .find(`[data-testid='checkbox-severity-error']`)
            .click()
        
        cy.get(`[data-testid='checkbox-priority']`)
            .find(`[data-testid='checkbox-priority-high']`)
            .click()
        
        cy.get(`[data-testid='checkbox-category']`)
            .find(`[data-testid='checkbox-category-stop']`)
            .click()
            .find(`[data-testid='CheckBoxIcon']`);
        
        cy.get(`[data-testid='dropdown-eai']`).trigger('mousedown', { button: 0 });
        cy.get('[role=option]:contains("EAI Domain 1")').click();
        cy.get(`[data-testid='dropdown-app']`).trigger('mousedown', { button: 0 });
        cy.get('[role=option]:contains("CRM")').click();
        cy.get(`[data-testid='dropdown-ps']`).trigger('mousedown', { button: 0 });
        cy.get('[role=option]:contains("Update Customer")').click();
        cy.get(`[data-testid='dropdown-bsd']`).trigger('mousedown', { button: 0 });
        cy.get('[role=option]:contains("Business SubDomain 1")').click();
        cy.get(`[data-testid='dropdown-bd']`).trigger('mousedown', { button: 0 });
        cy.get('[role=option]:contains("Business Domain 1")').click();
    })

    it('presses apply button', ()=>{
        cy.get('button[type=submit]').click()
    })

    it('checks table to see if the filters match the data', ()=>{
        cy.get('tbody>tr').each(($el, index, $list)=>{
            cy.wrap($el).contains('Error')
            cy.wrap($el).contains('High')
            cy.wrap($el).contains('Stop')
            cy.wrap($el).contains('EAI Domain 1')
            cy.wrap($el).contains('CRM')
            cy.wrap($el).contains('Update Customer')
            cy.wrap($el).contains('Business SubDomain 1')
            cy.wrap($el).contains('Business Domain 1')
        })
    })


})
