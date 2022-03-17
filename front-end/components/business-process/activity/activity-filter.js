import React, {useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {Button} from '@mui/material';
import {BPDomainSelector} from '../common/domain-selector';
import {BPSeveritySelector} from '../common/severity-selector';
import {BusinessDomainSample} from '../../../utils/business-process/sample-data';

const BPActivityFilterComponent = ({onChange}) => {
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
          Activities Filter
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
          overflowY: 'scroll',
          overscrollBehaviorY: 'contain',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: 17,
        }}
      >
        <BPDomainSelector
          label={'Business Domain'}
          searchPlaceholder={'Search a business domain'}
          list={BusinessDomainSample}
        />

        <BPSeveritySelector
          label={'Severity'}
        />
      </div>
    </div>
  );
};

export default BPActivityFilterComponent;
