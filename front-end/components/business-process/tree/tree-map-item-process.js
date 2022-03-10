import React, {useState} from 'react';
import Image from 'next/image';

import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

const BPTreeMapBusinessProcess = ({process, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {/* Entry */}
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
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Image
            src={'/business-process/icons/caret-right.svg'}
            width={20}
            height={20}
            objectFit={'contain'}
          />
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
            style={BPStandards.mapSubEntryTitle}
          >
            {process.name}
          </p>
        </div>
      </div>

      {/* Popup */}
      <div
        style={{
          width: '100%',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          paddingLeft: 20,
        }}
      >
        {children ? children(process.children || []) : null}
      </div>
    </div>
  );
};

export default BPTreeMapBusinessProcess;
