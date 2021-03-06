import {BPColors} from './standards';
import Image from 'next/image';
import React from 'react';

export const severityOptions = ['success', 'info', 'warning', 'error'];
export const sortSeverityTags = (severities) => {
  if (!severities || severities.length === 0) {
    return undefined;
  }
  // In the order of 'success', 'info', 'warning', 'error'.
  severities.sort((a, b) => {
    return severityOptions.indexOf(a) - severityOptions.indexOf(b);
  });
  return severities;
};

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

export const getSeverityRangeValueByTag = (tag) => {
  switch (tag) {
    case 'success':
      return [0, 10];
    case 'info':
      return [10, 30];
    case 'warning':
      return [30, 50];
    case 'error':
      return [50, 100];
  }
};

export const isValidSeverityValue = (allowedSeverities, givenValue) => {
  if (!allowedSeverities || allowedSeverities.length === 0) {
    return true;
  }
  if (givenValue < 10) {
    return allowedSeverities.includes('success');
  } else if (givenValue < 30) {
    return allowedSeverities.includes('info');
  } else if (givenValue < 50) {
    return allowedSeverities.includes('warning');
  } else {
    return allowedSeverities.includes('error');
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

export const BPActivitySeverityIcon = ({size = 18, severity}) => {
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
        width={size}
        height={size}
        src={BPActivitySeverityIcons[getNameBySeverityValue(severity)]}
      />
    </div>
  );
};
