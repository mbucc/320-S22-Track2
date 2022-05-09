// import GridData from '../../../fixtures/business-process/grid.json';
import LogEventTable from '../../../fixtures/business-process/log-event-table.json';
import {getSeverityRangeValueByTag} from '../../../../utils/business-process/severity';

/**
 * This function is used to mock the api call for the grid
 * @param {string} eaiTransactionId
 * @param {string[]} businessDomains - Only one.
 * @param {string} severity - Only one.
 * @return {object[]}
 */
function getGridResult({eaiTransactionId = '', businessDomains = [], severity}) {
  const result = [];

  const leTable = LogEventTable;

  // Severity range will be undefined if the severity is not defined.
  const severityRange = severity && getSeverityRangeValueByTag(severity);

  leTable.forEach((le) => {
    if (
      le.eai_transaction_id === eaiTransactionId &&
      (businessDomains.length === 0 || businessDomains.contains(le.business_domain)) &&
      (!severityRange || (le.severity >= severityRange[0] && le.severity < severityRange[1]))
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

export const BPGridMockAPI = {
  getGridResult,
};
