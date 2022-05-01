import TreeData from '../../../fixtures/business-process/data.json';

/**
 * This function is used to mock the api call for the tree
 * @param {string[]} eaiDomains
 * @param {string[]} pubDomains
 * @return {object}
 */
function getTreeResult({eaiDomains = [], pubDomains = []}) {
  const result = {};
  const treeData = JSON.parse(JSON.stringify(TreeData));
  treeData.forEach((eai) => {
    if ((eaiDomains.length === 0 || eaiDomains.includes(eai.name)) && eai.children) {
      eai.children.forEach((pub) => {
        if ((pubDomains.length === 0 || pubDomains.includes(pub.name)) && pub.children) {
          result[eai.name] = result[eai.name] || {};
          result[eai.name][pub.name] = {};
          pub.children.forEach((bp) => {
            if (bp.activities) {
              result[eai.name][pub.name][bp.name] = bp.activities;
            }
          });
        }
      });
    }
  });
  return result;
}

export const BPTreeMockAPI = {
  getTreeResult,
};
