import React, {useEffect, useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {Button} from '@mui/material';
import {BPDatePicker} from '../common/date-picker';
import {BPDomainSelector} from '../common/domain-selector';

import {useLPSession} from '@taci-tech/launchpad-js';
import {BPLaunchpad} from '../../../utils/business-process/launchpad/core';

const BPTreeFilterComponent = ({onChange}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eaiDomains, setEAIDomains] = useState([]);
  const [publishingBusinessDomains, setPublishingBusinessDomains] = useState([]);

  const onApplyClick = () => {
    onChange({
      startDate,
      endDate,
      eaiDomains,
      publishingBusinessDomains,
    });
  };

  const {
    data: eaiDomainList,
  } = useLPSession(BPLaunchpad.tree.getEAIDomainList());

  const {
    data: publishingBusinessDomainList,
    setData: setSelectedEAIDomains,
  } = useLPSession(BPLaunchpad.tree.getPublishingBusinessDomainList());

  useEffect(() => {
    setSelectedEAIDomains(eaiDomains);
  }, [eaiDomains]);

  return (
    <div
      style={{
        width: 250,
        height: '100%',
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: BPDimens.toolbarHeight,
          flexShrink: 0,
          borderBottom: BPStandards.border,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 18,
          paddingRight: 17,
        }}
      >
        <p style={{fontSize: 17, fontWeight: '500'}}>
          Business Process
        </p>
        <Button
          size={'small'}
          sx={{
            color: 'white',
            borderRadius: 999,
            backgroundColor: '#22c55e',

            '&:hover': {
              backgroundColor: '#16a34a',
            },
          }}
          onClick={onApplyClick}
        >
          Apply
        </Button>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 18,
          overflowY: 'auto',
          overscrollBehaviorY: 'contain',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: 17,
        }}
      >
        <BPDatePicker
          label={'Start Date'}
          onChange={(newDate)=> {
            setStartDate(newDate);
          }}
          baseDate={new Date()}
        />

        <BPDatePicker
          label={'End Date'}
          onChange={(newDate)=> {
            setEndDate(newDate);
          }}
          baseDate={startDate}
        />

        <BPDomainSelector
          label={'EAI Domain'}
          searchPlaceholder={'Search an EAI domain'}
          list={eaiDomainList}
          onChange={(value) => setEAIDomains(value)}
        />

        <BPDomainSelector
          label={'Publishing Business Domain'}
          searchPlaceholder={'Search a publishing domain'}
          list={publishingBusinessDomainList}
          onChange={(value) => setPublishingBusinessDomains(value)}
        />
      </div>
    </div>
  );
};

export default BPTreeFilterComponent;
