import React, {useEffect, useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {BPDatePicker} from '../common/date-picker';
import {BPDomainSelector} from '../common/domain-selector';

import {BPButton} from '../common/button';

// import {BPSeveritySelector} from '../common/severity-selector';

// NOTE: In this file, we are commenting out a lot of things related to severity.
// This is because we were trying to integrate with the dashboard filer,
// but we were not able to populate the data because dashboard team is sending the
// wrong information and the severity is removed from the API in the last night.
// We may be able to do that in the future, so I keep them here for now.

const BPTreeFilterComponent = ({
  eaiDomainList,
  publishingBusinessDomainList,
  bpFilters,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eaiDomains, setEAIDomains] = useState([]);
  const [publishingBusinessDomains, setPublishingBusinessDomains] = useState([]);

  // const [selectedSeverity, setSelectedSeverity] = useState(['success', 'info', 'warning', 'error']);
  // const [selectedSeverityError, setSelectedSeverityError] = useState(null);

  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);

  useEffect(() => {
    if (bpFilters) {
      if (bpFilters.start) {
        setStartDate(bpFilters.start);
      }
      if (bpFilters.end) {
        setEndDate(bpFilters.end);
      }
      if (bpFilters.bp) {
        setPublishingBusinessDomains([bpFilters.bp]);
      }
    }
  }, [bpFilters]);

  // Track the common date picker error.
  useEffect(() => {
    if (startDate && startDate.getTime() > new Date().getTime()) {
      setStartDateError('Start date must be in the past.');
    }
  }, [startDate]);

  const onApplyClick = () => {
    if (startDate && endDate && startDate > endDate) {
      setEndDateError('End date must be later than start date.');
      return;
    }

    if (startDate && startDate.getTime() > new Date().getTime()) {
      setStartDateError('Start date must be in the past.');
      return;
    }

    // if (selectedSeverity.length === 0) {
    //   return;
    // }

    onChange({
      'startTime': startDate,
      'endTime': endDate,
      'eaiDomain': eaiDomains.join(','),
      'publishingBusinessDomain': publishingBusinessDomains.join(','),
      // 'severity': selectedSeverity.join(','), // TODO: API removed this property.
    });
  };

  return (
    <div
      style={{
        width: 250,
        height: '100%',
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: BPDimens.toolbarHeight,
          flexShrink: 0,
          borderBottom: BPStandards.border,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 18,
          paddingRight: 17,
        }}
      >
        <p style={{fontSize: 17, fontWeight: '500'}}>
          Business Process
        </p>
        <BPButton
          id={'bp-tree-filter-apply-button'}
          onClick={onApplyClick}
        >
          Apply
        </BPButton>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 18,
          overflowY: 'auto',
          overscrollBehaviorY: 'contain',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: 17,
        }}
      >
        <BPDatePicker
          id={'bp-tree-filter-start-date-picker'}
          label={'Start Date'}
          onChange={(newDate)=> {
            setStartDateError(null);
            setStartDate(newDate);
          }}
          error={startDateError}
        />

        <BPDatePicker
          id={'bp-tree-filter-end-date-picker'}
          label={'End Date'}
          onChange={(newDate)=> {
            setEndDateError(null);
            setEndDate(newDate);
          }}
          baseDate={startDate}
          error={endDateError}
        />

        <BPDomainSelector
          id={'bp-tree-filter-eai-domain-selector'}
          label={'EAI Domain'}
          searchPlaceholder={'Search an EAI domain'}
          list={eaiDomainList}
          onChange={(value) => setEAIDomains(value)}
        />

        <BPDomainSelector
          id={'bp-tree-filter-publishing-business-domain-selector'}
          label={'Publishing Business Domain'}
          searchPlaceholder={'Search a publishing domain'}
          list={publishingBusinessDomainList}
          onChange={(value) => setPublishingBusinessDomains(value)}
        />

        {/* <BPSeveritySelector*/}
        {/*  id={'bp-tree-filter-severity-selector'}*/}
        {/*  label={'Severity'}*/}
        {/*  onChange={(selected) => {*/}
        {/*    setSelectedSeverity(selected);*/}
        {/*    if (selected.length === 0) {*/}
        {/*      setSelectedSeverityError('Please select at least one severity');*/}
        {/*    } else {*/}
        {/*      setSelectedSeverityError(null);*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  error={selectedSeverityError}*/}
        {/* />*/}
      </div>
    </div>
  );
};

export default BPTreeFilterComponent;
