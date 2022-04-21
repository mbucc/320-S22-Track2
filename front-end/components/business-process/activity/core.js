import React, {useEffect} from 'react';
import {BPColors} from '../../../utils/business-process/standards';
import BPActivityFilterComponent from './activity-filter';
import BPTableComponent from './activity-table';

import {useLPSession} from '@taci-tech/launchpad-js';
import {BPLaunchpad} from '../../../utils/business-process/launchpad/core';
import {useBPActivityTableColumns} from './activity-table-columns';

const BPActivityView = ({
  selectedTransaction,
}) => {
  const {
    data: gridData,
    setParam: setSelectedTransaction,
  } = useLPSession(BPLaunchpad.activities.getGrid());

  const columns = useBPActivityTableColumns();

  const data = React.useMemo(
      () => gridData,
      [gridData]
  );

  useEffect(() => {
    setSelectedTransaction(selectedTransaction);
  }, [selectedTransaction]);

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
      <BPActivityFilterComponent/>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Table Section */}
      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          overflowX: 'auto',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTableComponent columns={columns} data={data}/>
      </div>
    </div>
  );
};

export default BPActivityView;
