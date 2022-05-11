// This file contains some general pattern that we need to use for testing.

// Go through login.
export const goThroughLogin = () => {
  cy.get('.MuiFormControl-root').first().find('div > input').type('admin');
  cy.get('.MuiFormControl-root').eq(1).find('div > input').type('admin');
  cy.get('.MuiButton-root').first().click();
};
