import React, {useState} from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Form from "../Components/LogEvent-Form/Form.js"

export default function LogEvent() {
    const mockData  = [
        {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "start", "EAI Domain": "EAI Domain 1" },
        {"severity": "warning", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low", "category": "Status", "EAI Domain": "EAI Domain 3" },
        {"severity": "info", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high" , "category": "Heartbeat", "EAI Domain": "EAI Domain 4"},
        {"severity": "success", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Security", "EAI Domain": "EAI Domain 2"},
        {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low" , "category": "Stop", "EAI Domain": "EAI Domain 3"},
        {"severity": "warning", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Status", "EAI Domain": "EAI Domain 1" },
        {"severity": "info", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "Security", "EAI Domain": "EAI Domain 1" },
        {"severity": "success", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail" , "priority": "low", "category": "Start", "EAI Domain": "EAI Domain 2"},
    ]

    const [data, setData] = useState(mockData)
    
    const tableStyle = {
        marginTop: "80px"
    }

  return (
    <div>
        <h1>Log Events</h1>
        <Form mockData={mockData} setData={setData}/>
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
                    <TableCell>EAI Domain</TableCell>
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
                          <TableCell>{e["EAI Domain"]}</TableCell>
                          <TableCell>{e["Log Event"]}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>


        </Table>
        
    </div>
  )
}
