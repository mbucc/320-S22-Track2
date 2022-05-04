import React from 'react';
import TreeItem from '@mui/lab/TreeItem';

import {BPColors, BPDimens} from '../../../utils/business-process/standards';
import {BPActivitySeverityIcon, getColorBySeverityValue} from '../../../utils/business-process/severity';
import moment from 'moment';

const contextTag = (name, value) => {
  return (
    <span style={{
      color: BPColors.black,
      fontSize: 15,
      fontWeight: '400',
    }}>
      <span style={{color: BPColors.gray[400]}}>{name}:</span> {value}
    </span>
  );
};

const renderBusinessProcessInstances = (log, index, onChange) => (
  <TreeItem
    className='tree-log'
    key={log.nodeId}
    nodeId={`bp-tree-instance-${log.eai_transaction_id || log.nodeId}`}
    icon={<BPActivitySeverityIcon severity={log.severity}/>}
    label={(
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          columnGap: 15,
        }}
      >
        <span id={`bp-tree-instance-name-${log.eai_transaction_id || log.nodeId}`}>
          {log.name}
        </span>
        <span
          style={{
            color: getColorBySeverityValue(log.severity) + 'df',
            backgroundColor: getColorBySeverityValue(log.severity) + '0f',
            borderRadius: '4px',
            padding: '1px 6px',
            fontSize: '13px',
            fontWeight: '400',
            marginLeft: '-7px',
          }}
        >
          {moment(log.eai_transaction_create_time).format('MM/DD/YYYY HH:mm:ss A')}
        </span>
        {contextTag(log.key1_app_context_name, log.key1_app_context_value)}
        {contextTag(log.key2_app_context_name, log.key2_app_context_value)}
      </div>
    )}
    onClick={() => {
      if (onChange) {
        onChange(log);
      }
    }}
    sx={{
      marginTop: '1px',
      borderRadius: BPDimens.treeRadius,
      color: getColorBySeverityValue(log.severity),
      backgroundColor: BPColors.transparent,
      '&:hover': {
        backgroundColor: getColorBySeverityValue(log.severity) + '0b',
      },
      '& > .MuiTreeItem-content': {
        minHeight: 34,
        borderRadius: BPDimens.treeRadius,
        padding: '0px 13px',
        '&.Mui-focused': {
          backgroundColor: BPColors.transparent,
        },
        '&.Mui-selected, &.Mui-focused.Mui-selected': {
          backgroundColor: getColorBySeverityValue(log.severity) + '0f',
          outline: '1.5px solid ' + getColorBySeverityValue(log.severity) + '9f',
          '&:hover': {
            backgroundColor: BPColors.transparent,
          },
        },
        '&:hover': {
          backgroundColor: BPColors.transparent,
        },
      },
    }}
  />
);

export default renderBusinessProcessInstances;
