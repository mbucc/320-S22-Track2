import React from 'react';
import {Select, MenuItem, InputLabel} from '@mui/material';

/**
 *
 * @param {*} props state and setState for dropdown options, as well as the name of the dropdown
 * @return {JSX.Element}
 */
export default function Dropdowns(props) {
  const dropdownStyle = {
    marginTop: '20px',
    marginRight: '20px',

  };

  const handleOnChange = (event)=>{
    props.setOptions((option)=>{
      return {...option, [props.name]: event.target.value};
    });
  };

  return (
    <div style={dropdownStyle}>
      <InputLabel > {props.name} </InputLabel>
      <Select value={props.dropdownValue[props.name]} onChange={handleOnChange} data-testid={`dropdown-${props.testid}`}>
        <MenuItem value={'All'}> {'All'}</MenuItem>
        {props.options.map((e, i)=>{
          return (
            <MenuItem key={i} value={e}> {e}</MenuItem>
          );
        })}
      </Select>

    </div>
  );
}
