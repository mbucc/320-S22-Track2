import React, {useEffect, useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

import {BPCheckbox} from './checkbox';
import {IconAlertCircle, IconInfoCircle} from '@tabler/icons';

export const BPSeveritySelector = ({id = 'bp-severity-selector', label, onChange, style, boxStyle, hint, error}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState(['success', 'info', 'warning', 'error']);

  const [hintState, setHintState] = useState(null);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    if (hint) {
      setHintState(hint);
    }
  }, [hint]);

  useEffect(() => {
    if (error) {
      setErrorState(error);
    }
  }, [error]);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: errorState ?
      BPColors.red[600] :
      BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  const onCheckboxChange = (label) => {
    return (isSelected) => {
      setHintState(null);
      setErrorState(null);
      if (isSelected) {
        setSelectedSeverity([...selectedSeverity, label]);
      } else {
        setSelectedSeverity(selectedSeverity.filter((item) => item !== label));
      }
    };
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedSeverity);
    }
  }, [selectedSeverity]);

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
          border: errorState ?
            `1px solid ${BPColors.red[600]}` :
            BPStandards.border,
          background: isHovered ? BPColors.white : BPColors.gray[30],
          transition: 'all 0.15s ease-in-out',
          ...boxStyle,
        }}
      >
        <BPCheckbox
          id={`${id}-success`}
          activeColor={BPColors.success}
          contentColor={BPColors.success}
          onChange={onCheckboxChange('success')}
          defaultSelected={() => {
            return selectedSeverity.includes('success');
          }}
        >
          Success
        </BPCheckbox>
        <BPCheckbox
          id={`${id}-info`}
          activeColor={BPColors.info}
          contentColor={BPColors.info}
          onChange={onCheckboxChange('info')}
          defaultSelected={() => {
            return selectedSeverity.includes('info');
          }}
        >
          Info
        </BPCheckbox>
        <BPCheckbox
          id={`${id}-warning`}
          activeColor={BPColors.warning}
          contentColor={BPColors.warning}
          onChange={onCheckboxChange('warning')}
          defaultSelected={() => {
            return selectedSeverity.includes('warning');
          }}
        >
          Warning
        </BPCheckbox>
        <BPCheckbox
          id={`${id}-error`}
          activeColor={BPColors.error}
          contentColor={BPColors.error}
          onChange={onCheckboxChange('error')}
          defaultSelected={() => {
            return selectedSeverity.includes('error');
          }}
        >
          Error
        </BPCheckbox>
      </div>
      <div
        style={{
          display: errorState || hintState ? 'flex' : 'none',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          paddingTop: 4,
          color: errorState ? BPColors.red[600] : BPColors.gray[400],
        }}
      >
        <IconAlertCircle
          width={14}
          height={14}
          style={{
            flexShrink: 0,
            display: errorState ? 'flex' : 'none',
            marginTop: 0.5,
            marginRight: 5,
          }}
        />
        <IconInfoCircle
          width={14}
          height={14}
          style={{
            flexShrink: 0,
            display: hintState && !errorState ? 'flex' : 'none',
            marginTop: 0.5,
            marginRight: 5,
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: '500',
          }}
        >
          {errorState || hintState || ''}
        </span>
      </div>
    </div>
  );
};
