import React, {useState} from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function LogEvent() {
    const mockData  = [
        {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "start" },
        {"severity": "warning", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low", "category": "Status" },
        {"severity": "info", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high" , "category": "Heartbeat"},
        {"severity": "success", "Created Datnpm installe": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Security"},
        {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low" , "category": "Stop"},
        {"severity": "warning", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Status" },
        {"severity": "info", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "Security" },
        {"severity": "success", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail" , "priority": "low", "category": "Start"},
    ]

    const [data, setData] = useState( mockData)

    const [checkboxes, setCheckboxes] = useState({"error": false, "warning":false, "info": false, "success": false})
    
    const tableStyle = {
        marginTop: "80px",
    }
    const labelStyle ={
        marginRight: "10px"
    }
    const formStyle = {
        marginTop:  "50px"
    }

    const errorOnChange = ()=> { setCheckboxes((checkbox) =>{return {...checkbox, error: !checkbox.error} })}
    const warningOnChange = ()=> {setCheckboxes((checkbox) =>{return {...checkbox, warning: !checkbox.warning} })}
    const infoOnChange = ()=> {setCheckboxes((checkbox) =>{return {...checkbox, info: !checkbox.info} })}
    const successOnChange = ()=> {setCheckboxes((checkbox) =>{return {...checkbox, success: !checkbox.success} })}

    const applyHandler = (event)=> {
        event.preventDefault()
        let objKeys = Object.keys(checkboxes).filter((e)=> checkboxes[e])
        let filteredData = mockData.filter((e) => objKeys.includes(e.severity) )
        
        if (filteredData.length === 0){
            setData(mockData)
        }
        else{
            setData(filteredData)
        }
    }

  return (
    <div>
        <h1>Log Events</h1>
        <form style={formStyle} onSubmit={applyHandler}>
            <h5> Severity:</h5>
            <label style={labelStyle}>
                Error
                <input type="checkbox" name="Error" checked={checkboxes.error} onChange={errorOnChange} />
            </label>
            <label style={labelStyle}>
                Warning
                <input type="checkbox" name="Warning" checked={checkboxes.warning} onChange={warningOnChange} />
            </label>
            <label style={labelStyle}>
                Info
                <input type="checkbox" name="Info" checked={checkboxes.info} onChange={infoOnChange} />
            </label>
            <label style={labelStyle}>
                Success
                <input type="checkbox" name="Success" checked={checkboxes.success} onChange={successOnChange}/>
            </label>
            <br />
            <input type="submit" value="Apply"/>
        </form>
        <Table style={tableStyle}>
            <TableHead>
                <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Application</TableCell>
                    <TableCell>Process/Service</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Log Event</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((e, i)=>{
                    return(
                        <TableRow key = {i}>
                          <TableCell>{e.severity}</TableCell>
                          <TableCell>{e.priority}</TableCell>
                          <TableCell>{e.category}</TableCell>
                          <TableCell>{e["Created Date"]}</TableCell>
                          <TableCell>{e["Application"]}</TableCell>
                          <TableCell>{e["Process/Service"]}</TableCell>
                          <TableCell>{e["Activity"]}</TableCell>
                          <TableCell>{e["Log Event"]}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>


        </Table>
        
    </div>
  )
}
