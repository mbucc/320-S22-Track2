import React, {useMemo} from 'react';

import {
  BPActivitySeverityIcon,
  getColorBySeverityValue,
  getNameBySeverityValue,
} from '../../../utils/business-process/severity';

import {getDateStringByValue} from '../../../utils/business-process/date-options';

export const useBPActivityTableColumns = () => {
  const columnsMemo = useMemo(
      () => [
        {
          Header: 'Severity',
          accessor: 'severity',
          minWidth: 126,
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
                  color: getColorBySeverityValue(data.severity),
                }}
              >
                <BPActivitySeverityIcon severity={data.severity}/>
                {getNameBySeverityValue(data.severity)}
              </div>
            );
          },
        },
        {
          Header: 'Log Event Created Date',
          accessor: 'logEventCreatedDate',
          minWidth: 240,
          width: 265,
          Cell: ({row}) => {
            const data = row.original;
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: '1.0rem',
                  fontWeight: '400',
                }}
              >
                {getDateStringByValue(data.logEventCreatedDate)}
              </div>
            );
          },
        },
        {
          Header: 'Business Domain',
          accessor: 'businessDomain',
          minWidth: 190,
          width: 220,
        },
        {
          Header: 'Application',
          accessor: 'application',
          minWidth: 150,
          width: 210,
        },
        {
          Header: 'Activity',
          accessor: 'activity',
          minWidth: 125,
          width: 240,
        },
      ],
      []
  );
  return columnsMemo;
};
