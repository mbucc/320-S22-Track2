// input test - testing checkboxes (individual, check all)

describe('gives input to checkboxes', ()=>{
  before(() =>{
    cy.visit('http://localhost:3000/log-event/LogEvent');
  });

  it('gives input to severity checkboxes', ()=>{
    // check and uncheck a checkbox, asserting it is checked and unchecked correctly
    // error checkbox
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-error']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-error']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // warning checkbox
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-warning']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-warning']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // success checkbox
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-success']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-success']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // info checkbox
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-info']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-severity']`)
        .find(`[data-testid='checkbox-severity-info']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);

    cy.get(`[data-testid='checkbox-severity-checkAllButton']`).click();
    cy.get(`[data-testid='checkbox-severity']`).find(`[data-testid='CheckBoxIcon']`).first();
    cy.get(`[data-testid='checkbox-severity-checkAllButton']`).click();
    cy.get(`[data-testid='checkbox-severity']`).find(`[data-testid='CheckBoxOutlineBlankIcon']`).first();
  });

  it('gives input to priority checkboxes', ()=>{
    // check and uncheck a checkbox, asserting it is checked and unchecked correctly
    // high checkbox
    cy.get(`[data-testid='checkbox-priority']`)
        .find(`[data-testid='checkbox-priority-high']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-priority']`)
        .find(`[data-testid='checkbox-priority-high']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // medium checkbox
    cy.get(`[data-testid='checkbox-priority']`)
        .find(`[data-testid='checkbox-priority-medium']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-priority']`)
        .find(`[data-testid='checkbox-priority-medium']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // low checkbox
    cy.get(`[data-testid='checkbox-priority']`)
        .find(`[data-testid='checkbox-priority-low']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-priority']`)
        .find(`[data-testid='checkbox-priority-low']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);

    cy.get(`[data-testid='checkbox-priority-checkAllButton']`).click();
    cy.get(`[data-testid='checkbox-priority']`).find(`[data-testid='CheckBoxIcon']`).first();
    cy.get(`[data-testid='checkbox-priority-checkAllButton']`).click();
    cy.get(`[data-testid='checkbox-priority']`).find(`[data-testid='CheckBoxOutlineBlankIcon']`).first();
  });

  it('gives input to category checkboxes', ()=>{
    // check and uncheck a checkbox, asserting it is checked and unchecked correctly
    // stop checkbox
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-stop']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-stop']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // status checkbox
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-status']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-status']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // start checkbox
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-start']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-start']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // security checkbox
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-security']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-security']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);
    // heartbeat checkbox
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-heartbeat']`)
        .click()
        .find(`[data-testid='CheckBoxIcon']`);
    cy.get(`[data-testid='checkbox-category']`)
        .find(`[data-testid='checkbox-category-heartbeat']`)
        .click()
        .find(`[data-testid='CheckBoxOutlineBlankIcon']`);

    cy.get(`[data-testid='checkbox-category-checkAllButton']`).click();
    cy.get(`[data-testid='checkbox-category']`).find(`[data-testid='CheckBoxIcon']`).first();
    cy.get(`[data-testid='checkbox-category-checkAllButton']`).click();
    cy.get(`[data-testid='checkbox-category']`).find(`[data-testid='CheckBoxOutlineBlankIcon']`).first();
  });
});
