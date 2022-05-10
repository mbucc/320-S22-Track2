import React, {useState} from 'react';
import BPTreeComponent from './tree-view';
import {BPColors} from '../../../utils/business-process/standards';
import BPTreeFilterComponent from './tree-filter';

import {useLPSession} from '@taci-tech/launchpad-js';
import {BPLaunchpad} from '../../../utils/business-process/launchpad/core';
import BPLoader from '../common/loader';
import {IconMoodEmpty} from '@tabler/icons';
import {BPPaginationController} from '../common/pagination-controller';

const BPTreeView = ({
  onChange,
}) => {
  const {
    data: {treeMap, size},
    setParam,
    isLoading,
  } = useLPSession(BPLaunchpad.tree.getMap());

  const {
    data: eaiDomainList,
  } = useLPSession(BPLaunchpad.tree.getEAIDomainList());

  const {
    data: publishingBusinessDomainList,
  } = useLPSession(BPLaunchpad.tree.getPublishingBusinessDomainList());

  const [pageState, setPageState] = useState(0);
  const [filterState, setFilterState] = useState({});

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
      <BPTreeFilterComponent
        eaiDomainList={eaiDomainList}
        publishingBusinessDomainList={publishingBusinessDomainList}
        onChange={(filter) => {
          setFilterState(filter);
          setPageState(0);
          setParam(filter);
        }}
      />

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
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTreeComponent
          data={treeMap}
          size={size}
          isLoading={isLoading}
          onChange={(log) => {
            if (onChange && log) {
              onChange(log.eai_transaction_id);
            }
          }}
        />
        <BPPaginationController
          pageState={pageState}
          pageCount={Math.floor(size / 50) + (size % 50 > 0 ? 1 : 0)}
          style={{
            display: size > 50 ? 'flex' : 'none',
            position: 'absolute',
            bottom: '22px',
            right: '23px',
          }}
          onChange={(page) => {
            setPageState(page);
            setParam({
              ...filterState,
              pageNumber: page,
            });
          }}
        />
        <div
          style={{
            display: isLoading ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: BPColors.white,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '12px',
          }}
        >
          <BPLoader/>
          <div
            style={{
              fontSize: '15px',
              fontWeight: '500',
              color: BPColors.gray[400],
            }}
          >
            Loading...
          </div>
        </div>
        <div
          style={{
            display: !isLoading && treeMap.length === 0 ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: BPColors.white,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '12px',
          }}
        >
          <IconMoodEmpty
            style={{
              color: BPColors.gray[400],
            }}
          />
          <div
            style={{
              fontSize: '15px',
              fontWeight: '500',
              color: BPColors.gray[400],
            }}
          >
            No entries found
          </div>
        </div>
      </div>
    </div>
  );
};

export default BPTreeView;
