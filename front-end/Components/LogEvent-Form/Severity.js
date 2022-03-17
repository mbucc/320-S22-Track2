import React from 'react'
import { Checkbox, FormGroup, FormControlLabel, InputLabel } from '@mui/material'
export default function Severity(props) {

    const labelStyle= {
        marginRight: "10px"
    }
    const checkboxFormStyle = {
        display: "inline-block",
    }

    const errorOnChange = ()=> { props.setCheckboxes((checkbox) =>{return {...checkbox, error: !checkbox.error} })}
    const warningOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, warning: !checkbox.warning} })}
    const infoOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, info: !checkbox.info} })}
    const successOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, success: !checkbox.success} })}

  return (
    <div >
        <FormGroup style = {checkboxFormStyle}>
            <InputLabel> Severity</InputLabel>
            <FormControlLabel control={<Checkbox checked={props.checkboxes.error} onChange={errorOnChange} />} label="Error" />
            <FormControlLabel control={<Checkbox checked={props.checkboxes.warning} onChange={warningOnChange} />} label="Warning" />
            <FormControlLabel control={<Checkbox checked={props.checkboxes.info} onChange={infoOnChange} />} label="Info" />
            <FormControlLabel control={<Checkbox checked={props.checkboxes.success} onChange={successOnChange} />} label="Success" />
        </FormGroup>
    </div>
  )
}
