import {BPColors} from './standards';
import Image from 'next/image';
import React from 'react';

export const getColorBySeverityAccessor = (severity) => {
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

export const getColorBySeverityValue = (severity) => {
  if (severity < 10) {
    return BPColors.success;
  } else if (severity < 30) {
    return BPColors.info;
  } else if (severity < 50) {
    return BPColors.warning;
  } else {
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

export const getNameBySeverityValue = (severity) => {
  if (severity < 10) {
    return 'Success';
  } else if (severity < 30) {
    return 'Info';
  } else if (severity < 50) {
    return 'Warning';
  } else {
    return 'Error';
  }
};

export const BPActivitySeverityIcons = {
  Info: '/business-process/icons/severity-icons-info.svg',
  Warning: '/business-process/icons/severity-icons-warning.svg',
  Error: '/business-process/icons/severity-icons-error.svg',
  Success: '/business-process/icons/severity-icons-success.svg',
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
        src={BPActivitySeverityIcons[getNameBySeverityValue(severity)]}
      />
    </div>
  );
};
