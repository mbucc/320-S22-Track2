import React, {useState} from 'react';
import {BPColors} from '../../../utils/business-process/standards';

import {BPCheckboxGroup} from './checkbox-group';

const severityOptions = [
  {
    key: 'success',
    label: 'Success',
    color: BPColors.success,
  },
  {
    key: 'info',
    label: 'Info',
    color: BPColors.info,
  },
  {
    key: 'warning',
    label: 'Warning',
    color: BPColors.warning,
  },
  {
    key: 'error',
    label: 'Error',
    color: BPColors.error,
  },
];

export const BPSeveritySelector = ({id = 'bp-severity-selector', label, onChange, style, boxStyle, hint, error}) => {
  const [selected, setSelected] = useState(['success', 'info', 'warning', 'error']);
  return (
    <BPCheckboxGroup
      id={id}
      label={label}
      onChange={(selection) => {
        setSelected(selection);
        onChange(selection);
      }}
      style={style}
      boxStyle={boxStyle}
      hint={hint}
      error={error}
      options={severityOptions}
      selected={selected}
    />
  );
};
