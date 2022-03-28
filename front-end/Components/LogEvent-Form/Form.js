import React, {useState} from 'react'
import Dropdowns from './Dropdowns'
import { Button, Typography } from '@mui/material'
import FormDates from './FormDates.js'
import FormCheckbox from './FormCheckbox.js'
import moment from 'moment'


export default function Form(props) {
    const [severityCheckboxes, setSeverityCheckboxes] = useState({"Error": false, "Warning":false, "Info": false, "Success": false})
    const [priorityCheckboxes, setPriorityCheckboxes] = useState({"Low": false, "Medium":false, "High": false})
    const [categoryCheckboxes, setCategoryCheckboxes] = useState({"Heartbeat": false, "Stop": false, "Status": false, "Security": false, "Start": false})
    const [dropdownValues, setDropdownValues] = useState({"EAI Domain": "All", "Application": "All", "Process/Service": "All", "Business Domain": "All", "Business SubDomain": "All"})
    const [fromToDates, setFromToDates] = useState({"From": "2022-01-01", "To": "2022-01-31"})

    /* options for dropdown fields. Will eventually be queries to the database */
    const EAIOptions = ["EAI Domain 1", "EAI Domain 2", "EAI Domain 3", "EAI Domain 4"]
    const applicationOptions = ["CRM"]
    const processServiceOptions = ["Update Costumer"]
    const BusinessDomainOptions = ["Business Domain 1", "Business Domain 2"]
    const BusinessSubDomOptions = ["Business SubDomain 1", "Business SubDomain 2"]

    const formStyle = {
        marginTop:  "20px",
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

        const compareDate = moment(e["Created Date"]);
        const startDate = moment(fromToDates["From"]);
        const endDate = moment(fromToDates["To"]);
        const dateFilter = compareDate.isBetween(startDate, endDate, undefined, '[]') // '[]' means inclusive on the left and right

        let severityFilter = objKeys.includes(e.severity)
        let priorityFilter = objKeys.includes(e.priority)
        let categoryFilter = objKeys.includes(e.category)
        let domainFilter = dropdownValues["EAI Domain"] === "All" ? true : e["EAI Domain"] === dropdownValues["EAI Domain"]
        let applicationFilter = dropdownValues["Application"] === "All" ? true : e["Application"] === dropdownValues["Application"]
        let processServiceFilter = dropdownValues["Process/Service"] === "All" ? true : e["Process/Service"] === dropdownValues["Process/Service"]
        let BDFilter = dropdownValues["Business Domain"] === "All"? true : e["Business Domain"] === dropdownValues["Business Domain"]
        let BSDFilter = dropdownValues["Business SubDomain"] === "All"? true : e["Business SubDomain"] === dropdownValues["Business SubDomain"]

        return dateFilter && severityFilter && priorityFilter && domainFilter && applicationFilter && processServiceFilter && BDFilter && BSDFilter && categoryFilter
    }

    const applyHandler = (event)=> {
        event.preventDefault()
         let severityKeys = Object.keys(severityCheckboxes).filter((e) => severityCheckboxes[e])
         let priorityKeys = Object.keys(priorityCheckboxes).filter((e)=> priorityCheckboxes[e])
         let categoryKeys = Object.keys(categoryCheckboxes).filter((e)=> categoryCheckboxes[e])
         let objKeys = severityKeys.concat(priorityKeys).concat(categoryKeys)

        let filteredData = props.mockData.filter((e) => filterData(e, objKeys))
        
        props.setData(filteredData)
    }

  return (
    <div>
        <Typography variant = "h6">
            Filters
        </Typography>
        <form style={formStyle} onSubmit={applyHandler}>
            <FormDates name="From / To Dates" fromToDates={fromToDates} setFromToDates={setFromToDates} />
            <FormCheckbox name="Severity" checkboxes={severityCheckboxes} setCheckboxes={setSeverityCheckboxes} />
            <FormCheckbox name="Priority" checkboxes={priorityCheckboxes} setCheckboxes={setPriorityCheckboxes} />
            <FormCheckbox name="Category" checkboxes={categoryCheckboxes} setCheckboxes={setCategoryCheckboxes} />
            <div style = {dropdownStyle}>
                <Dropdowns options={EAIOptions} setOptions={setDropdownValues} name={"EAI Domain"} ></Dropdowns>
                <Dropdowns options={applicationOptions} setOptions={setDropdownValues} name={"Application"} ></Dropdowns>
                <Dropdowns options={processServiceOptions} setOptions={setDropdownValues} name={"Process/Service"} ></Dropdowns>
                <Dropdowns options={BusinessDomainOptions} setOptions={setDropdownValues} name={"Business Domain"} ></Dropdowns>
                <Dropdowns options={BusinessSubDomOptions} setOptions={setDropdownValues} name={"Business SubDomain"} ></Dropdowns>
            </div>
            <Button type="submit" style = {buttonStyle}>Apply</Button>
            <br />
        </form>
    </div>
  )
}
