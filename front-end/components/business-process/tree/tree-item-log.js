import React from 'react';
import TreeItem from '@mui/lab/TreeItem';

import {BPColors, BPDimens} from '../../../utils/business-process/standards';
import {BPActivitySeverityIcon, getColorBySeverityValue} from '../../../utils/business-process/severity';
import {getDateStringByValue} from '../../../utils/business-process/date-options';

const renderBusinessProcessInstances = (log, onChange) =>(
  <TreeItem
    id='BPTree-log'
    key={log.id}
    nodeId={log.id}
    icon={<BPActivitySeverityIcon severity={log.severity}/>}
    label={getDateStringByValue(log.logEventCreatedDate)}
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
