import React, {useState} from 'react';
import {BPColors, BPDimens} from '../../../utils/business-process/standards';

export const BPDomainSelectorItem = ({item, onClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        padding: '10px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: 15,
        fontWeight: '500',
        borderRadius: BPDimens.smallRadius,
        backgroundColor: isHovered ? BPColors.gray[70] : 'transparent',
        color: isHovered ? BPColors.gray[900] : BPColors.gray[500],
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.name}
    </div>
  );
};
