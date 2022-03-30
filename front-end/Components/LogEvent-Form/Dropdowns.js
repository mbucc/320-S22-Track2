import React, {useState} from 'react';
import {Select, MenuItem, InputLabel} from '@mui/material';

/**
 *
 * @param {*} props state and setState for dropdown options, as well as the name of the dropdown
 * @return {JSX.Element}
 */
export default function Dropdowns(props) {
  const [dropdownValue, setDropdownValue] = useState('All');

  const dropdownStyle = {
    marginTop: '20px',
    marginRight: '20px',

  };

  const handleOnChange = (event)=>{
    setDropdownValue(event.target.value);
    props.setOptions((option)=>{
      return {...option, [props.name]: event.target.value};
    });
  };

  return (
    <div style={dropdownStyle}>
      <InputLabel > {props.name} </InputLabel>
      <Select value={dropdownValue} onChange={handleOnChange} >
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
