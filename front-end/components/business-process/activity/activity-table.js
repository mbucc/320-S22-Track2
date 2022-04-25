import React, {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';

// WebStorm doesn't understand the imports from react-table and throw warnings like "cannot resolve 'useTable'". It works though.
import {useTable, useBlockLayout, useSortBy, useResizeColumns} from 'react-table';

import styled from 'styled-components';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {IconArrowRight, IconArrowsSort, IconSortAscending, IconSortDescending} from '@tabler/icons';
import {BPTextButton} from "../common/button";

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
      min-width: 100%;
      width: max-content;
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
      display: flex;
      flex-direction: column;
      padding-bottom: 40px;
      padding-left: 12px;
      padding-right: 12px;
    }
    
    .table-line {
      flex: 1;
      min-width: 100%;
      width: max-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

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
    
    .table-header-sorter {
      padding: 8px 0;
      &:hover > .table-header-sorter-icon {
        color: ${BPColors.black} !important;
      }
      &:active > .table-header-sorter-icon {
        transform: scale(0.85);
      }
    }
    
    .table-header-sorter-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .th {
      font-size: 16px;
    }
    
    .td {
      font-size: 15px;
    }

    .th,
    .td {
      margin: 0;
      padding: 14px 14px;
      
      max-lines: 2;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      overflow-x: hidden;

      // In this example we use an absolutely position resizer, so this is required.
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        width: 8px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        
        // Prevents from scrolling while dragging on touch devices.
        touch-action: none;
        
        & > .table-resizer-handle {
          width: 2.5px;
          height: 16.5px;
          border-radius: 999px;
          background: ${BPColors.gray[200]};
          transition: all 0.14s ease-in-out;
        }
        
        &:hover > .table-resizer-handle {
          background: ${BPColors.gray[500]};
        }

        &.isResizing > .table-resizer-handle {
          background: ${BPColors.gray[800]};
        }
      }
    }
  }
`;

const BPTableDetailButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${BPColors.gray[400]};
  column-gap: 3px;
  transition: all 0.1s ease-in-out;
  
  &:hover {
    color: ${BPColors.green[600]};
  }
`;

/**
 * This is a custom implementation of the react-table `useTable` hook.
 * @param {array} columns
 * @param {array} data
 * @return {JSX.Element}
 * @constructor
 */
export default function BPTableComponent({columns, data, style}) {
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
      useResizeColumns,
      useSortBy,
  );

  // Rehydrate the table right when the component mounts.
  if (!hasMounted) {
    return null;
  }

  // The main table structure.
  return (
    <BPTableRootStructure
      style={style}
    >
      <div {...getTableProps()} className="table">
        <div
          className="table-header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 89, // In order to be on top of the scrollbar but below the adjustable frame.
            background: BPColors.white,
          }}
        >
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  {...column.getHeaderProps()}
                  className="th"
                >
                  <div
                    className="table-header-sorter"
                    {...column.getSortByToggleProps()}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      columnGap: '7px',
                      cursor: 'pointer',
                    }}
                  >
                    {column.render('Header')}
                    <div
                      className="table-header-sorter-icon"
                      style={{
                        width: '20px',
                        height: '20px',
                        display: !column.disableSortBy ? 'flex' : 'none',
                        color: column.isSorted ? BPColors.black : BPColors.gray[300],
                        transition: 'all 0.12s ease-in-out',
                      }}
                    >
                      {
                        column.isSorted ? (
                            column.isSortedDesc ?
                              <IconSortDescending width={21} height={21}/> :
                              <IconSortAscending width={21} height={21}/>
                          ) :
                          <IconArrowsSort width={19} height={19}/>
                      }
                    </div>
                  </div>
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  >
                    <div className="table-resizer-handle" />
                  </div>
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
              <div key={row.getRowProps().key} className="table-line">
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
                <Link href={`/log-detail/${row.original.eai_transaction_id}`}>
                  <BPTableDetailButton>
                    <span>Detail</span>
                    <IconArrowRight width={18} height={18} strokeWidth={2.1}/>
                  </BPTableDetailButton>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </BPTableRootStructure>
  );
}
