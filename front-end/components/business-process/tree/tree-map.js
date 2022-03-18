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
    // <div
    //   style={{
    //     width: '100%',
    //     height: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //   }}
    // >
    //   {/* Top Bar */}
    //   <div
    //     style={{
    //       width: '100%',
    //       height: BPDimens.toolbarHeight,
    //       flexShrink: 0,
    //       flexGrow: 0,
    //       padding: '0px 20px',
    //       borderBottom: BPStandards.border,
    //       backgroundColor: '#fff',
    //       display: 'flex',
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //       justifyContent: 'flex-start',
    //       columnGap: 2,
    //     }}
    //   >
    //     <BPTextButton>Expand All</BPTextButton>
    //     <BPTextButton>Collapse All</BPTextButton>
    //   </div>

    //   {/* Tree Map */}
    //   <div
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       flexShrink: 1,
    //       flexGrow: 0,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //       justifyContent: 'flex-start',
    //       padding: 20,
    //       overflowY: 'scroll',
    //       rowGap: 14,
    //     }}
    //   >
    //     {
    //       /* The main map hierarchy */
    //       sampleEAIDomains.map((eaiDomain) => {
    //         return (
    //           <BPTreeMapEAIDomain domain={eaiDomain} key={eaiDomain.name}>
    //             {(publishingDomains) => publishingDomains.map((pubDomain) => (
    //               <BPTreeMapPublishingDomain domain={pubDomain} key={pubDomain.name}>
    //                 {(businessProcesses) => businessProcesses.map((process) => (
    //                   <BPTreeMapBusinessProcess process={process} key={process.name}>
    //                     {(activities) => activities.map((activity) => (
    //                       <BPTreeMapActivityEntry activity={activity} key={activity.id}/>
    //                     ))}
    //                   </BPTreeMapBusinessProcess>
    //                 ))}
    //               </BPTreeMapPublishingDomain>
    //             ))}
    //           </BPTreeMapEAIDomain>
    //         );
    //       })
    //     }
    //   </div>
    // </div>
    <ControlledTreeView/>
  );
};

export default BPTreeMapComponent;
