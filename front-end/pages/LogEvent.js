import React, {useState} from 'react'
import Form from "../Components/LogEvent-Form/Form.js"
import LETable from '../Components/LogEvent-Form/LETable.js';
import Header from '../Components/LogEvent-Form/Header.js';
import { Container } from '@mui/material';

export default function LogEvent() {
    /* just some code to generate a big set of mock data */
    const mockData  = [];

    const formContainerStyle = {
      border: "thin solid lightgray",
      margin: "20px", 
      padding: "20px",
      width: "fit-content"
    }
    for(let i = 0; i < 1000; i++){
      let severity = "N/A", date = `1/${i%30}/${2022 + (Math.floor(i / 2022))}`, ps = "Update Costumer", app = "CRM", activity = "Activity", priority = "N/A", category = "N/A", eai = "N/A", BD = "N/A", BSD = "N/A";
      switch(i%4){
        case(0): category = "heartbeat"; break;
        case(1): category = "stop"; break;
        case(2): category = "status"; break;
        case(3): category = "security"; break;
        case(4): category = "start"; break;
      };
      switch(i%4){
        case(0): severity = "Error"; eai = "EAI Domain 1"; BD = "Business Domain 1"; BSD = "Business SubDomain 1"; break;
        case(1): severity = "Warning"; eai = "EAI Domain 2"; BD = "Business Domain 2"; BSD = "Business SubDomain 2"; break;
        case(2): severity = "Info"; eai = "EAI Domain 3"; BD = "Business Domain 1"; BSD = "Business SubDomain 1"; break;
        case(3): severity = "Success"; eai = "EAI Domain 4"; BD = "Business Domain 2"; BSD = "Business SubDomain 2"; break;
      };
      switch(i%3){
        case(0): priority = "high"; break;
        case(1): priority = "medium"; break;
        case(2): priority = "low"; break;
      };
      mockData.push({
        "severity": severity,
        "Created Date": date,
        "Process/Service": ps,
        "Application": app,
        "Activity": activity,
        "Log Event": "detail",
        "priority": priority,
        "category": category,
        "EAI Domain": eai,
        "Business Domain": BD,
        "Business SubDomain": BSD
      });
    };
        {/*{"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "start", "EAI Domain": "EAI Domain 1" },
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
        {"severity": "success", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail" , "priority": "low", "category": "Start", "EAI Domain": "EAI Domain 2"},*/}
      

    const [data, setData] = useState(mockData)

  return (
    <div>
        <Header /> 
        <Container style = {formContainerStyle}>
          <Form mockData={mockData} setData={setData}/>
        </Container> 
        <Container style = {formContainerStyle}>
          <LETable data = {data}/>
        </Container>
        
    </div>
  )
}
