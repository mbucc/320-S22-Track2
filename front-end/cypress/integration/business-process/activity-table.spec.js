// TODO: Write tests for activity table.

describe("Activity Table Behavior", () => {
    beforeEach(() => {
        cy.visit("/business-process");
    });    
    //checks if clicking component in tree corresponds to the activity showing up in the activity table

    /*
    it("Populating activity table by clicking the tree", () => { 
        cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get(':nth-child(1) > .tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').should('exist');

    });
    */
    /*
    
    it("Sort activities in ascending order (severities should be first)", () => {
        cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click(); 

        cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

        cy.get(':nth-child(1) > .tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').contains('#text', 'Error');

        



    });
    */

    
    

    it('severity', () => {
        
        cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click(); 

        cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

        const correctSeverityAccending = ['Error', 'Warning', 'Info', 'Success']
        const correctSeverityDecending = ['Success', 'Info', 'Warning', 'Warning']

        cy.get('.tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').should(($e) => {
            const currentSeverityAccending = $e.toArray().map(el => el.innerText)
            const arr = correctSeverityAccending.slice(correctSeverityAccending.length-currentSeverityAccending.length)
            expect(currentSeverityAccending).to.deep.eq(arr)
        });

        cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

        cy.get('.tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').should(($e) => {
            const currentSeverityDecending = $e.toArray().map(el => el.innerText)
            const arr = correctSeverityDecending.slice(correctSeverityDecending.length-currentSeverityDecending.length)
            expect(currentSeverityDecending).to.deep.eq(arr)
        });
         
    });
    

    
    var originalData = [[],[],[],[],[]]
    var sortedAccending = [[],[],[],[],[]]
    var sortedDecending = [[],[],[],[],[]]
    it('copies', () => {
        
        cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click(); 

        cy.get('.tr').each(($e, index) => {
            if(index != 0){
                cy.wrap($e).within(() => {
                    cy.get('.td').each(($e2, index2) => {
                        var text = $e2.text()
                        originalData[index-1].push(text)
                    })
                })
            }
        })

        cy.get('[style="display: inline-block; box-sizing: border-box; width: 265px; position: relative;"] > .table-header-sorter').click()

        cy.get('.tr').each(($e, index) => {
            if(index != 0){
                cy.wrap($e).within(() => {
                    cy.get('.td').each(($e2, index2) => {
                        var text = $e2.text()
                        var arr = originalData[index-1].slice().sort((a, b) => b.date - a.date)
                        expect(arr[index2]).to.equal(text)
                        
                        sortedAccending[index-1].push(text)
                    })
                })
            }
        })

        cy.get('[style="display: inline-block; box-sizing: border-box; width: 265px; position: relative;"] > .table-header-sorter').click()

        cy.get('.tr').each(($e, index) => {
            if(index != 0){
                cy.wrap($e).within(() => {
                    cy.get('.td').each(($e2, index2) => {
                        var text = $e2.text()
                        sortedDecending[index-1].push(text)
                    })
                })
            }
        })
         
    });

    


      

});

 