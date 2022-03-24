import React from 'react'
import { Checkbox, FormGroup, FormControlLabel, InputLabel } from '@mui/material'
export default function Priority(props) {

    const labelStyle= {
        marginRight: "10px"
    }
    const checkboxFormStyle = {
        display: "inline-block",
    }

    const lowOnChange = ()=> { props.setCheckboxes((checkbox) =>{return {...checkbox, low: !checkbox.low} })};
    const mediumOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, medium: !checkbox.medium} })};
    const highOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, high: !checkbox.high} })};

  return (
    <div >
        <FormGroup style = {checkboxFormStyle}>
            <InputLabel> Priority</InputLabel>
            <FormControlLabel control={<Checkbox checked={props.checkboxes.low} onChange={lowOnChange} />} label="Low" />
            <FormControlLabel control={<Checkbox checked={props.checkboxes.medium} onChange={mediumOnChange} />} label="Medium" />
            <FormControlLabel control={<Checkbox checked={props.checkboxes.high} onChange={highOnChange} />} label="High" />
        </FormGroup>
    </div>
  )
}