import moment from 'moment';

before(()=>{
  cy.visit('/LogEvent');

  cy.get('.form > :nth-child(1)')
      .type('test');
  cy.get('.form > :nth-child(2)')
      .type('test');
  cy.get('.form > :nth-child(3)')
      .click();

  cy.get(`[id='logevent-datepicker-fromdate-field']`).type('05/01/2022 9:00 AM')
      .type('{enter}');
  cy.get(`[id='logevent-datepicker-todate-field']`).type('05/01/2022 9:10 AM')
      .type('{enter}');
});

describe('log detail', ()=>{
  it('clicks apply', ()=>{
    // make sure log detail displays correct creation date
    cy.get(`[data-testid='logevent-button-apply']`)
        .click();
    cy.wait(5000); // let the query run
  });
  // SKIPPING TEST - TABLE POPULATES IN CYPRESS TESTING WINDOW, BUT NOT IN JENKINS
  it.skip('clicks "detail" button, checks log detail output', ()=>{
    cy.get('[data-testid="logevent-table-row"]')
        .first()
        .find('[data-testid="logevent-table-cell-date"]')
        .invoke('text')
        .then(($date)=>{
          // find detail button and click it to open new window.
          cy.get('[data-testid="logevent-table-cell-detail"]')
              .first()
              .click();
          // find detail button and follow its link in this test window.
          cy.get('[data-testid="logevent-table-cell-detail"]')
              .first()
              .find('a')
              .then(($a)=>{
                const url = $a[0].getAttribute('href');
                cy.visit(url);
                cy.wait(1000); // for readability while watching test run
                cy.get('[data-testid="logdetail-creation_time"]')
                    .invoke('text')
                    .then(($item)=>{
                      const detailDate = $item.split(':').slice(1).join(':');
                      const momentDate = moment($date);
                      const momentDetailDate = moment(detailDate);
                      if (!momentDate.isSame(momentDetailDate, 'second')) {
                        throw new Error('Date displayed in the log detail does not match the date displayed in the log event page');
                      }
                    });
              });
        });
  });
});
