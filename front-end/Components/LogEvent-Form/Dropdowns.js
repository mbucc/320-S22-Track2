import React, {useState} from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'

export default function Domain(props) {

  const [dropdownValue, setDropdownValue] = useState("All")

  const dropdownStyle = {
      marginTop: "80px"
  }

  const handleOnChange = (event)=>{
    setDropdownValue(event.target.value)
    props.setDomains((domain)=>{ return {...domain, [props.name]: event.target.value}});
  }

  return (
    <div style={dropdownStyle}>
        <FormControl size="medium">
            <InputLabel> EAI Domain </InputLabel>
            <Select value={dropdownValue} onChange={handleOnChange} >
                <MenuItem value={"All"}> {"All"}</MenuItem>
               {props.options.map((e, i)=>{
                   return (
                        <MenuItem key={i} value={e}> {e}</MenuItem>
                   )
               })}
            </Select>
        </FormControl>

    </div>
  )
}
