import React, {useState} from 'react';
import {Checkbox, Container} from '@mui/material';
import {Button} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { BPColors } from '../../utils/business-process/standards';
/**
 *
 * @param {*} props checkbox state and setState passed into Formcheckbox
 * @return {JSX.Element}
 */
export default function FormCheckbox(props) {
  const [checkallButton, setCheckallButton] = useState('Check All');

  const labelStyle= {
    marginRight: '10px',
  };

  const checkAllStyle = {
    display: 'block',
    alignSelf: 'start',
    color: BPColors.gray[600],
  };

  const checkboxesStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const groupLabelStyle = {
    marginRight: '10px',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 5,
    color: BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    border: 'thin solid lightgray',
    borderRadius: '4px',
    margin: '2px 5px 5px 5px',
    padding: '10px 10px',
    width: '200px',
    height: 'fit-content',
    backgroundColor: '#FCFDFD',
  };


  const handleOnChange = (event)=>{
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
    if (isSelected) {
      setCheckallButton('Uncheck All');
    } else {
      setCheckallButton('Check All');
    }
  };


  const checkAll = (event) => selectAll(true, event);
  const uncheckAll = (event) => selectAll(false, event);

  // consterror = [];

  const error = Object.keys(props.checkboxes).filter((v) => props.checkboxes[v]).length < 1;

  return (
    <div>
      <label style = {groupLabelStyle}> {props.name}:</label>
      <Container style = {formContainerStyle} data-testid = {`checkbox-${props.testid}`}>
        <FormControl
          required
          error={error}
        >
          <FormGroup style={checkboxesStyle}>
            {Object.keys(props.checkboxes).map((e)=>{
              return (
                <FormControlLabel
                  label = {e}
                  style={labelStyle}
                  control = {<Checkbox
                    name={e}
                    onChange={handleOnChange}
                    checked={props.checkboxes[e]}
                    data-testid = {`checkbox-${props.testid}-${e.toLowerCase()}`}
                  />}
                  key = {e}
                />
              );
            })}
          </FormGroup>
          <FormHelperText>Pick at least 1</FormHelperText>
        </FormControl>
        <div>
          <Button
            style = {checkAllStyle}
            onClick={checkallButton === 'Check All' ? checkAll : uncheckAll}
            data-testid={`checkbox-${props.testid}-checkAllButton`}
            sx={{
              borderRadius: 999,
              padding: '6px 14px',
              color: '#000',
              '&:hover': {
                backgroundColor: '#00000008',
              },
            }}>
            {checkallButton === 'Check All' ? 'Check All' : 'Uncheck All'}
          </Button>
        </div>
      </Container>
    </div>
  );
}
