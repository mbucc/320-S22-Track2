import React from 'react'
import { Checkbox } from '@mui/material'

export default function FormCheckbox(props) {

    const labelStyle= {
      marginRight: "10px"
    }

    const handleOnChange = (event)=>{
        props.setCheckboxes((checkbox)=> {return {...checkbox, [event.target.name]: !checkbox[event.target.name]}})
    }

  return (
    <div>
         <h4> {props.name}:</h4>
         {Object.keys(props.checkboxes).map((e)=>{
           return(
             <label style={labelStyle} key={e}>
                 {e}
              <Checkbox name={e} onChange={handleOnChange} />
            </label>
          )
         })}
    </div>
  )
}
