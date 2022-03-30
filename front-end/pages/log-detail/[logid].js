import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';


export default function LogDetail() {
  const router = useRouter()
  const logID = router.query.logid  

  const [data, setData] = useState(null)
  let mockData = []

  useEffect(()=>{
    for(let i = 0; i < 1000; i++){
        let severity = "N/A", date = `1/${(i%30) + 1}/${2022 + (Math.floor(i / 2022))} 0${i%10}:00:00`, ps = "Update Costumer", app = "CRM", activity = "Activity", priority = "N/A", category = "N/A", eai = "N/A", BD = "", BSD = "";
        switch(i%5){
          case(0): category = "Heartbeat"; break;
          case(1): category = "Stop"; break;
          case(2): category = "Status"; break;
          case(3): category = "Security"; break;
          case(4): category = "Start"; break;
        };
        switch(i%4){
          case(0): severity = "Error"; eai = "EAI Domain 1"; BD = "Business Domain 1"; BSD = "Business SubDomain 1"; break;
          case(1): severity = "Warning"; eai = "EAI Domain 2"; BD = "Business Domain 2"; BSD = "Business SubDomain 2"; break;
          case(2): severity = "Info"; eai = "EAI Domain 3"; BD = "Business Domain 1"; BSD = "Business SubDomain 1"; break;
          case(3): severity = "Success"; eai = "EAI Domain 4"; BD = "Business Domain 2"; BSD = "Business SubDomain 2"; break;
        };
        switch(i%3){
          case(0): priority = "High"; break;
          case(1): priority = "Medium"; break;
          case(2): priority = "Low"; break;
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
          "Business SubDomain": BSD,
          "id": i
        });
      }

      setData(mockData[logID])
      console.log(data)
      
  }, [])
  console.log(logID)

  return (
      <>
        <h1>Log Event ID: {logID}</h1>
        {data === null ? (<h3> loading... </h3>) : 
            (<div>
                <h4>Severity: {data['severity']}</h4>
                <h4>Created Date: {data['Created Date']}</h4>
                <h4>Process/Service: {data['Process/Service']}</h4>
                <h4>Application: {data["Application"]}</h4>
                <h4>Activity: {data["Activity"]}</h4>
                <h4>Log Event {data["Log Event"]}</h4>
                <h4>Priority {data["priority"]}</h4>
                <h4>Category {data["category"]}</h4>
                <h4>EAI Domain {data["EAI Domain"]}</h4>
                <h4>Business Domain {data["Business Domain"]}</h4>
                <h4>Business SubDomain {data["Business SubDomain"]}</h4>
            </div>
            )
        }


      </>
  )
}
