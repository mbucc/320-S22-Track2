import React from 'react';
import BPTreeMapEAIDomain from './tree-map-item-eai';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import BPTreeMapPublishingDomain from './tree-map-item-publishing';
import BPTreeMapBusinessProcess from './tree-map-item-process';
import {sampleEAIDomains} from '../../../utils/business-process/sample-data';
import {BPTextButton} from '../common/button';

import BPTreeMapActivityEntry from './tree-map-item-activity';
import ControlledTreeView from './tree-view';

const BPTreeMapComponent = ({onChange}) => {
  return (
    <ControlledTreeView/>
  );
};

export default BPTreeMapComponent;
