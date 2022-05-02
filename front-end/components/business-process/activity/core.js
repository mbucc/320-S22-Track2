import React, {useEffect} from 'react';
import {BPColors, BPDimens} from '../../../utils/business-process/standards';
import BPActivityFilterComponent from './activity-filter';
import BPTableComponent from './activity-table';

import {useLPSession} from '@taci-tech/launchpad-js';
import {BPLaunchpad} from '../../../utils/business-process/launchpad/core';
import {useBPActivityTableColumns} from './activity-table-columns';
import BPLoader from '../common/loader';
import {IconBulb, IconMoodEmpty} from '@tabler/icons';

import styled from 'styled-components';

const BPSectionNoticeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  
  background-color: ${BPColors.gray[100]}4f;
  border-top: 1px solid ${BPColors.gray[100]};
  padding: 20px;
  
  column-gap: 10px;
`;

const BPActivityView = ({
  selectedTransaction,
}) => {
  const {
    data: gridData,
    setParam: setGridParam,
    isLoading,
  } = useLPSession(BPLaunchpad.activities.getGrid());

  const {
    data: businessDomainList,
  } = useLPSession(BPLaunchpad.activities.getBusinessDomainList());

  const columns = useBPActivityTableColumns();

  const [filter, setFilter] = React.useState({
    businessDomain: [],
    severity: [],
  });

  const data = React.useMemo(
      () => gridData,
      [gridData]
  );

  const updateGrid = (filter) => {
    setGridParam({
      id: selectedTransaction,
      businessDomain: filter.businessDomain.length > 0 ? filter.businessDomain : undefined,
      severity: filter.severity.length > 0 ? filter.severity : undefined,
    });
  };

  useEffect(() => {
    if (selectedTransaction) {
      updateGrid(filter);
    }
  }, [selectedTransaction]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Filter Section */}
      <BPActivityFilterComponent
        businessDomainList={businessDomainList}
        onChange={(filter) => {
          setFilter(filter);
          updateGrid(filter);
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

      {/* Table Section */}
      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          overflowX: 'auto',
          position: 'relative',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTableComponent
          columns={columns}
          data={data}
        />
        <BPSectionNoticeBox
          style={{
            display: isLoading ? 'flex' : 'none',
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
        </BPSectionNoticeBox>
        <BPSectionNoticeBox
          style={{
            display: !isLoading && !selectedTransaction && data.length === 0 ? 'flex' : 'none',
          }}
        >
          <IconBulb
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
            Select a business process instance to view the grid.
          </div>
        </BPSectionNoticeBox>
        <div
          style={{
            display: !isLoading && selectedTransaction && data.length === 0 ? 'flex' : 'none',
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
              marginTop: BPDimens.toolbarHeight * 0.8,
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

export default BPActivityView;
