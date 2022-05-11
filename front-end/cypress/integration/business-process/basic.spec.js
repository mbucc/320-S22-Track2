// This test is checking if the business process page can be visited successfully.
import {goThroughLogin} from '../../support/business-process/utility/general';

describe('Visit the page.', () => {
  it('Finish page preparation', () => {
    cy.visit('/business-process');
    goThroughLogin();
  });
  it('Successfully load the business process page.', () => {
    cy.get('#bp-root').should('be.visible');
  });
});
