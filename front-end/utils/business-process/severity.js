import {BPColors} from './standards';
import Image from 'next/image';
import React from 'react';

export const getColorBySeverity = (severity) => {
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

export const getNameBySeverityAccessor = (severity) => {
  switch (severity) {
    case 'success':
      return 'Success';
    case 'info':
      return 'Info';
    case 'warning':
      return 'Warning';
    case 'error':
      return 'Error';
  }
};

export const BPActivitySeverityIcons = {
  info: '/business-process/icons/severity-icons-info.svg',
  warning: '/business-process/icons/severity-icons-warning.svg',
  error: '/business-process/icons/severity-icons-error.svg',
  success: '/business-process/icons/severity-icons-success.svg',
};

export const BPActivitySeverityIcon = ({severity}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Image
        width={18}
        height={18}
        src={BPActivitySeverityIcons[severity]}
      />
    </div>
  );
};
