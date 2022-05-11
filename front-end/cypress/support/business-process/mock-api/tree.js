// import TreeData from '../../../fixtures/business-process/data.json';
import BusinessProcessTable from '../../../fixtures/business-process/business-process-table.json';
import moment from 'moment';

/**
 * This function is used to mock the api call for the tree
 * @param {moment.Moment} startDate
 * @param {moment.Moment} endDate
 * @param {string[]} eaiDomains
 * @param {string[]} pubDomains
 * @param {number} pageLength
 * @param {number} pageNumber
 * @return {object}
 */
function getTreeResult(
    {
      startDate = moment().subtract(30, 'minutes'),
      endDate = moment(),
      eaiDomains = [],
      pubDomains = [],
      pageLength = 50,
      pageNumber = 0,
    }
) {
  const result = {};
  let sizeCount = 0;
  let totalSizeCount = 0;
  let skipCount = 0;

  // Make data into readable JSON object.
  const bpTable = BusinessProcessTable;

  bpTable.forEach((bp) => {
    if (
      bp.eai_domain &&
      (eaiDomains.length === 0 || eaiDomains.includes(bp.eai_domain)) &&
      bp.pub_domain &&
      (pubDomains.length === 0 || pubDomains.includes(bp.pub_domain)) &&
      moment(bp.eai_transaction_create_time).isBetween(startDate, endDate)
    ) {
      totalSizeCount += 1;
      if (skipCount < pageNumber * pageLength) {
        skipCount += 1;
        return;
      }
      if (sizeCount >= pageLength) {
        return;
      }
      result[bp.eai_domain] = result[bp.eai_domain] || {};
      result[bp.eai_domain][bp.pub_domain] = result[bp.eai_domain][bp.pub_domain] || {};
      result[bp.eai_domain][bp.pub_domain][bp.business_process] =
          result[bp.eai_domain][bp.pub_domain][bp.business_process] || [];
      result[bp.eai_domain][bp.pub_domain][bp.business_process].push(bp);
      sizeCount += 1;
    }
  });

  // Below is the old mock data API function. Keep it for reference or rollback.
  //
  // const treeData = JSON.parse(JSON.stringify(TreeData));
  // treeData.forEach((eai) => {
  //   if ((eaiDomains.length === 0 || eaiDomains.includes(eai.name)) && eai.children) {
  //     eai.children.forEach((pub) => {
  //       if ((pubDomains.length === 0 || pubDomains.includes(pub.name)) && pub.children) {
  //         result[eai.name] = result[eai.name] || {};
  //         result[eai.name][pub.name] = {};
  //         pub.children.forEach((bp) => {
  //           if (bp.activities) {
  //             result[eai.name][pub.name][bp.name] = bp.activities;
  //           }
  //         });
  //       }
  //     });
  //   }
  // });

  return {
    eaiMap: result,
    size: totalSizeCount,
  };
}

/**
 * This function is used to get EAI Domains
 * @return {string[]} eaiDomains
 */
function getEAIDomain() {
  const eaiDomains = new Set();

  const bpTable = BusinessProcessTable;

  bpTable.forEach((bp) => {
    if (bp.eai_domain) {
      eaiDomains.add(bp.eai_domain);
    }
  });

  // Below is the old mock data API function. Keep it for reference or rollback.
  //
  // const treeData = JSON.parse(JSON.stringify(TreeData));
  // treeData.forEach((eai) => {
  //   eaiDomains.push(eai.name);
  // });

  return [...eaiDomains];
}

/**
 * This function is used to get Pub Domains
 * @return {string[]} pubDomains
 */
function getPubDomain() {
  const pubDomains = new Set();

  const bpTable = BusinessProcessTable;

  bpTable.forEach((bp) => {
    if (bp.pub_domain) {
      pubDomains.add(bp.pub_domain);
    }
  });

  // Below is the old mock data API function. Keep it for reference or rollback.
  //
  // const pubDomains = [];
  // const treeData = JSON.parse(JSON.stringify(TreeData));
  // treeData.forEach((eai) => {
  //   if (eai.children) {
  //     eai.children.forEach((pub) => {
  //       pubDomains.push(pub.name);
  //     });
  //   }
  // });

  return [...pubDomains];
}

export const BPTreeMockAPI = {
  getTreeResult,
  getEAIDomain,
  getPubDomain,
};
