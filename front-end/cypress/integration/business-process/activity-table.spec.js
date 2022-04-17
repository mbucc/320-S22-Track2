// TODO: Write tests for activity table.

describe("Activity Table should be able to be populated by clicking tree components", () => {
    beforeEach(() => {
        cy.visit("/business-process");
    });    
    it("Populating activity table by clicking the tree", () => {
        cy.get('#mui-1-EAI\ Domain\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').should('exist');

        cy.get('#mui-1-Publishing\ Business\ Domain\ 1\ from\ EAI\ 1 > .Mui-expanded > .MuiTreeItem-label').click();

        cy.get('#mui-1-Business\ Process\ 1001 > .Mui-expanded > .MuiTreeItem-label').click();

        cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

        cy.get(':nth-child(1) > .tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').should('exist');

    });
    
    it("Severity filter test: able to click on it", () => {
        cy.get("#table-sorter").should("be.visible");


    });

});
