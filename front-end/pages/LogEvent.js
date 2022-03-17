import React, {useState} from 'react'
import Form from "../Components/LogEvent-Form/Form.js"
import LETable from '../Components/LogEvent-Form/LETable.js';
import { Typography } from '@mui/material';

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
        {"severity": "error", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "start", "EAI Domain": "EAI Domain 1" },
        {"severity": "warning", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low", "category": "Status", "EAI Domain": "EAI Domain 3" },
        {"severity": "info", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high" , "category": "Heartbeat", "EAI Domain": "EAI Domain 4"},
        {"severity": "success", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Security", "EAI Domain": "EAI Domain 2"},
        {"severity": "error", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "low" , "category": "Stop", "EAI Domain": "EAI Domain 3"},
        {"severity": "warning", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "medium", "category": "Status", "EAI Domain": "EAI Domain 1" },
        {"severity": "info", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "Security", "EAI Domain": "EAI Domain 1" },
        {"severity": "success", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail" , "priority": "low", "category": "Start", "EAI Domain": "EAI Domain 2"},
    ]

    const [data, setData] = useState(mockData)

  return (
    <div>
        <Typography variant = "h1" style = {{backgroundColor: "lightblue"}}>Log Events</Typography>
        <Form mockData={mockData} setData={setData}/>
        <LETable data = {data}/>
    </div>
  )
}
