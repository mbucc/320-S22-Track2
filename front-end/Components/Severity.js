import React from 'react'

export default function Severity(props) {

    const labelStyle= {
        marginRight: "10px"
    }

    const errorOnChange = ()=> { props.setCheckboxes((checkbox) =>{return {...checkbox, error: !checkbox.error} })}
    const warningOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, warning: !checkbox.warning} })}
    const infoOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, info: !checkbox.info} })}
    const successOnChange = ()=> {props.setCheckboxes((checkbox) =>{return {...checkbox, success: !checkbox.success} })}

  return (
    <div>
         <h5> Severity:</h5>
            <label style={labelStyle}>
                Error
                <input type="checkbox" name="Error" checked={props.checkboxes.error} onChange={errorOnChange} />
            </label>
            <label style={labelStyle}>
                Warning
                <input type="checkbox" name="Warning" checked={props.checkboxes.warning} onChange={warningOnChange} />
            </label>
            <label style={labelStyle}>
                Info
                <input type="checkbox" name="Info" checked={props.checkboxes.info} onChange={infoOnChange} />
            </label>
            <label style={labelStyle}>
                Success
                <input type="checkbox" name="Success" checked={props.checkboxes.success} onChange={successOnChange}/>
            </label>
    </div>
  )
}
