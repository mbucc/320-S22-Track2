// import GridData from '../../../fixtures/business-process/grid.json';
import LogEventTable from '../../../fixtures/business-process/log-event-table.json';
import {isValidSeverityValue} from '../../../../utils/business-process/severity';

/**
 * This function is used to mock the api call for the grid
 * @param {string} eaiTransactionId
 * @param {string[]} businessDomains - Only one.
 * @param {string} severity - Only one.
 * @return {object[]}
 */
function getGridResult({eaiTransactionId = '', businessDomains = [], severities}) {
  const result = [];

  const leTable = LogEventTable;

  leTable.forEach((le) => {
    if (
      le.eai_transaction_id === eaiTransactionId &&
      (
        !businessDomains ||
        businessDomains.length === 0 ||
        businessDomains.includes(le.business_domain)
      ) &&
      isValidSeverityValue(severities, le.severity)
    ) {
      result.push(le);
    }
  });

  // Below is the mock API for the grid. Keep it here for reference or future rollback.
  //
  // const gridData = JSON.parse(JSON.stringify(GridData));
  // gridData.forEach((eai) => {
  //   if (eai.eai_transaction_id === eaiTransactionId) {
  //     result.push(eai);
  //   }
  // });
  return result;
}

// eslint-disable-next-line require-jsdoc
function getBusinessDomainList() {
  const businessDomains = new Set();

  const leTable = LogEventTable;

  leTable.forEach((le) => {
    if (le.business_domain) {
      businessDomains.add(le.business_domain);
    }
  });

  return [...businessDomains];
}

export const BPGridMockAPI = {
  getGridResult,
  getBusinessDomainList,
};
