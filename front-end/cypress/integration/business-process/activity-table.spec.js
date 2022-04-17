// TODO: Write tests for activity table.

describe("Activity Table Behavior", () => {
    beforeEach(() => {
        cy.visit("/business-process");
    });    
    //checks if clicking component in tree corresponds to the activity showing up in the activity table
    it("Populating activity table by clicking the tree", () => { 
        cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get(':nth-child(1) > .tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').should('exist');

    });
    
    it("Sort activities in ascending order (severities should be first)", () => {
        cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click(); 

        cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

        cy.get(':nth-child(1) > .tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').contains('#text', 'Error');

        



    });

});
