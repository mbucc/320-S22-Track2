import React, {useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

import {BPCheckbox} from './checkbox';

export const BPSeveritySelector = ({id = 'bp-severity-selector', label, onChange, style, boxStyle}) => {
  const [isHovered, setIsHovered] = useState(false);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...style,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {label ? (
        <p style={labelStyle}>{label}</p>
      ) : <></>}
      <div
        id={id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          flexWrap: 'wrap',
          padding: 13,
          rowGap: 15,
          columnGap: 15,
          color: BPColors.gray[400],
          borderRadius: BPDimens.smallRadius,
          border: BPStandards.border,
          background: isHovered ? BPColors.white : BPColors.gray[30],
          transition: 'all 0.15s ease-in-out',
          ...boxStyle,
        }}
      >
        <BPCheckbox
          id={`${id}-success`}
          activeColor={BPColors.success}
          contentColor={BPColors.success}
        >
          Success
        </BPCheckbox>
        <BPCheckbox
          id={`${id}-info`}
          activeColor={BPColors.info}
          contentColor={BPColors.info}
        >
          Info
        </BPCheckbox>
        <BPCheckbox
          id={`${id}-warning`}
          activeColor={BPColors.warning}
          contentColor={BPColors.warning}
        >
          Warning
        </BPCheckbox>
        <BPCheckbox
          id={`${id}-error`}
          activeColor={BPColors.error}
          contentColor={BPColors.error}
        >
          Error
        </BPCheckbox>
      </div>
    </div>
  );
};
