import React, {useState} from 'react';
import Image from 'next/image';
import TreeItem from '@mui/lab/TreeItem';

import {BPColors, BPDimens} from '../../../utils/business-process/standards';

const BPActivitySeverity = {
  info: '/business-process/icons/severity-icons-info.svg',
  warning: '/business-process/icons/severity-icons-warning.svg',
  error: '/business-process/icons/severity-icons-error.svg',
  success: '/business-process/icons/severity-icons-success.svg',
};

const getColorBySeverity = (severity) => {
  switch (severity) {
    case 'success':
      return BPColors.success;
    case 'info':
      return BPColors.info;
    case 'warning':
      return BPColors.warning;
    case 'error':
      return BPColors.error;
  }
};

const BPActivitySeverityIcon = ({severity}) => {
  return (
    <Image
      width={18}
      height={18}
      src={BPActivitySeverity[severity]}
    />
  );
};

const renderBusinessProcessInstances = (log) =>(
  <TreeItem
    key={log.id}
    nodeId={log.id}
    icon={<BPActivitySeverityIcon severity={log.severity}/>}
    label={log.sampleContent}
    sx={{
      marginTop: '1px',
      borderRadius: BPDimens.treeRadius,
      color: getColorBySeverity(log.severity),
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
