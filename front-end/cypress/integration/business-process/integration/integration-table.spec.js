import {goThroughLogin} from "../../../support/business-process/utility/general";

before(() => {
  cy.visit('/business-process');
  goThroughLogin();
});
