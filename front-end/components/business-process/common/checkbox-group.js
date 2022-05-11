import React, {useEffect, useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

import {IconAlertCircle, IconCheck, IconInfoCircle} from '@tabler/icons';
import styled from 'styled-components';

const sampleOptions = [
  {
    key: 'option-1',
    label: 'Option 1',
    color: BPColors.green[600],
  },
  {
    key: 'option-2',
    label: 'Option 2',
    color: BPColors.gray[600],
  },
  {
    key: 'option-3',
    label: 'Option 3',
    color: BPColors.green[300],
  },
  {
    key: 'option-4',
    label: 'Option 4',
    color: BPColors.red[600],
  },
];

export const BPCheckboxGroupItem = ({id = 'bp-checkbox-group-item', selectKey, selections, children, onClick, contentColor = BPColors.gray[400], idleColor = BPColors.gray[200], activeColor = BPColors.green[600], ...labelProps}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsChecked(selections.includes(selectKey));
  }, [selections]);

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
      onClick={(event) => {
        onClick(event);
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

const BPSelectAllButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  margin-bottom: 1px;
  cursor: pointer;
  color: ${BPColors.gray[400]};
  font-size: 13px;
  font-weight: 400;
  transition: all 0.11s ease-in-out;
  user-select: none;
  opacity: 0.80;
  
  &:hover {
    color: ${BPColors.gray[500]};
    background-color: ${BPColors.gray[100]};
    border-radius: ${BPDimens.smallRadius}px;
    opacity: 1.00;
  }
`;

export const BPCheckboxGroup = ({id = 'bp-checkbox-group', label, onChange, style, boxStyle, options = sampleOptions, selected = [], hint, error}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selected);

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: error ?
      BPColors.red[600] :
      BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  const onCheckboxClick = (label) => {
    return () => {
      if (onChange) {
        if (!selectedOptions.includes(label)) {
          onChange([...selectedOptions, label]);
        } else {
          onChange(selectedOptions.filter((item) => item !== label));
        }
      } else {
        if (!selectedOptions.includes(label)) {
          setSelectedOptions([...selectedOptions, label]);
        } else {
          setSelectedOptions(selectedOptions.filter((item) => item !== label));
        }
      }
    };
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={labelStyle}>{label}</div>
          <BPSelectAllButton id = "bp-activity-filter-severity-checkall-button"
            onClick={() => {
              if (selectedOptions.length === options.length) {
                if (onChange) {
                  onChange([]);
                } else {
                  setSelectedOptions([]);
                }
              } else {
                if (onChange) {
                  onChange(options.map((option) => option.key));
                } else {
                  setSelectedOptions(options.map((option) => option.key));
                }
              }
            }}
          >
            {selectedOptions.length === options.length ? 'Uncheck All' : 'Check All'}
          </BPSelectAllButton>
        </div>
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
          border: error ?
            `1px solid ${BPColors.red[600]}` :
            BPStandards.border,
          background: isHovered ? BPColors.white : BPColors.gray[30],
          transition: 'all 0.15s ease-in-out',
          ...boxStyle,
        }}
      >
        {
          options.map((option) => {
            return (
              <BPCheckboxGroupItem
                key={option.key}
                id={`${id}-option-${option.key}`}
                activeColor={option.color}
                contentColor={option.color}
                onClick={onCheckboxClick(option.key)}
                selectKey={option.key}
                selections={selectedOptions}
              >
                {option.label}
              </BPCheckboxGroupItem>
            );
          })
        }
      </div>
      <div
        style={{
          display: error || hint ? 'flex' : 'none',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          paddingTop: 4,
          color: error ? BPColors.red[600] : BPColors.gray[400],
        }}
      >
        <IconAlertCircle
          width={14}
          height={14}
          style={{
            flexShrink: 0,
            display: error ? 'flex' : 'none',
            marginTop: 0.5,
            marginRight: 5,
          }}
        />
        <IconInfoCircle
          width={14}
          height={14}
          style={{
            flexShrink: 0,
            display: hint && !error ? 'flex' : 'none',
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
          {error || hint || ''}
        </span>
      </div>
    </div>
  );
};
