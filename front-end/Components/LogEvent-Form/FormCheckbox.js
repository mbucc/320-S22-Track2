import React from 'react';
import {Checkbox, Container} from '@mui/material';
import {Button} from '@mui/material';
import {FormControlLabel} from '@mui/material';
/**
 *
 * @param {*} props checkbox state and setState passed into Formcheckbox
 * @return {JSX.Element}
 */
export default function FormCheckbox(props) {
  const labelStyle= {
    marginRight: '10px',
  };

  const checkAllStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  const formContainerStyle = {
    border: 'thin solid lightgray',
    borderRadius: '4px',
    margin: '10px 5px 0px',
    padding: '10px 10px',
    width: 'fit-content',
  };


  const handleOnChange = (event)=>{
    console.log(event);
    props.setCheckboxes((checkbox)=> {
      return {...checkbox, [event.target.name]: !checkbox[event.target.name]};
    });
  };

  const selectAll = (isSelected, event)=>{
    const objKeys = Object.keys(props.checkboxes);
    objKeys.forEach((name)=>{
      props.setCheckboxes((checkboxes)=>{
        return {...checkboxes, [name]: isSelected};
      });
    });
  };

  const checkAll = (event) => selectAll(true, event);
  const unCheckAll = (event) => selectAll(false, event);


  return (
    <div>
      <Container style = {formContainerStyle}>
        <h4> {props.name}:</h4>
        {Object.keys(props.checkboxes).map((e)=>{
          return (

            <FormControlLabel
              label = {e}
              style={labelStyle}
              control = {<Checkbox name={e} onChange={handleOnChange} checked={props.checkboxes[e]} />}
              key = {e}
            />

          );
        })}
        <div style = {checkAllStyle}>
          <Button onClick={checkAll}>Check All</Button>
          <Button onClick={unCheckAll}>Uncheck All</Button>
        </div>
      </Container>
    </div>
  );
}