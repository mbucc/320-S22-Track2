import React, {useState, useEffect} from 'react';
import Form from '../../Components/LogEvent-Form/Form.js';
import LETable from '../../Components/LogEvent-Form/LETable.js';
import {Container} from '@mui/material';
import moment from 'moment';
import axios from 'axios';
/**
 * @param {object} props filters passed from the dashboard.
 * @return {JSX.Element}
 */
function LogEvent(props) {
  /* just some code to generate a big set of mock data */
  const mockData = [];
  const [isLoading, setIsLoading] = useState(false);
  const [BusinessDomainOptions, setBusinessDomainOptions] = useState(null);
  const [BusinessSubDomOptions, setBusinessSubDomOptions] = useState(null);
  const [EAIOptions, setEAIOptions] = useState(null);
  const [applicationOptions, setApplicationOptions] = useState(null);
  const [processServiceOptions, setProcessServiceOptions] = useState(null);


  useEffect(async ()=>{
    const businessDomain = await axios.get('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessDomains');
    const subDomain = await axios.get('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessSubDomains');
    const eaiDomain = await axios.get('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/eaiDomains');
    const appOptions = await axios.get('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/applications');
    const processOptions = await axios.get('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/publishingBusinessDomains');
    setBusinessDomainOptions(businessDomain.data);
    setBusinessSubDomOptions(subDomain.data);
    setEAIOptions(eaiDomain.data);
    setApplicationOptions(appOptions.data);
    setProcessServiceOptions(processOptions.data);
  }, []);

  const formContainerStyle = {
    display: 'flex',
    border: 'thin solid lightgray',
    borderRadius: '4px',
    margin: '20px',
    padding: '20px',
    width: '100%',
  };

  const tableContainerStyle = {
    display: 'flex',
    margin: '20px',
    padding: '20px',
    width: '100%',
  };
  for (let i = 0; i < 1000; i++) {
    let severity = 'N/A'; const date = moment(`1/${(i%30) + 1}/${2022 + (Math.floor(i / 2022))} 0${i%24}:00:00`).format('MM-DD-YYYY HH:mm:ss'); const ps = 'Update Customer'; const app = 'CRM'; const activity = 'Activity'; let priority = 'N/A'; let category = 'N/A'; let eai = 'N/A'; let BD = ''; let BSD = '';
    switch (i%5) {
      case (0): category = 'Heartbeat'; break;
      case (1): category = 'Stop'; break;
      case (2): category = 'Status'; break;
      case (3): category = 'Security'; break;
      case (4): category = 'Start'; break;
    };
    switch (i%4) {
      case (0): severity = 'Error'; eai = 'EAI Domain 1'; BD = 'Business Domain 1'; BSD = 'Business SubDomain 1'; break;
      case (1): severity = 'Warning'; eai = 'EAI Domain 2'; BD = 'Business Domain 2'; BSD = 'Business SubDomain 2'; break;
      case (2): severity = 'Info'; eai = 'EAI Domain 3'; BD = 'Business Domain 1'; BSD = 'Business SubDomain 1'; break;
      case (3): severity = 'Success'; eai = 'EAI Domain 4'; BD = 'Business Domain 2'; BSD = 'Business SubDomain 2'; break;
    };
    switch (i%3) {
      case (0): priority = 'High'; break;
      case (1): priority = 'Medium'; break;
      case (2): priority = 'Low'; break;
    };
    mockData.push({
      'severity': severity,
      'Created Date': date,
      'Process/Service': ps,
      'Application': app,
      'Activity': activity,
      'Log Event': 'detail',
      'priority': priority,
      'category': category,
      'EAI Domain': eai,
      'Business Domain': BD,
      'Business SubDomain': BSD,
      'id': i,
    });
  };
  /* {"severity": "error", "Created Date": "3/2/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail", "priority": "high", "category": "start", "EAI Domain": "EAI Domain 1" },
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
        {"severity": "success", "Created Date": "3/10/2022", "Process/Service": "Update Costumer", "Application": "CRM", "Activity": "Activity", "Log Event": "Detail" , "priority": "low", "category": "Start", "EAI Domain": "EAI Domain 2"},*/


  /* states for the table */
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRPP] = useState(10);

  return (
    <div>
      <Container style = {formContainerStyle}>
        <Form
          setData={setData}
          BusinessDomainOptions={BusinessDomainOptions}
          BusinessSubDomOptions={BusinessSubDomOptions}
          EAIOptions={EAIOptions}
          applicationOptions={applicationOptions}
          processServiceOptions={processServiceOptions}
          setPage={setPage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          {...props}
        />
      </Container>
      <Container style = {tableContainerStyle}>
        <LETable
          data = {data}
          setData = {setData}
          page = {page}
          setPage = {setPage}
          rowsPerPage = {rowsPerPage}
          setRowsPerPage = {setRPP}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Container>
    </div>
  );
}

export default LogEvent;
