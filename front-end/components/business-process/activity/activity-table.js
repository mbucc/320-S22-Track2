import React, {useEffect, useMemo, useState} from 'react';

// WebStorm doesn't understand ES6 imports and throw a warning of "cannot resolve 'useTable'". It seems working.
import {useTable, useBlockLayout, useResizeColumns} from 'react-table';

import styled from 'styled-components';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

/**
 * The root component for the activity table.
 */
const BPTableRootStructure = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;

  .table {
    width: 100%;
    
    display: inline-block;
    border-spacing: 0;
    border: 0;
    
    .table-header {
      height: ${BPDimens.toolbarHeight}px;
      border-bottom: ${BPStandards.border};
      padding-left: 12px;
      padding-right: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 16px;
      font-weight: 500;
      cursor: default;
      user-select: none;
    }

    .table-body {
      padding-bottom: 40px;
      padding-left: 12px;
      padding-right: 12px;
    }
    
    .table-line {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      &:hover {
        background-color: ${BPColors.gray[100]};
        border-radius: ${BPDimens.treeRadius};
      }
    }

    .table-line-divider {
      width: calc(100% - 20px);
      height: 1px;
      margin: 0 10px;
      background-color: ${BPColors.gray[100]};
      opacity: 90%;
    }

    .th,
    .td {
      margin: 0;
      padding: 14px 14px;

      // In this example we use an absolutely position resizer, so this is required.
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: ${BPColors.gray[200]};
        width: 2.5px;
        height: 16.5px;
        border-radius: 999px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.15s ease-in-out;
        z-index: 1;
        // Prevents from scrolling while dragging on touch devices.
        touch-action: none;
        
        &:hover {
          background: ${BPColors.gray[500]};
        }

        &.isResizing {
          background: ${BPColors.gray[800]};
        }
      }
    }
  }
`;

/**
 * This is a custom implementation of the react-table `useTable` hook.
 * @param {array} columns
 * @param {array} data
 * @return {JSX.Element}
 * @constructor
 */
export default function BPTableComponent({columns, data}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // The default column width configuration.
  const defaultColumnConfiguration = useMemo(
      () => ({
        minWidth: 130,
        maxWidth: 700,
      }),
      []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
      {
        columns,
        data,
        defaultColumn: defaultColumnConfiguration,
        autoResetResize: false,
      },
      useBlockLayout,
      useResizeColumns
  );

  // Rehydrate the table right when the component mounts.
  if (!hasMounted) {
    return null;
  }

  // The main table structure.
  return (
    <BPTableRootStructure>
      <div {...getTableProps()} className="table">
        <div
          className="table-header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 99,
            background: BPColors.white,
          }}
        >
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="table-body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <div key={i} className="table-line">
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="table-line-divider"
                  style={{
                    display: i === rows.length - 1 ? 'none' : 'flex',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </BPTableRootStructure>
  );
}
