describe('testing functionality of login and log detail', ()=>{
  before(()=>{
    cy.visit('http://localhost:3000/');
  });

  it('visits main page', ()=>{
    cy.visit('http://localhost:3000/LogEvent');


    cy.get(':nth-child(1) > .MuiInput-root > #standard-basic').type('anything');
    cy.get(':nth-child(2) > .MuiInput-root > #standard-basic').type('anything');
    cy.get('.form > :nth-child(3)').click();
  });
});

// it(){

// };

/*
    describe('login works successfully', ()=>{
        before(()=>{
            cy.visit('http://localhost:3000/');
          });

        it('visits login', ()=>{
            cy.get(`[data-testid='log-in']`)
              .find(`[data-testid='log-in-error']`)
              .click()
        });
    });*/


// );
