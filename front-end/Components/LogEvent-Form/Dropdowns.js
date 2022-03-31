import React, {useState} from 'react';
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
<<<<<<< HEAD
      <Select
        value={dropdownValue}
        onChange={handleOnChange}
        data-testid={props.testid}
      >
=======
      <Select value={props.dropdownValue[props.name]} onChange={handleOnChange} >
>>>>>>> f769063bcd4250105d90df1a64701e777b2efe6e
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
