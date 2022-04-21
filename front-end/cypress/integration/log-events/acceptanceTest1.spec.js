describe('testing functionality of login and log detail', ()=>{
    before(()=>{
        cy.visit('http://localhost:3000/');
      });

    it('visits main page', ()=>{
        cy.visit('http://localhost:3000/');
        cy.get('[role=option]:contains("Log Events")').click();
    });

    });

    //it(){

    //};



//);