// TODO: Write tests for activity table.

// const { cy } = require("date-fns/locale");
import {goThroughLogin} from '../../support/business-process/utility/general';

describe('Activity Table Behavior', () => {
  beforeEach(() => {
    cy.visit('/business-process');
    goThroughLogin();
  });
  // checks if clicking component in tree corresponds to the activity showing up in the activity table
  it('Populating activity table by clicking the tree', () => {
    cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get(':nth-child(1) > .tr > [style="display: inline-block; box-sizing: border-box; width: 140px;"]').should('exist');
  });
});

const tableToArray = (arr) => {
  cy.get('.table-body .tr').each(($e, index) => {
    arr.push([]);
    cy.wrap($e).within(() => {
      cy.get('.td').each(($e2, index2) => {
        const text = $e2.text();
        arr[index].push(text);
      });
    });
  });
};


// flag indicates whether to sort in decs or asc order(true-> asc and false-> decs)
// f is a function that determines
// cI is the index of column to sort based on that
const sortArray = (arr, flag, cI, t) => {
  arr = arr.slice().sort((a, b) => {
    const f = t(a[cI]);
    const s = t(b[cI]);
    return flag ? s-f : f-s;
  });
  return arr;
};

const arrayAreEqual = (arr1, arr2) => {
  if (arr1.length != arr2.length) {
    expect(false).to.be.true;
  }

  arr1.forEach((element) => {
    for (let i = 0; i < arr1.length; i++) {
      expect(arr1[i]).to.have.ordered.members(arr2[i]);
    }
  });
};

let originalData = [];
let sortedAscending = [];
let sortedDescending = [];
let sortedUnordered = [];

describe('Table Sorts correctly based on date', () => {
  beforeEach(() => {
    cy.visit('/business-process');
  });

  it('copy values', () => {
    cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    tableToArray(originalData);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 265px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 265px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 265px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });

  it('Date sorted in ascending order works correctly', () => {
    const arr = sortArray(originalData, true, 1, (a) => new Date(a));
    arrayAreEqual(arr, sortedDescending);
  });

  it('Date sorted in descending order works correctly', () => {
    const arr = sortArray(originalData, false, 1, (a) => new Date(a));
    arrayAreEqual(arr, sortedAscending);
  });

  it('Date unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});


describe('Table Sorts correctly based on severity', () => {
  beforeEach(() => {
    cy.visit('/business-process');
  });

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];

    cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    tableToArray(originalData);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 140px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });

  it('sevirity sorted in ascending order works correctly', () => {
    const arr = sortArray(originalData, true, 0, (a) => {
      if (a == 'Error') {
        return 4;
      }
      if (a == 'Warning') {
        return 3;
      }
      if (a == 'Info') {
        return 2;
      }
      if (a == 'Success') {
        return 1;
      }
    });
    arrayAreEqual(arr, sortedDescending);
  });

  it('sevirity sorted in descending order works correctly', () => {
    const arr = sortArray(originalData, false, 0, (a) => {
      if (a == 'Error') {
        return 4;
      }
      if (a == 'Warning') {
        return 3;
      }
      if (a == 'Info') {
        return 2;
      }
      if (a == 'Success') {
        return 1;
      }
    });
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});


describe('Table Sorts correctly based on buisiness domain', () => {
  beforeEach(() => {
    cy.visit('/business-process');
  });

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];

    cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    tableToArray(originalData);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 220px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 220px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 220px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });


  it('sevirity sorted in ascending order works correctly', () => {
    const arr = originalData.slice().sort((a, b) => {
      if (a[2] < b[2]) {
        return -1;
      } if (a[2] > b[2]) {
        return 1;
      }
      return 0;
    });
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
  });


  it('sevirity sorted in descending order works correctly', () => {
    const arr = originalData.slice().sort((a, b) => {
      if (a[2] < b[2]) {
        return -1;
      } if (a[2] > b[2]) {
        return 1;
      }
      return 0;
    });
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});

describe('Table Sorts correctly based on Application', () => {
  beforeEach(() => {
    cy.visit('/business-process');
  });

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];

    cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    tableToArray(originalData);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 210px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 210px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 210px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });


  it('sevirity sorted in ascending order works correctly', () => {
    const arr = originalData.slice().sort((a, b) => {
      if (a[3] < b[3]) {
        return -1;
      } if (a[3] > b[3]) {
        return 1;
      }
      return 0;
    });
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
  });


  it('sevirity sorted in descending order works correctly', () => {
    const arr = originalData.slice().sort((a, b) => {
      if (a[3] < b[3]) {
        return -1;
      } if (a[3] > b[3]) {
        return 1;
      }
      return 0;
    });
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});

describe('Table Sorts correctly based on Activity', () => {
  beforeEach(() => {
    cy.visit('/business-process');
  });

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];

    cy.get('#mui-1-EAI\\ Domain\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Publishing\\ Business\\ Domain\\ 1\\ from\\ EAI\\ 1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-Business\\ Process\\ 1001 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    cy.get('#mui-1-1 > .css-1g86id8-MuiTreeItem-content > .MuiTreeItem-label').click();

    tableToArray(originalData);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 240px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 240px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get('[style="display: inline-block; box-sizing: border-box; width: 240px; position: relative;"] > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });


  it('sevirity sorted in ascending order works correctly', () => {
    const arr = originalData.slice().sort((a, b) => {
      if (a[4] < b[4]) {
        return -1;
      } if (a[4] > b[4]) {
        return 1;
      }
      return 0;
    });
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
  });


  it('sevirity sorted in descending order works correctly', () => {
    const arr = originalData.slice().sort((a, b) => {
      if (a[4] < b[4]) {
        return -1;
      } if (a[4] > b[4]) {
        return 1;
      }
      return 0;
    });
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});


