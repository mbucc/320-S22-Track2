/*
Test one of the components on the page.
Test whether a certain component can be clicked on.


*/
describe('Test for Priority', () => {
    it('checks if priority checkboxes work', () => {
      cy.visit("http://localhost:3000/LogEvent")
      //click menun button in header
      cy.get('[type="checkbox"]').check()
      //should take us back to home page
    })
  })