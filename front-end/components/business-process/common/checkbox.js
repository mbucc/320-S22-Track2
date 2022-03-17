import React, {useState} from 'react';
import {BPColors} from '../../../utils/business-process/standards';
import {IconCheck} from '@tabler/icons';

export const BPCheckbox = ({checkboxProps, children, contentColor = BPColors.gray[400], idleColor = BPColors.gray[200], activeColor = BPColors.green[600]}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        columnGap: 6,
        userSelect: 'none',
        opacity: isChecked || isHovered ? 1 : 0.80,
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
