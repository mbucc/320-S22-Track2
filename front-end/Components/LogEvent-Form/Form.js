import React, {useEffect, useState, useRef} from 'react';
import {Button, Typography} from '@mui/material';
import moment from 'moment';
import {BPDomainSelector} from '../business-process/common/domain-selector';
import {BPDatePicker} from '../business-process/common/date-picker';
import {BPCheckboxGroup} from '../business-process/common/checkbox-group.js';
import {BPColors, BPStandards} from '../../utils/business-process/standards.js';

import axios from 'axios';

/**
 *
 * @param {*} props state and setState for data, as well as possible filters from dashboard
 * @return {JSX.Element}
 */
export default function Form(props) {
  const severityOptions = [
    {
      key: 'error',
      label: 'Error',
      color: BPColors.error,
    },
    {
      key: 'warning',
      label: 'Warning',
      color: BPColors.warning,
    },
    {
      key: 'info',
      label: 'Info',
      color: BPColors.info,
    },
    {
      key: 'success',
      label: 'Success',
      color: BPColors.success,
    },
  ];

  const priorityOptions = [
    {
      key: 'high',
      label: 'High',
      color: BPColors.error,
    },
    {
      key: 'medium',
      label: 'Medium',
      color: BPColors.warning,
    },
    {
      key: 'low',
      label: 'Low',
      color: '#D6C000',
    },
  ];

  const categoryOptions = [
    {
      key: 'reportupdate',
      label: 'ReportUpdate',
      color: BPColors.info,
    },
    {
      key: 'reportpersisted',
      label: 'ReportPersisted',
      color: BPColors.warning,
    },
    {
      key: 'reportfail',
      label: 'ReportFail',
      color: BPColors.error,
    },
  ];

  let initSeverityCheckboxes = ['success', 'info', 'warning', 'error'];

  const initPriorityCheckboxes = ['high', 'medium', 'low'];

  const initCategoryCheckboxes = ['reportupdate', 'reportpersisted', 'reportfail'];

  if (props.logEventFilters) {
    if (props.logEventFilters?.type && props.logEventFilters?.type === 'severity') {
      switch (props.logEventFilters?.severity) {
        case ('Logs'):
          // We want to show all logs. no change to checkboxes
          break;
        case ('Errors'):
          initSeverityCheckboxes = initSeverityCheckboxes.filter((e) => e === 'error');
          break;
        case ('Warnings'):
          initSeverityCheckboxes = initSeverityCheckboxes.filter((e) => e === 'warning');
          break;
      }
    }
  }

  /* states storing the currently selected inputs in the form. */
  const [severityCheckboxes, setSeverityCheckboxes] = useState(initSeverityCheckboxes);
  const [priorityCheckboxes, setPriorityCheckboxes] = useState(initPriorityCheckboxes);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState(initCategoryCheckboxes);
  const [dropdownValues, setDropdownValues] = useState({'EAI Domain': ['All'], 'Application': ['All'], 'Process/Service': ['All'], 'Business Domain': ['All'], 'Business SubDomain': ['All']});
  const [fromDate, setFromDate] = useState(props.logEventFilters?.start ? props.logEventFilters.start : null);
  const [toDate, setToDate] = useState(props.logEventFilters?.end ? props.logEventFilters.end : null);

  /* states for errors displayed by input fields */
  const [fromDateError, setFromDateError] = useState(null);
  const [toDateError, setToDateError] = useState(null);
  const [severityError, setSeverityError] = useState(null);
  const [priorityError, setPriorityError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  /* a ref for the apply button */
  const applyButtonRef = useRef(null);


  /* styles for various elements in the form */
  const formStyle = {
    width: 'inherit',
    marginTop: '20px',
    marginLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
  };

  const filtersStyle = {
    width: 'inherit',
    height: '400px',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: '0',
  };

  const dropdownStyle = {
    display: 'flex',
    width: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: '0',
  };

  const checkboxesStyle = {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: '0',
    marginLeft: '10px',
    marginTop: '7px',
  };

  const checkboxGroupStyle = {
  };

  const datesStyle = {
    flexShrink: '0',
    paddingBottom: '5px',
    marginRight: '5px',
    marginTop: '9px',
    width: '20%',
  };

  useEffect(()=>{
    if (props.logEventFilters) {
      // on render, if there are filters passed to this page, the corresponding initial filter states
      // would have taken care of that earlier, so apply filters.
      console.log(`from date: ${fromDate}`);
      console.log(`to date: ${toDate}`);
      console.log(`filters passed:`);
      console.log(props.logEventFilters);

      applyHandler(null);
    }
  }, []);

  const applyHandler = async (event)=>{
    if (event) {
      event.preventDefault();
    }
    if (!fromDate) {
      setFromDateError('Please enter a date.');
      return;
    }
    if (!toDate) {
      setToDateError('Please enter a date.');
      return;
    }

    props.setIsLoading(true);
    const API_PARAMS = [];

    const startDate = `startTime=${fromDate.format('YYYY-MM-DD HH:mm:ss')}`;
    const endDate = `endTime=${toDate.format('YYYY-MM-DD HH:mm:ss')}`;
    console.log(startDate);
    console.log(endDate);
    API_PARAMS.push(startDate);
    API_PARAMS.push(endDate);

    const severityURL = `severities=${severityCheckboxes.toString()}`;
    const priorityURL = `priorities=${priorityCheckboxes.toString()}`;
    const categoryURL = `categories=${categoryCheckboxes.toString()}`;
    severityURL === 'severities='? null: API_PARAMS.push(severityURL);
    priorityURL === 'priorities='? null: API_PARAMS.push(priorityURL);
    categoryURL === 'categories='? null : API_PARAMS.push(categoryURL);

    const EaiURL = dropdownValues['EAI Domain'].includes('All') ? '' : `eaiDomain=${dropdownValues['EAI Domain'].toString()}`;
    const applicationURL = dropdownValues['Application'].includes('All') ? '' : `application=${dropdownValues['Application'].toString()}`;
    const processServiceURL = dropdownValues['Process/Service'].includes('All') ? '' : `process=${dropdownValues['Process/Service'].toString()}`;
    const BDURL = dropdownValues['Business Domain'].includes('All') ? '' : `businessDomain=${dropdownValues['Business Domain'].toString()}`;
    const BSDURL = dropdownValues['Business SubDomain'].includes('All') ? '' : `businessSubDomain=${dropdownValues['Business SubDomain'].toString()}`;
    EaiURL === ''? null : API_PARAMS.push(EaiURL);
    applicationURL === ''? null : API_PARAMS.push(applicationURL);
    processServiceURL === ''? null : API_PARAMS.push(processServiceURL);
    BDURL === ''? null : API_PARAMS.push(BDURL);
    BSDURL === ''? null : API_PARAMS.push(BSDURL);

    const API_URL = `http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/logEvents?${API_PARAMS.join('&')}`;
    const res = await axios.get(API_URL);

    const data = res.data.sort(dateComparison('gt'));
    props.setData(data);
    props.setPage(0);
    props.setIsLoading(false);
  };
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
        return moment(a['creation_time']).format('MMDDYYYYHHmmss') - moment(b['creation_time']).format('MMDDYYYYHHmmss');
      }
      if (comp === 'gt') {
        return moment(b['creation_time']).format('MMDDYYYYHHmmss') - moment(a['creation_time']).format('MMDDYYYYHHmmss');
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
      <form style={formStyle}>
        <div style = {filtersStyle}>
          <div style = {datesStyle}>
            <BPDatePicker
              id = 'logevent-datepicker-fromdate'
              label = 'From Date'
              onChange = {(newDate)=>{
                setFromDate(moment(newDate));
              }}
              error = {fromDateError}
            />
            <BPDatePicker
              id = 'logevent-datepicker-todate'
              label = 'To Date'
              onChange = {(newDate)=>{
                setToDate(moment(newDate));
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
            <div style = {{height: '30%'}}>
              {/* logevent-severity-selector-option-{option.key} for checkbox testids */}
              <BPCheckboxGroup
                id = 'logevent-severity-selector'
                label = 'Severity'
                onChange = {(selection)=>{
                  setSeverityCheckboxes(selection);
                  if (selection.length === 0) {
                    setSeverityError('Please select at least one severity');
                  } else {
                    setSeverityError(null);
                  }
                }}
                options = {severityOptions}
                selected = {severityCheckboxes}
                boxStyle = {checkboxGroupStyle}
                error = {severityError}
              />
            </div>
            <div style = {{height: '25%'}}>
              {/* logevent-priority-selector-option-{option.key} for checkbox testids */}
              <BPCheckboxGroup
                id = 'logevent-priority-selector'
                label = 'Priority'
                onChange = {(selection)=>{
                  setPriorityCheckboxes(selection);
                  if (selection.length === 0) {
                    setPriorityError('Please select at least one priority');
                  } else {
                    setPriorityError(null);
                  }
                }}
                options = {priorityOptions}
                selected = {priorityCheckboxes}
                boxStyle = {checkboxGroupStyle}
                error = {priorityError}
              />
            </div>
            <div style = {{height: '30%'}}>
              {/* logevent-category-selector-option-{option.key} for checkbox testids */}
              <BPCheckboxGroup
                id = 'logevent-category-selector'
                label = 'Category'
                onChange = {(selection)=>{
                  setCategoryCheckboxes(selection);
                  if (selection.length === 0) {
                    setCategoryError('Please select at least one category');
                  } else {
                    setCategoryError(null);
                  }
                }}
                options = {categoryOptions}
                selected = {categoryCheckboxes}
                boxStyle = {checkboxGroupStyle}
                error = {categoryError}
              />
            </div>

          </div>
        </div>
        <Button
          onClick={applyHandler}
          data-testid='logevent-button-apply'
          ref={applyButtonRef}
          size={'small'}
          sx={{
            color: 'white',
            width: '100px',
            borderRadius: 999,
            p: '2.5px 6px 3.5px 6px',
            fontSize: '15px',
            fontWeight: '500',
            fontFamily: BPStandards.fontFamily,
            letterSpacing: '0.2px',
            textTransform: 'Initial',
            backgroundColor: '#22c55e',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
          }}>
          Apply
        </Button>
      </form>
    </div>
  );
}
