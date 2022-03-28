import React, {useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {Button} from '@mui/material';
import BPTextInput from '../common/text-input';
import {BPDatePicker} from '../common/date-picker';
import {BPDomainSelector} from '../common/domain-selector';
import {EAIDomainSample, PublishingBusinessDomainSample} from '../../../utils/business-process/sample-data';

const BPTreeFilterComponent = ({onChange}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
          callBack={(e)=> {
            setStartDate(e);
          }}
          baseDate = {new Date()}
        />

        <BPDatePicker
          label={'End Date'}
          callBack={(e)=> {
            endDate = e;
          }}
          baseDate = {startDate}
        />

        <BPDomainSelector
          label={'EAI Domain'}
          searchPlaceholder={'Search an EAI domain'}
          list={EAIDomainSample}
        />

        <BPDomainSelector
          label={'Publishing Business Domain'}
          searchPlaceholder={'Search a publishing domain'}
          list={PublishingBusinessDomainSample}
        />
      </div>
    </div>
  );
};

export default BPTreeFilterComponent;
