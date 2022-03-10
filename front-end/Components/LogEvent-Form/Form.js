import React, {useState} from 'react'
import Severity from './Severity.js'
import Dropdowns from './Dropdowns'

export default function Form(props) {
    const [severityCheckboxes, setSeverityCheckboxes] = useState({"error": false, "warning":false, "info": false, "success": false})

    const [domains, setDomains] = useState({"EAI Domain": "All"})

    const EAIOptions = ["EAI Domain 1", "EAI Domain 2", "EAI Domain 3", "EAI Domain 4"]

    const formStyle = {
        marginTop:  "50px"
    }
    
    const filterData = (e, objKeys)=>{
        let severityFilter = objKeys.includes(e.severity)
        let DomainFilter = domains["EAI Domain"] === "All" ? true : e["EAI Domain"] === domains["EAI Domain"]
        
        return severityFilter && DomainFilter
    }

    const applyHandler = (event)=> {
        event.preventDefault()
        let objKeys = Object.keys(severityCheckboxes).filter((e)=> severityCheckboxes[e])
        let filteredData = props.mockData.filter((e) => filterData(e, objKeys))
        
        props.setData(filteredData)
    }

  return (
    <div>
        <form style={formStyle} onSubmit={applyHandler}>
            <Severity checkboxes={severityCheckboxes} setCheckboxes={setSeverityCheckboxes} />
            <Dropdowns options={EAIOptions} setDomains={setDomains} name={"EAI Domain"} ></Dropdowns>
            <br />
            <input type="submit" value="Apply"/>
        </form>
    </div>
  )
}
