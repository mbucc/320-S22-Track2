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
          minWidth: 125,
          width: 140,
          sortDescFirst: true,
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
                  fontSize: 'inherit',
                  fontWeight: '500',
                  color: getColorBySeverityValue(data.severity),
                }}
              >
                <BPActivitySeverityIcon size={16} severity={data.severity}/>
                {getNameBySeverityValue(data.severity)}
              </div>
            );
          },
        },
        {
          Header: 'Created Date',
          accessor: 'creation_time',
          minWidth: 165,
          width: 185,
          sortDescFirst: true,
          Cell: ({row}) => {
            const data = row.original;
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: 'inherit',
                  fontWeight: '400',
                }}
              >
                {getDateStringByValue(data.creation_time)}
              </div>
            );
          },
        },
        {
          Header: 'Business Domain',
          accessor: 'business_domain',
          minWidth: 190,
          width: 210,
          sortDescFirst: true,
        },
        {
          Header: 'Application',
          accessor: 'application',
          minWidth: 150,
          width: 195,
          sortDescFirst: true,
        },
        {
          Header: 'Activity',
          accessor: 'activity',
          minWidth: 125,
          width: 210,
          sortDescFirst: true,
        },
      ],
      []
  );
  return columnsMemo;
};
