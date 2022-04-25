import React, {useEffect, useState, useRef} from 'react';
import {Button, Typography} from '@mui/material';
import moment from 'moment';
import {BPDomainSelector} from '../business-process/common/domain-selector';
import {BPDatePicker} from '../business-process/common/date-picker';
import {BPCheckboxGroup} from '../business-process/common/checkbox-group.js';
import {BPColors, BPStandards} from '../../utils/business-process/standards.js';


/**
 *
 * @param {*} props state and setState for data, as well as possible filters for
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
      key: 'heartbeat',
      label: 'Heartbeat',
      color: BPColors.gray[400],
    },
    {
      key: 'stop',
      label: 'Stop',
      color: BPColors.gray[400],
    },
    {
      key: 'status',
      label: 'Status',
      color: BPColors.gray[400],
    },
    {
      key: 'security',
      label: 'Security',
      color: BPColors.gray[400],
    },
    {
      key: 'start',
      label: 'Start',
      color: BPColors.gray[400],
    },
  ];

  const initSeverityCheckboxes = ['success', 'info', 'warning', 'error'];

  const initPriorityCheckboxes = ['high', 'medium', 'low'];

  const initCategoryCheckboxes = ['heartbeat', 'status', 'security', 'start', 'stop'];

  /* states storing the currently selected inputs in the form. */
  const [severityCheckboxes, setSeverityCheckboxes] = useState(initSeverityCheckboxes);
  const [priorityCheckboxes, setPriorityCheckboxes] = useState(initPriorityCheckboxes);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState(initCategoryCheckboxes);
  const [dropdownValues, setDropdownValues] = useState({'EAI Domain': ['All'], 'Application': ['All'], 'Process/Service': ['All'], 'Business Domain': ['All'], 'Business SubDomain': ['All']});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  /* states for errors displayed by input fields */
  const [fromDateError, setFromDateError] = useState(null);
  const [toDateError, setToDateError] = useState(null);
  const [severityError, setSeverityError] = useState(null);
  const [priorityError, setPriorityError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  /* a ref for the apply button */
  const applyButtonRef = useRef(null);

  /* options for dropdown fields. Will eventually be queries to the database */
  const EAIOptions = ['EAI Domain 1', 'EAI Domain 2', 'EAI Domain 3', 'EAI Domain 4', 'EAI Domain 5', 'EAI Domain 6', 'EAI Domain 7', 'EAI Domain 8'];
  const applicationOptions = ['CRM'];
  const processServiceOptions = ['Update Customer'];
  const BusinessDomainOptions = ['Business Domain 1', 'Business Domain 2'];
  const BusinessSubDomOptions = ['Business SubDomain 1', 'Business SubDomain 2'];

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

  const initialLoad = useRef(true);
  useEffect(()=>{
    if (initialLoad.current) {
      if (props.logEventFilters?.type && props.logEventFilters?.type === 'severity') {
        switch (props.logEventFilters?.severity) {
          case ('Logs'):
            // We want to show all logs. no change to checkboxes
            break;
          case ('Errors'):
            setSeverityCheckboxes(initSeverityCheckboxes.filter((e) => e === 'error'));
            break;
          case ('Warnings'):
            setSeverityCheckboxes(initSeverityCheckboxes.filter((e) => e === 'warning'));
            break;
        }
      }
      initialLoad.current = false;
    }
  }, [initSeverityCheckboxes, props.logEventFilters?.severity, props.logEventFilters?.type]);

  const saveForm = (event) => {
    const ss = window.sessionStorage;
    ss.setItem('severityCheckboxes', JSON.stringify(severityCheckboxes));
    ss.setItem('priorityCheckboxes', JSON.stringify(priorityCheckboxes));
    ss.setItem('categoryCheckboxes', JSON.stringify(categoryCheckboxes));
    ss.setItem('dropdownValues', JSON.stringify(dropdownValues));
    ss.setItem('fromDate', JSON.stringify(fromDate));
    ss.setItem('toDate', JSON.stringify(toDate));
    applyHandler(event);
  };

  {/* returns true if a given piece of data in the grid has properties specified by current filters */}
  const filterData = (e, objKeys) => {
    // Date filters
    const compareDate = moment(e['Created Date']);
    const startDate = moment(fromDate);
    const endDate = moment(toDate);
    const dateFilter = compareDate.isBetween(startDate, endDate, undefined, '[]'); // '[]' means inclusive on the left and right

    // Checkbox filters
    const severityFilter = objKeys.includes(e.severity.toLowerCase());
    const priorityFilter = objKeys.includes(e.priority.toLowerCase());
    const categoryFilter = objKeys.includes(e.category.toLowerCase());

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
    if (!fromDate) {
      setFromDateError('Please enter a date.');
    }
    if (!toDate) {
      setToDateError('Please enter a date.');
    }

    if (fromDate && toDate && fromDate > toDate) {
      setToDateError('To date must be later than from date.');
    }
    if (fromDate && fromDate > new Date()) {
      setFromDateError('From date must be in the past.');
    }

    // const severityKeys = Object.keys(severityCheckboxes).filter((e) => severityCheckboxes[e]);
    // const priorityKeys = Object.keys(priorityCheckboxes).filter((e) => priorityCheckboxes[e]);
    // const categoryKeys = Object.keys(categoryCheckboxes).filter((e) => categoryCheckboxes[e]);
    const objKeys = severityCheckboxes.concat(priorityCheckboxes).concat(categoryCheckboxes);
    const filteredData = props.mockData.filter((e) => filterData(e, objKeys));

    filteredData = filteredData.sort(dateComparison('gt'));
    props.setData(filteredData);
    props.setPage(0);
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
      <form
        style={formStyle}
        onSubmit={applyHandler}
      >
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
            {/* <FormCheckbox name="Severity" checkboxes={severityCheckboxes} setCheckboxes={setSeverityCheckboxes} testid = {'severity'}/>
            <FormCheckbox name="Priority" checkboxes={priorityCheckboxes} setCheckboxes={setPriorityCheckboxes} testid = {'priority'}/>
          <FormCheckbox name="Category" checkboxes={categoryCheckboxes} setCheckboxes={setCategoryCheckboxes} testid = {'category'}/>*/}
            <div style = {{height: '30%'}}>
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
          onClick={saveForm}
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
