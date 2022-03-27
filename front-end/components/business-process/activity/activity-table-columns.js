import React, {useMemo} from 'react';
import {
  BPActivitySeverityIcon,
  getColorBySeverity,
  getNameBySeverityAccessor,
} from '../../../utils/business-process/severity';

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
          minWidth: 240,
          width: 290,
        },
        {
          Header: 'Business Domain',
          accessor: 'businessDomain',
          minWidth: 190,
          width: 260,
        },
        {
          Header: 'Application',
          accessor: 'application',
          minWidth: 150,
          width: 260,
        },
        {
          Header: 'Activity',
          accessor: 'activity',
          minWidth: 125,
          width: 260,
        },
      ],
      []
  );
  return columnsMemo;
};
