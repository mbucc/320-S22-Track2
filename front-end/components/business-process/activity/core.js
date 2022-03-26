import React from 'react';
import {BPColors} from '../../../utils/business-process/standards';
import BPActivityFilterComponent from './activity-filter';
import BPTableComponent from './activity-table';
import {
  BPActivitySeverityIcon,
  getColorBySeverity,
  getNameBySeverityAccessor
} from '../../../utils/business-process/severity';

const BPActivityView = ({
  onChange,
}) => {
  const columns = React.useMemo(
      () => [
        {
          Header: 'Severity',
          accessor: 'severity',
          width: 140,
          Cell: ({row}) => {
            const data = row.original;
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  columnGap: '0.5rem',
                  fontSize: '1.0rem',
                  fontWeight: '500',
                  color: getColorBySeverity(data.severity),
                }}
              >
                <BPActivitySeverityIcon severity={data.severity}/>
                {getNameBySeverityAccessor(data.severity)}
              </div>
            );
          },
        },
        {
          Header: 'Log Event Created Date',
          accessor: 'logEventCreatedDate',
          minWidth: 220,
          width: 350,
        },
        {
          Header: 'Business Domain',
          accessor: 'businessDomain',
          minWidth: 200,
          width: 300,
        },
        {
          Header: 'Application',
          accessor: 'application',
          minWidth: 180,
          width: 300,
        },
        {
          Header: 'Activity',
          accessor: 'activity',
          minWidth: 180,
          width: 300,
        },
      ],
      []
  );

  const data = React.useMemo(
      () => [
        {
          severity: 'info',
          info: 'This is the first activity',
        },
        {
          severity: 'warning',
          info: 'This is the second activity',
        },
        {
          severity: 'error',
          info: 'This is the third activity',
        },
        {
          severity: 'info',
          info: 'This is the fourth activity',
        },
        {
          severity: 'info',
          info: 'This is the fifth activity',
        },
        {
          severity: 'success',
          info: 'This is the sixth activity',
        },
        {
          severity: 'error',
          info: 'This is the seventh activity',
        },
        {
          severity: 'error',
          info: 'This is the eighth activity',
        },
        {
          severity: 'success',
          info: 'This is the ninth activity',
        },
        {
          severity: 'warning',
          info: 'This is the tenth activity',
        },
      ],
      []
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Filter Section */}
      <BPActivityFilterComponent/>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Table Section */}
      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          overflowX: 'auto',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTableComponent columns={columns} data={data}/>
      </div>
    </div>
  );
};

export default BPActivityView;
