import React from 'react';
import TreeItem from '@mui/lab/TreeItem';

import {BPColors, BPDimens} from '../../../utils/business-process/standards';
import {BPActivitySeverityIcon, getColorBySeverityValue} from '../../../utils/business-process/severity';

const renderBusinessProcessInstances = (log, index, onChange) => (
  <TreeItem
    className='tree-log'
    key={log.eai_transaction_id ? log.eai_transaction_id : (log.name + index)}
    nodeId={log.eai_transaction_id ? log.eai_transaction_id : (log.name + index)}
    icon={<BPActivitySeverityIcon severity={log.severity}/>}
    label={log.name}
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
        backgroundColor: BPColors.gray[100],
      },
      '& > .MuiTreeItem-content': {
        minHeight: 34,
        borderRadius: BPDimens.treeRadius,
        padding: '0px 13px',
        '&.Mui-focused, &.Mui-selected, &.Mui-focused.Mui-selected': {
          backgroundColor: BPColors.gray[100],
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
