import React, {useState} from 'react'
import Severity from './Severity.js'
import Dropdowns from './Dropdowns'
import { Button } from '@mui/material'

export default function Form(props) {
    const [severityCheckboxes, setSeverityCheckboxes] = useState({"error": false, "warning":false, "info": false, "success": false})

    const [domains, setDomains] = useState({"EAI Domain": "All"})

    const [applications, setApplications] = useState({"Application": "All"})

    const [processServices, setProcessServices] = useState({"Process/Service": "All"})

    {/* options for dropdown fields. Will eventually be queries to the database */}
    const EAIOptions = ["EAI Domain 1", "EAI Domain 2", "EAI Domain 3", "EAI Domain 4"]
    const applicationOptions = ["CRM"]
    const processServiceOptions = ["Update Costumer"]

    const formStyle = {
        marginTop:  "50px",
        marginLeft: "20px", 
        display: "flex",
        flexDirection: "column"
    }

    const dropdownStyle = {
        display: "flex",
        flexDirection: "row"
    }   

    const buttonStyle = {
        marginTop: "20px",
        width: "100px",
        border: "solid"
    }
    
    {/* returns true if a given piece of data in the grid has properties specified by current filters */}
    const filterData = (e, objKeys)=>{
        let severityFilter = objKeys.includes(e.severity)
        let domainFilter = domains["EAI Domain"] === "All" ? true : e["EAI Domain"] === domains["EAI Domain"]
        let applicationFilter = applications["Application"] === "All" ? true : e["Application"] === applications["Application"]
        let processServiceFilter = processServices["Process/Service"] === "All" ? true : e["Process/Service"] === processServices["Process/Service"]
        return severityFilter && domainFilter && applicationFilter && processServiceFilter
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
            <div style = {dropdownStyle}>
                <Dropdowns options={EAIOptions} setOptions={setDomains} name={"EAI Domain"} ></Dropdowns>
                <Dropdowns options={applicationOptions} setOptions={setApplications} name={"Application"} ></Dropdowns>
                <Dropdowns options={processServiceOptions} setOptions={setProcessServices} name={"Process/Service"} ></Dropdowns>
            </div>
            <Button type="submit" style = {buttonStyle}>Apply</Button>
        </form>
    </div>
  )
}
