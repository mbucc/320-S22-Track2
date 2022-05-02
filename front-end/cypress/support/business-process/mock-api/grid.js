import GridData from '../../../fixtures/business-process/grid.json';

/**
 * This function is used to mock the api call for the grid
 * @param {string} eaiTransactionId
 * @return {object[]}
 */
function getGridResult(eaiTransactionId = '') {
  const result = [];
  const gridData = JSON.parse(JSON.stringify(GridData));
  gridData.forEach((eai) => {
    if (eai.eai_transaction_id === eaiTransactionId) {
      result.push(eai);
    }
  });
  return result;
}

export const BPGridMockAPI = {
  getGridResult,
};
