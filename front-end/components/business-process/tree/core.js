import React from 'react';
import BPTreeComponent from './tree-view';
import {BPColors} from '../../../utils/business-process/standards';
import BPTreeFilterComponent from './tree-filter';

const BPTreeView = ({
  onChange,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Filter Section */}
      <BPTreeFilterComponent/>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Map Section */}

      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTreeComponent />
      </div>
    </div>
  );
};

export default BPTreeView;
