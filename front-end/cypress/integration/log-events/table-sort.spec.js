// testing all 6 sorting functionalities.

import moment from 'moment';

const severityOrder = ['success', 'info', 'warning', 'error'];
const priorityOrder = ['low', 'medium', 'high'];
const sorted = (direction, by, a, b)=>{
  let aNum; let bNum;
  if (direction === 'desc') {
    if (by === 'priority') {
      aNum = priorityOrder.indexOf(a);
      bNum = priorityOrder.indexOf(b);
      return aNum >= bNum;
    } else if (by === 'severity') {
      aNum = severityOrder.indexOf(a);
      bNum = severityOrder.indexOf(b);
      return aNum >= bNum;
    } else if (by === 'date') {
      const aMoment = moment(a);
      const bMoment = moment(b);
      return aMoment.isAfter(bMoment, 'second');
    } else {
      throw new Error('Error: sorted(direction, by, a, b) - by argument is invalid');
    }
  } else if (direction === 'asc') {
    if (by === 'priority') {
      aNum = priorityOrder.indexOf(a);
      bNum = priorityOrder.indexOf(b);
      return bNum >= aNum;
    } else if (by === 'severity') {
      aNum = severityOrder.indexOf(a);
      bNum = severityOrder.indexOf(b);
      return bNum >= aNum;
    } else if (by === 'date') {
      const aMoment = moment(a);
      const bMoment = moment(b);
      return bMoment.isAfter(aMoment, 'second');
    } else {
      throw new Error('Error: sorted(direction, by, a, b) - by argument is invalid');
    }
  } else {
    throw new Error('Error: sorted(direction, by, a, b) - direction argument is invalid');
  }
};


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

  cy.get(`[data-testid='logevent-button-apply']`)
      .click();
});

describe('Sorting', ()=>{
  it('is initially sorted by descending date', ()=>{
    cy.get('tbody>tr').each(($el, index, $list)=>{
      // test the first 10 entries
      if (index < 9) {
        // get date of current entry
        cy.wrap($el)
            .find('[data-testid="logevent-table-cell-date"]')
            .invoke('text')
            .then(($date)=>{
              // get date of next entry
              cy.wrap($el)
                  .next()
                  .find('[data-testid="logevent-table-cell-date"]')
                  .invoke('text')
                  .then(($nextDate)=>{
                    if (!sorted('desc', 'date', $date, $nextDate)) {
                      throw new Error('Entries not sorted by descending date');
                    }
                  });
            });
      }
    });
  });
  it('sorts by ascending date', ()=>{
    cy.get('[data-testid="logevent-button-sort-date"]')
        .click();
    cy.get('tbody>tr').each(($el, index, $list)=>{
      // test the first 10 entries
      if (index < 9) {
        // get date of current entry
        cy.wrap($el)
            .find('[data-testid="logevent-table-cell-date"]')
            .invoke('text')
            .then(($date)=>{
              // get date of next entry
              cy.wrap($el)
                  .next()
                  .find('[data-testid="logevent-table-cell-date"]')
                  .invoke('text')
                  .then(($nextDate)=>{
                    if (!sorted('asc', 'date', $date, $nextDate)) {
                      throw new Error('Entries not sorted by ascending date');
                    }
                  });
            });
      }
    });
  });
  it('sorts by descending severity', ()=>{
    cy.get('[data-testid="logevent-button-sort-severity"]')
        .click();
    cy.get('tbody>tr').each(($el, index, $list)=>{
      // test the first 10 entries
      if (index < 9) {
        // get date of current entry
        cy.wrap($el)
            .find('[data-testid="logevent-table-cell-severity"]')
            .invoke('text')
            .then(($severity)=>{
              // get date of next entry
              cy.wrap($el)
                  .next()
                  .find('[data-testid="logevent-table-cell-date"]')
                  .invoke('text')
                  .then(($nextSeverity)=>{
                    if (!sorted('desc', 'severity', $severity, $nextSeverity)) {
                      throw new Error('Entries not sorted by descending severity');
                    }
                  });
            });
      }
    });
  });
  it('sorts by ascending severity', ()=>{
    cy.get('[data-testid="logevent-button-sort-severity"]')
        .click();
    cy.get('tbody>tr').each(($el, index, $list)=>{
      // test the first 10 entries
      if (index < 9) {
        // get date of current entry
        cy.wrap($el)
            .find('[data-testid="logevent-table-cell-severity"]')
            .invoke('text')
            .then(($severity)=>{
              // get date of next entry
              cy.wrap($el)
                  .next()
                  .find('[data-testid="logevent-table-cell-severity"]')
                  .invoke('text')
                  .then(($nextSeverity)=>{
                    if (!sorted('asc', 'severity', $severity, $nextSeverity)) {
                      throw new Error('Entries not sorted by ascending severity');
                    }
                  });
            });
      }
    });
  });
  it('sorts by descending priority', ()=>{
    cy.get('[data-testid="logevent-button-sort-priority"]')
        .click();
    cy.get('tbody>tr').each(($el, index, $list)=>{
      // test the first 10 entries
      if (index < 9) {
        // get date of current entry
        cy.wrap($el)
            .find('[data-testid="logevent-table-cell-priority"]')
            .invoke('text')
            .then(($priority)=>{
              // get date of next entry
              cy.wrap($el)
                  .next()
                  .find('[data-testid="logevent-table-cell-priority"]')
                  .invoke('text')
                  .then(($nextPriority)=>{
                    if (!sorted('desc', 'priority', $priority, $nextPriority)) {
                      throw new Error('Entries not sorted by descending priority');
                    }
                  });
            });
      }
    });
  });
  it('sorts by ascending priority', ()=>{
    cy.get('[data-testid="logevent-button-sort-priority"]')
        .click();
    cy.get('tbody>tr').each(($el, index, $list)=>{
      // test the first 10 entries
      if (index < 9) {
        // get date of current entry
        cy.wrap($el)
            .find('[data-testid="logevent-table-cell-priority"]')
            .invoke('text')
            .then(($priority)=>{
              // get date of next entry
              cy.wrap($el)
                  .next()
                  .find('[data-testid="logevent-table-cell-priority"]')
                  .invoke('text')
                  .then(($nextPriority)=>{
                    if (!sorted('asc', 'priority', $priority, $nextPriority)) {
                      throw new Error('Entries not sorted by ascending priority');
                    }
                  });
            });
      }
    });
  });
});
