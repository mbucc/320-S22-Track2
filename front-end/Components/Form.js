import React, {useState} from 'react'
import Severity from './Severity.js'

export default function Form(props) {
    const [severityCheckboxes, setSeverityCheckboxes] = useState({"error": false, "warning":false, "info": false, "success": false})

    const formStyle = {
        marginTop:  "50px"
    }

    const applyHandler = (event)=> {
        event.preventDefault()
        let objKeys = Object.keys(severityCheckboxes).filter((e)=> severityCheckboxes[e])
        let filteredData = props.mockData.filter((e) => objKeys.includes(e.severity))
        
        if (filteredData.length === 0){
            props.setData(props.mockData)
        }
        else{
            props.setData(filteredData)
        }
    }

  return (
    <div>
        <form style={formStyle} onSubmit={applyHandler}>
            <Severity checkboxes={severityCheckboxes} setCheckboxes={setSeverityCheckboxes} />
            <br />
            <input type="submit" value="Apply"/>
        </form>
    </div>
  )
}
