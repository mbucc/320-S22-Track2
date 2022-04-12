import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const labelStyle = {
  marginBottom: '20px',
};

/**
 *
 * @param {*} props state and setState for dates
 * @return {JSX.Element}
 */
export default function FormDates(props) {
  const handleOnChange = (event) => {
    props.setFromToDates((date) => {
      return {...date, [event.target.name]: [event.target.value][0]};
    });
  };

  return (
    <div>
      <h4 style = {labelStyle}> {props.name}:</h4>
      <Stack component="" noValidate spacing={3}>
        <TextField
          name="From"
          id="from-date"
          label="From"
          type="datetime-local"
          defaultValue={props.fromToDates.From}
          value ={props.fromToDates.From}
          sx={{width: 250}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleOnChange}
        />
        <TextField
          name="To"
          id="to-date"
          label="To"
          type="datetime-local"
          defaultValue={props.fromToDates.To}
          value={props.fromToDates.To}
          sx={{width: 250}}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleOnChange}
        />
      </Stack>
    </div>
  );
}
