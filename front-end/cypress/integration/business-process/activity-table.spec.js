import {goThroughLogin} from '../../support/business-process/utility/general';
import moment from 'moment';
import {generatePath} from '../../support/business-process/utility/path-generator';
import {convertToAPIFormat} from '../../../utils/business-process/date-options';
import {BPTreeMockAPI} from '../../support/business-process/mock-api/tree';
import {selectTreeItem} from '../../support/business-process/input/tree-selection';
import {inputEndDate, inputStartDate} from '../../support/business-process/input/date-picker';
import {interceptBusinessDomainList, interceptGridAPI} from '../../support/business-process/utility/intercept';
import {clickTreeApplyButton} from '../../support/business-process/input/apply-button';

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

const testingEAITransactionId = 'eai-trans-id-XQShJj-596835';
const testingTime = '2022-05-03T21:34:00+00:00';

// Call before every test to prepare the environment.
const prepare = () => {
  before(() => {
    // This is a minimal example on how to generate a path and then intercept the API request.
    const currentTime = moment(testingTime);
    const past30Minutes = currentTime.clone().subtract(30, 'minutes');
    const treePath = generatePath('/businessProcessTree', { //
      'startTime': convertToAPIFormat(past30Minutes.clone()),
      'endTime': convertToAPIFormat(currentTime.clone()),
    });
    // IMPORTANT: Intercepting the corresponding API request when there is one.
    cy.intercept('GET', treePath, {
      statusCode: 200,
      body: BPTreeMockAPI.getTreeResult({
        startDate: past30Minutes.clone(),
        endDate: currentTime.clone(),
      }), //
    }).as('getTree');

    cy.visit('/business-process');
    cy.clock(moment(testingTime).utc().toDate().getTime());
    goThroughLogin();

    inputStartDate(past30Minutes.format('MM/DD/YYYY HH:mm:ss'));
    inputEndDate(currentTime.format('MM/DD/YYYY HH:mm:ss'));
    clickTreeApplyButton();

    interceptGridAPI({
      eaiTransactionId: testingEAITransactionId,
    }).as('getGrid');

    // Select the first tree item in order to test the grid.
    selectTreeItem(testingEAITransactionId);
    cy.wait('@getGrid');

    interceptBusinessDomainList();
  });
};
// f is a function that determines
// cI is the index of column to sort based on that
const sortArray = (arr, cI, t) => {
  arr = arr.slice().sort((a, b) => {
    const f = t(a[cI]);
    const s = t(b[cI]);
    return f-s;
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
  prepare();

  it('copy values', () => {
    tableToArray(originalData);

    cy.get(':nth-child(2) > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get(':nth-child(2) > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get(':nth-child(2) > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });

  it('Date sorted in descending order works correctly', () => {
    const arr = sortArray(originalData, 1, (a) => new Date(a));
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
  });

  it('Date sorted in descending order works correctly', () => {
    const arr = sortArray(originalData, 1, (a) => new Date(a));
    arrayAreEqual(arr, sortedAscending);
  });

  it('Date unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});


describe('Table Sorts correctly based on severity', () => {
  prepare();

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];
    tableToArray(originalData);

    cy.get(':nth-child(1) > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get(':nth-child(1) > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get(':nth-child(1) > .table-header-sorter').click();

    tableToArray(sortedUnordered);
  });

  it('sevirity sorted in descending order works correctly', () => {
    const arr = sortArray(originalData, 0, (a) => {
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
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
  });

  it('sevirity sorted in ascending order works correctly', () => {
    const arr = sortArray(originalData, 0, (a) => {
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
  prepare();

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];
    tableToArray(originalData);

    cy.get(':nth-child(3) > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get(':nth-child(3) > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get(':nth-child(3) > .table-header-sorter').click();

    tableToArray(sortedUnordered);
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
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
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
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});

describe('Table Sorts correctly based on Application', () => {
  prepare();

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];
    tableToArray(originalData);

    cy.get(':nth-child(4) > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get(':nth-child(4) > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get(':nth-child(4) > .table-header-sorter').click();

    tableToArray(sortedUnordered);
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
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
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
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});

describe('Table Sorts correctly based on Activity', () => {
  prepare();

  it('copy values', () => {
    originalData = [];
    sortedAscending = [];
    sortedDescending = [];
    sortedUnordered = [];
    tableToArray(originalData);

    cy.get(':nth-child(5) > .table-header-sorter').click();

    tableToArray(sortedDescending);

    cy.get(':nth-child(5) > .table-header-sorter').click();

    tableToArray(sortedAscending);

    cy.get(':nth-child(5) > .table-header-sorter').click();

    tableToArray(sortedUnordered);
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
    arr.reverse();
    arrayAreEqual(arr, sortedDescending);
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
    arrayAreEqual(arr, sortedAscending);
  });

  it('sevirity unordered works correctly', () => {
    arrayAreEqual(originalData, sortedUnordered);
  });
});

