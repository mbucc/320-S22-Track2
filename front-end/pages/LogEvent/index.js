import React, {useState, useEffect} from 'react';
import Form from '../../components/LogEvent-Form/Form.js';
import LETable from '../../components/LogEvent-Form/LETable.js';
import {Container} from '@mui/material';
import axios from 'axios';
/**
 * @param {object} props filters passed from the dashboard.
 * @return {JSX.Element}
 */
function LogEvent(props) {
  /* states for the dropdown options and the loading state */
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
