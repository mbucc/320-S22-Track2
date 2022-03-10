import React, {useState} from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Form from "../Components/Form.js"

export default function LogEvent() {
    const mockData  = [
        {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "start" },
        {"severity": "warning", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low", "category": "Status" },
        {"severity": "info", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high" , "category": "Heartbeat"},
        {"severity": "success", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Security"},
        {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low" , "category": "Stop"},
        {"severity": "warning", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Status" },
        {"severity": "info", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "Security" },
        {"severity": "success", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail" , "priority": "low", "category": "Start"},
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
