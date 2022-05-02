// This is an example test file that shows how to use the Cypress API for some basic selections.

// Before the test suite starts, we need to navigate to the page we want to test.
before(() => {
  cy.visit('/business-process');
});

// Cypress Test Example: Check if the date picker component is working properly.
describe.skip('DatePicker component is working properly.', () => { //IMPORTANT: THE SKIP STOPS THIS FROM RUNNING
  // To test if it is working properly, we need to test it from multiple aspects (except the shortcut commands stuff).
  // 1. Check if the date picker component is loaded successfully.
  // 2. Check if the floating date selection box appears after being clicked.
  // 3. Check if the date selection box is closed after clicking outside.

  // First, let us check if the date picker component is loaded successfully.
  it('DatePicker is loaded.', () => {
    // There will be a few things to consider:
    // 1. The outside div of the date picker component.
    // 2. The inside input field of the date picker component.
    // 3. We do not consider the floating date selection box because it does NOT exist before being clicked. We will not be able to select it before floating date selection box appears.

    // Now, select the outside div of the date picker component.
    // Because we can extract the id of this div box, we can simply select it by its id.
    // The id of the date picker component (the one being loaded into the page) is "bp-tree-filter-start-date-picker", so we use "#bp-tree-filter-start-date-picker" selector to select it.
    // There are a lot of ways to select an HTML element. For more information, please refer to the Cypress API documentation.
    cy.get('#bp-tree-filter-start-date-picker').should('exist');

    // We also know that the input field of this date picker component should be loaded onto the page and its id is "bp-tree-filter-start-date-picker-field". So, we check it, too. They should all exist.
    cy.get('#bp-tree-filter-start-date-picker-field').should('exist');

    // It looks good!
    // We can also check if the default value of the input field is correct, which should be empty by default (even though there is a placeholder, it is not the real content).
    cy.get('#bp-tree-filter-start-date-picker-field').should('have.value', '');
  });

  // Now, let us check if the date selection box appears after being clicked.
  it('DatePicker Popper appears correctly.', () => {
    // We are going to check if the floating selection box only appears after clicking the input field. So before that, we need to make sure the floating selection box (popper) does NOT exist by default.
    // We can use the "should" command with "not.exist" to check if the element does NOT exist.
    cy.get('#bp-tree-filter-start-date-picker-popper').should('not.exist');

    // Now, we can click the outside box to show the floating selection box.
    // We can use the "click" command to simulate a click event.
    cy.get('#bp-tree-filter-start-date-picker').click();

    // Now, we can check if the floating selection box appears.
    // We can use the "should" command with "exist" to check if the element exists.
    cy.get('#bp-tree-filter-start-date-picker-popper').should('exist');

    // Great! It appears!
  });

  // Next, let us check if the date selection box is closed after clicking outside.
  it('DatePicker Popper closes when user clicks outside.', () => {
    // We can use the "click" command to simulate a click event.
    // To click outside the date picker component, we can click the coordinate (0, 0) of the body.
    // The coordinate (0, 0) is the top left corner of the body.
    cy.get('body').click(0, 0);

    // Now, we can check if the floating selection box disappears.
    // We can use the "should" command with "not.exist" to check if the element does NOT exist.
    cy.get('#bp-tree-filter-start-date-picker-popper').should('not.exist');
  });

  // Now, all tests are done! Congrats!
  // You now know how to test the date picker component in a very basic aspect.
  // We will have a lot more to test, e.g. the shortcut commands, the date range selection, etc.
  // But for an example, this is enough.
});
