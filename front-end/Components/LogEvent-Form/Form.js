import React, {useEffect, useState, useRef} from 'react';
import {Button, Typography} from '@mui/material';
import FormCheckbox from './FormCheckbox.js';
import moment from 'moment';
import {BPDomainSelector} from '../business-process/common/domain-selector';
import {BPDatePicker} from '../business-process/common/date-picker';
import axios from 'axios';

/**
 *
 * @param {*} props state and setState for data
 * @return {JSX.Element}
 */
export default function Form(props) {
  const [severityCheckboxes, setSeverityCheckboxes] = useState({'error': false, 'warning': false, 'info': false, 'success': false});
  const [priorityCheckboxes, setPriorityCheckboxes] = useState({'low': false, 'medium': false, 'high': false});
  const [categoryCheckboxes, setCategoryCheckboxes] = useState({ "ReportUpdate": false, "ReportPersisted": false, "ReportFail": false});
  const [dropdownValues, setDropdownValues] = useState({'EAI Domain': ['All'], 'Application': ['All'], 'Process/Service': ['All'], 'Business Domain': ['All'], 'Business SubDomain': ['All']});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromToDates, setFromToDates] = useState({'From': '2022-01-01 00:00:00', 'To': '2022-01-31 00:00:00'});

  const [fromDateError, setFromDateError] = useState(null);
  const [toDateError, setToDateError] = useState(null);
  const applyButtonRef = useRef(null);

  const formStyle = {
    width: '1600px',
    marginTop: '20px',
    marginLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
  };

  const filtersStyle = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
  };

  const dropdownStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

  };

  const checkboxesStyle = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
  };

  const datesStyle = {
    paddingBottom: '5px',
    marginRight: '5px',
    width: '400px',
  };

  {/* returns true if a given piece of data in the grid has properties specified by current filters */}
  const filterData = (e, objKeys) => {
    // Date filters
    const compareDate = moment(e['Created Date']);
    const startDate = moment(fromDate);
    const endDate = moment(toDate);
    const dateFilter = compareDate.isBetween(startDate, endDate, undefined, '[]'); // '[]' means inclusive on the left and right

    // Checkbox filters
    const severityFilter = objKeys.includes(e.severity);
    const priorityFilter = objKeys.includes(e.priority);
    const categoryFilter = objKeys.includes(e.category);

    // Dropdowwn filters
    const domainFilter = dropdownValues['EAI Domain'].includes('All') ? true : dropdownValues['EAI Domain'].includes(e['EAI Domain']);
    const applicationFilter = dropdownValues['Application'].includes('All') ? true : dropdownValues['Application'].includes(e['Application']);
    const processServiceFilter = dropdownValues['Process/Service'].includes('All') ? true : dropdownValues['Process/Service'].includes(e['Process/Service']);
    const BDFilter = dropdownValues['Business Domain'].includes('All') ? true : dropdownValues['Business Domain'].includes(e['Business Domain']);
    const BSDFilter = dropdownValues['Business SubDomain'].includes('All') ? true : dropdownValues['Business SubDomain'].includes(e['Business SubDomain']);

    return dateFilter && severityFilter && priorityFilter && domainFilter && applicationFilter && processServiceFilter && BDFilter && BSDFilter && categoryFilter;
  };

  const applyHandler = async (event)=>{
    event.preventDefault();
    let API_PARAMS = []

    const startDate = `startTime=${moment(fromDate).format("YYYY-MM-DD HH:mm:ss")}`;
    const endDate = `endTime=${moment(toDate).format("YYYY-MM-DD HH:mm:ss")}`;
    API_PARAMS.push(startDate);
    API_PARAMS.push(endDate);
    console.log(startDate)

    const severityURL = `severities=${Object.keys(severityCheckboxes).filter((e) => severityCheckboxes[e]).toString()}`;
    const priorityURL = `priorities=${Object.keys(priorityCheckboxes).filter((e) => priorityCheckboxes[e]).toString()}`;
    const categoryURL = `categories=${Object.keys(categoryCheckboxes).filter((e) => categoryCheckboxes[e]).toString()}`;
    severityURL === 'severities='? null: API_PARAMS.push(severityURL)
    priorityURL === 'priorities='? null: API_PARAMS.push(priorityURL);
    categoryURL === 'categories='? null : API_PARAMS.push(categoryURL)

    const EaiURL = dropdownValues["EAI Domain"].includes("All") ? "" : `eaiDomain=${dropdownValues["EAI Domain"].toString()}`
    const applicationURL = dropdownValues['Application'].includes('All') ? '' : `application=${dropdownValues['Application'].toString()}`;
    const processServiceURL = dropdownValues['Process/Service'].includes('All') ? '' : `process=${dropdownValues['Process/Service'].toString()}`;
    const BDURL = dropdownValues['Business Domain'].includes('All') ? "" : `businessDomain=${dropdownValues['Business Domain'].toString()}`;
    const BSDURL = dropdownValues['Business SubDomain'].includes('All') ? "" : `businessSubDomain=${dropdownValues['Business SubDomain'].toString()}`;
    EaiURL === ''? null : API_PARAMS.push(EaiURL);
    applicationURL === ''? null : API_PARAMS.push(applicationURL);
    processServiceURL === ''? null : API_PARAMS.push(processServiceURL);
    BDURL === ''? null : API_PARAMS.push(BDURL);
    BSDURL === ''? null : API_PARAMS.push(BSDURL)

    const API_URL = `http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/logEvents?${API_PARAMS.join('&')}`
    console.log(API_URL);
    const res = await axios.get(API_URL)

    const data = res.data
    props.setData(data)

  }
  // const applyHandler = (event) => {
  //   event.preventDefault();

  //   if (!fromDate) {
  //     setFromDateError('Please enter a date.');
  //   }

  //   if (!toDate) {
  //     setToDateError('Please enter a date.');
  //   }

  //   if (fromDate && toDate && fromDate > toDate) {
  //     setToDateError('To date must be later than from date.');
  //   }
  //   if (fromDate && fromDate > new Date()) {
  //     setFromDateError('From date must be in the past.');
  //   }

  //   const severityKeys = Object.keys(severityCheckboxes).filter((e) => severityCheckboxes[e]);
  //   const priorityKeys = Object.keys(priorityCheckboxes).filter((e) => priorityCheckboxes[e]);
  //   const categoryKeys = Object.keys(categoryCheckboxes).filter((e) => categoryCheckboxes[e]);
  //   const objKeys = severityKeys.concat(priorityKeys).concat(categoryKeys);
  //   const filteredData = props.mockData.filter((e) => filterData(e, objKeys));

  //   filteredData = filteredData.sort(dateComparison('gt'));
  //   props.setData(filteredData);
  // };

  const changeOptions = (name)=>{
    return (list) => {
      list.length === 0 ? setDropdownValues({...dropdownValues, [name]: ['All']}) : setDropdownValues({...dropdownValues, [name]: list});
    };
  };


  const dateComparison = (comp)=>{
    return (a, b) =>{
      if (comp === 'lt') {
        return moment(a['Created Date']).format('MMDDYYYYHHmmss') - moment(b['Created Date']).format('MMDDYYYYHHmmss');
      }
      if (comp === 'gt') {
        return moment(b['Created Date']).format('MMDDYYYYHHmmss') - moment(a['Created Date']).format('MMDDYYYYHHmmss');
      }
    };
  };

  // side effects that handle wrongly inputted dates
  useEffect(() => {
    if (fromDate && fromDate > new Date()) {
      setFromDateError('From date must be in the past.');
    } else {
      setFromDateError(null);
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate && fromDate && toDate < fromDate) {
      console.log(toDate, fromDate);
      setToDateError('To date must be after from date.');
    } else {
      setToDateError(null);
    }
  }, [toDate, fromDate]);

  return (
    <div>
      <Typography variant="h6">
        Filters
      </Typography>
      <form style={formStyle}>
        <div style = {filtersStyle}>
          <div style = {datesStyle}>
            <BPDatePicker
              id = 'logevent-datepicker-fromdate'
              label = 'From Date'
              onChange = {(newDate)=>{
                setFromDate(newDate);
              }}
              error = {fromDateError}
            />
            <BPDatePicker
              id = 'logevent-datepicker-todate'
              label = 'To Date'
              onChange = {(newDate)=>{
                setToDate(newDate);
              }}
              baseDate = {fromDate}
              error = {toDateError}
            />
          </div>
          <div style={dropdownStyle}>
            {props.EAIOptions === null ? null : <BPDomainSelector label = {'EAI Domain'} searchPlaceholder = {'Select options'} list = {props.EAIOptions} onChange = {changeOptions('EAI Domain')} id = {'dropdown-eai'}/>}
            {props.applicationOptions === null ? null : <BPDomainSelector label = {'Application'} searchPlaceholder = {'Select options'} list = {props.applicationOptions} onChange = {changeOptions('Application')} id = {'dropdown-app'}/>}
            {props.processServiceOptions === null? null :<BPDomainSelector label = {'Process/Service'} searchPlaceholder = {'Select options'} list = {props.processServiceOptions} onChange = {changeOptions('Process/Service')} id = {'dropdown-ps'}/>}
            {props.BusinessDomainOptions === null ? null : <BPDomainSelector label = {'Business Domain'} searchPlaceholder = {'Select options'} list = {props.BusinessDomainOptions} onChange = {changeOptions('Business Domain')} id = {'dropdown-bd'}/>}
            {props.BusinessSubDomOptions === null ? null : <BPDomainSelector label = {'Business SubDomain'} searchPlaceholder = {'Select options'} list = {props.BusinessSubDomOptions} onChange = {changeOptions('Business SubDomain')} id = {'dropdown-bsd'}/>}
            {/* <Dropdowns options={applicationOptions} setOptions={setDropdownValues} dropdownValue={dropdownValues} name={'Application'} testid={'app'}></Dropdowns>
            <Dropdowns options={processServiceOptions} setOptions={setDropdownValues} dropdownValue={dropdownValues} name={'Process/Service'} testid={'ps'}></Dropdowns>
            <Dropdowns options={BusinessDomainOptions} setOptions={setDropdownValues} dropdownValue={dropdownValues} name={'Business Domain'} testid={'bd'}></Dropdowns>
            <Dropdowns options={BusinessSubDomOptions} setOptions={setDropdownValues} dropdownValue={dropdownValues} name={'Business SubDomain'} testid={'bsd'}></Dropdowns>*/}
          </div>
          <div style={checkboxesStyle}>
            <FormCheckbox name="Severity" checkboxes={severityCheckboxes} setCheckboxes={setSeverityCheckboxes} testid = {'severity'}/>
            <FormCheckbox name="Priority" checkboxes={priorityCheckboxes} setCheckboxes={setPriorityCheckboxes} testid = {'priority'}/>
            <FormCheckbox name="Category" checkboxes={categoryCheckboxes} setCheckboxes={setCategoryCheckboxes} testid = {'category'}/>
          </div>
        </div>
        <Button
          type="submit"
          onClick={applyHandler}
          ref={applyButtonRef}
          size={'small'}
          sx={{
            color: 'white',
            borderRadius: 999,
            backgroundColor: '#22c55e',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
            width: '100px',
            margin: '20px',
            alignSelf: 'start',
          }}>
          Apply
        </Button>
      </form>
    </div>
  );
}
