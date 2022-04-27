import React, {useEffect, useState} from 'react';
import {BPColors} from '../../../utils/business-process/standards';
import {IconCheck} from '@tabler/icons';

export const BPCheckbox = ({id = 'bp-checkbox', defaultSelected = false, children, onChange, contentColor = BPColors.gray[400], idleColor = BPColors.gray[200], activeColor = BPColors.green[600], ...labelProps}) => {
  const [isChecked, setIsChecked] = useState(defaultSelected);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(isChecked);
    }
  }, [isChecked]);

  return (
    <label
      id={id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        columnGap: 6,
        userSelect: 'none',
        opacity: isChecked || isHovered ? 1 : 0.90,
        color: contentColor,
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={() => {
        setIsChecked(!isChecked);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      {...labelProps}
    >
      <div
        style={{
          width: 19,
          height: 19,
          backgroundColor: isChecked ? activeColor : BPColors.white,
          border: `2px solid ${isChecked || isHovered ? activeColor : idleColor}`,
          borderRadius: 3,
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {isChecked && (
          <IconCheck width={'100%'} height={'100%'} color={BPColors.white} strokeWidth={3.5}/>
        )}
      </div>
      {children}
    </label>
  );
};
