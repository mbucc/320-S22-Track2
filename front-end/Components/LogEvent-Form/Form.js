import React, {useEffect, useState, useRef} from 'react';
import {Button, Typography} from '@mui/material';
import FormCheckbox from './FormCheckbox.js';
import moment from 'moment';
import {BPDomainSelector} from '../business-process/common/domain-selector';
import {BPDatePicker} from '../business-process/common/date-picker';

/**
 *
 * @param {*} props state and setState for data, as well as possible filters for
 * @return {JSX.Element}
 */
export default function Form(props) {
  const initSeverityCheckboxes = {
    'Error': false,
    'Warning': false,
    'Info': false,
    'Success': false,
  };

  const initPriorityCheckboxes = {
    'Low': false,
    'Medium': false,
    'High': false,
  };

  const initCategoryCheckboxes = {
    'Heartbeat': false,
    'Stop': false,
    'Status': false,
    'Security': false,
    'Start': false,
  };

  if (props.logEventFilters?.type && props.logEventFilters?.type === 'severity') {
    switch (props.logEventFilters?.severity) {
      case ('Logs'):
        // We want to show all logs. check everything
        Object.keys(initSeverityCheckboxes).forEach((e)=>{
          initSeverityCheckboxes[e] = true;
        });
        Object.keys(initPriorityCheckboxes).forEach((e)=>{
          initPriorityCheckboxes[e] = true;
        });
        Object.keys(initCategoryCheckboxes).forEach((e)=>{
          initCategoryCheckboxes[e] = true;
        });
        break;
      case ('Errors'):
        initSeverityCheckboxes['Error'] = true;
        Object.keys(initPriorityCheckboxes).forEach((e)=>{
          initPriorityCheckboxes[e] = true;
        });
        Object.keys(initCategoryCheckboxes).forEach((e)=>{
          initCategoryCheckboxes[e] = true;
        });
        break;
      case ('Warnings'):
        initSeverityCheckboxes['Warning'] = true;
        Object.keys(initPriorityCheckboxes).forEach((e)=>{
          initPriorityCheckboxes[e] = true;
        });
        Object.keys(initCategoryCheckboxes).forEach((e)=>{
          initCategoryCheckboxes[e] = true;
        });
        break;
    }
  }


  const [severityCheckboxes, setSeverityCheckboxes] = useState(initSeverityCheckboxes);
  const [priorityCheckboxes, setPriorityCheckboxes] = useState(initPriorityCheckboxes);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState(initCategoryCheckboxes);
  const [dropdownValues, setDropdownValues] = useState({'EAI Domain': ['All'], 'Application': ['All'], 'Process/Service': ['All'], 'Business Domain': ['All'], 'Business SubDomain': ['All']});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [fromDateError, setFromDateError] = useState(null);
  const [toDateError, setToDateError] = useState(null);

  const applyButtonRef = useRef(null);

  /* options for dropdown fields. Will eventually be queries to the database */
  const EAIOptions = ['EAI Domain 1', 'EAI Domain 2', 'EAI Domain 3', 'EAI Domain 4'];
  const applicationOptions = ['CRM'];
  const processServiceOptions = ['Update Customer'];
  const BusinessDomainOptions = ['Business Domain 1', 'Business Domain 2'];
  const BusinessSubDomOptions = ['Business SubDomain 1', 'Business SubDomain 2'];

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


  useEffect(async () => {
    const ss = window.sessionStorage;
    if (ss.getItem('isLogDetail')) {
      await setSeverityCheckboxes(JSON.parse(ss.getItem('severityCheckboxes')));
      await setPriorityCheckboxes(JSON.parse(ss.getItem('priorityCheckboxes')));
      await setCategoryCheckboxes(JSON.parse(ss.getItem('categoryCheckboxes')));
      await setDropdownValues(JSON.parse(ss.getItem('dropdownValues')));
      await setFromDate(JSON.parse(ss.getItem('fromDate')));
      await setToDate(JSON.parse(ss.getItem('toDate')));
      ss.removeItem('severityCheckboxes');
      ss.removeItem('priorityCheckboxes');
      ss.removeItem('categoryCheckboxes');
      ss.removeItem('dropdownValues');
      ss.removeItem('isLogDetail');
      ss.removeItem('fromDate');
      ss.removeItem('toDate');

      applyButtonRef.current.click();
    }
  }, []);

  const saveForm = () => {
    const ss = window.sessionStorage;
    ss.setItem('severityCheckboxes', JSON.stringify(severityCheckboxes));
    ss.setItem('priorityCheckboxes', JSON.stringify(priorityCheckboxes));
    ss.setItem('categoryCheckboxes', JSON.stringify(categoryCheckboxes));
    ss.setItem('dropdownValues', JSON.stringify(dropdownValues));
    ss.setItem('fromDate', JSON.stringify(fromDate));
    ss.setItem('toDate', JSON.stringify(toDate));
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

  const applyHandler = (event) => {
    event.preventDefault();
    console.log(fromDate);
    if (!fromDate) {
      setFromDateError('Please enter a date.');
    }
    console.log(toDate);
    if (!toDate) {
      setToDateError('Please enter a date.');
    }

    if (fromDate && toDate && fromDate > toDate) {
      setToDateError('To date must be later than from date.');
    }
    if (fromDate && fromDate > new Date()) {
      setFromDateError('From date must be in the past.');
    }

    const severityKeys = Object.keys(severityCheckboxes).filter((e) => severityCheckboxes[e]);
    const priorityKeys = Object.keys(priorityCheckboxes).filter((e) => priorityCheckboxes[e]);
    const categoryKeys = Object.keys(categoryCheckboxes).filter((e) => categoryCheckboxes[e]);
    const objKeys = severityKeys.concat(priorityKeys).concat(categoryKeys);
    const filteredData = props.mockData.filter((e) => filterData(e, objKeys));

    filteredData = filteredData.sort(dateComparison('gt'));
    props.setData(filteredData);
  };

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
      <form style={formStyle} onSubmit={applyHandler}>
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
            <BPDomainSelector label = {'EAI Domain'} searchPlaceholder = {'Select options'} list = {EAIOptions} onChange = {changeOptions('EAI Domain')} id = {'dropdown-eai'}/>
            <BPDomainSelector label = {'Application'} searchPlaceholder = {'Select options'} list = {applicationOptions} onChange = {changeOptions('Application')} id = {'dropdown-app'}/>
            <BPDomainSelector label = {'Process/Service'} searchPlaceholder = {'Select options'} list = {processServiceOptions} onChange = {changeOptions('Process/Service')} id = {'dropdown-ps'}/>
            <BPDomainSelector label = {'Business Domain'} searchPlaceholder = {'Select options'} list = {BusinessDomainOptions} onChange = {changeOptions('Business Domain')} id = {'dropdown-bd'}/>
            <BPDomainSelector label = {'Business SubDomain'} searchPlaceholder = {'Select options'} list = {BusinessSubDomOptions} onChange = {changeOptions('Business SubDomain')} id = {'dropdown-bsd'}/>
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
          onClick={saveForm}
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
