// input test - testing the date component

describe('input test - date picker', ()=>{
    beforeEach(()=>{
      cy.visit('http://localhost:3000/LogEvent');
    });

    var fromDate = new Date();
    var toDate = new Date();


    it('gives input to dates', ()=>{
        // initialize from date
        cy.get(`[id='from-date']`).type('2022-04-12T21:44');
        // initialize to date
        cy.get(`[id='to-date']`).type('2022-04-13T21:44');

        // var fromDate = new Date();
        // var toDate = new Date();

        cy
        .get(`[id='from-date']`, { timeout: 15000 })
        .invoke('val')
        .then(fromText => {
          fromDate = new Date(fromText);
          //const toDate = new Date(cy.get('[id="to-date"]', { timeout: 15000 }).invoke('val'));
        });  
          //expect(fromDate).to.be.lte(toDate);
        cy
        .get(`[id='to-date']`, { timeout: 15000 })
        .invoke('val')
        .then(toText => {
          toDate = new Date(toText);
          cy.expect(fromDate).to.be.lte(toDate);

      });

      //cy.expect(fromDate).to.be.lte(toDate);

        //cy.get('[role=option]:contains("EAI Domain 1")').click();
        //cy.get(`[data-testid='dropdown-eai']`).contains('EAI Domain 1');
      });

    // it('gives input to to-date', ()=>{
     //   cy.get(`[id='to-date']`).type('2022-04-13T21:44');
    //     cy.get('[role=option]:contains("EAI Domain 1")').click();
    //     cy.get(`[data-testid='dropdown-eai']`).contains('EAI Domain 1');
     //  });
     });