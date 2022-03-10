import React, {useState} from 'react';
import Image from 'next/image';

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
      return '#22c55e';
    case 'info':
      return '#3b82f6';
    case 'error':
      return '#ef4444';
    case 'warning':
      return '#eab308';
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

const BPTreeMapActivityEntry = ({activity, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        borderRadius: BPDimens.cornerRadius,
        backgroundColor: isMouseOver ? BPColors.gray[50] : BPColors.transparent,
      }}
      onClick={() => setIsOpen(!isOpen)}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* Toggle Icon */}
      <div
        style={{
          height: '100%',
          flexShrink: 0,
          flexGrow: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
          marginRight: 10,
          color: '#888',
        }}
      >
        <BPActivitySeverityIcon severity={activity.severity} />
      </div>

      {/* Content */}
      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: getColorBySeverity(activity.severity),
          }}
        >
          {activity.sampleContent}
        </p>
      </div>
    </div>
  );
};

export default BPTreeMapActivityEntry;
