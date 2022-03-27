import {getEAIDomainList, getPublishingBusinessDomainList, getTreeMap} from './tree-map';
import {getActivityGrid} from './activity-table';

export const BPLaunchpad = {
  tree: {
    getMap: getTreeMap,
    getEAIDomainList: getEAIDomainList,
    getPublishingBusinessDomainList: getPublishingBusinessDomainList,
  },
  activities: {
    getGrid: getActivityGrid,
  },
};
