import React, {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';

// WebStorm doesn't understand the imports from react-table and throw warnings like "cannot resolve 'useTable'". It works though.
import {
  useTable,
  useBlockLayout,
  usePagination,
  useSortBy,
  useResizeColumns,
} from 'react-table';

import styled from 'styled-components';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {IconArrowsSort, IconChevronRight, IconSortAscending, IconSortDescending} from '@tabler/icons';
import {Tooltip, tooltipClasses} from '@mui/material';
import {BPPaginationController} from '../common/pagination-controller';

/**
 * The root component for the activity table.
 */
const BPTableRootStructure = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;

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
      padding-bottom: 90px;
      
      & > .table-line:nth-child(2n) {
        background-color: ${BPColors.gray[70]};
      }
    }
    
    .table-line {
      flex: 1;
      padding: 0 12px;
      min-width: 100%;
      width: max-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
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
  padding: 6px 11px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${BPColors.gray[400]};
  column-gap: 2px;
  transition: all 0.15s ease-in-out;
  
  &:hover {
    color: ${BPColors.black};
    background-color: ${BPColors.gray[100]};
    border-radius: 999px;
  }
`;

const LightTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: BPColors.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: BPColors.black,
    color: BPColors.white,
    fontSize: 11,
    marginTop: '0px !important',
  },
}));

/**
 * This is a custom implementation of the react-table `useTable` hook.
 * @param {array} columns
 * @param {array} data
 * @param {object} style
 * @return {JSX.Element}
 */
export default function BPTableComponent({columns, data, style}) {
  const [hasMounted, setHasMounted] = useState(false);
  // const [pageState, setPageState] = useState(0);

  const [dataState, setDataState] = useState([]);

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
    page,
    prepareRow,
    gotoPage,
    pageCount,
    state: {pageIndex, pageSize},
  } = useTable(
      {
        columns,
        data: dataState,
        defaultColumn: defaultColumnConfiguration,
        autoResetResize: false,
        // pageSize: 5,
      },
      useBlockLayout,
      useResizeColumns,
      useSortBy,
      usePagination,
  );

  useEffect(() => {
    console.log('dataState', dataState);
    // Set data based on the current page index and page size.
    if (data) {
      setDataState(data);
    } else {
      setDataState([]);
    }
  }, [data, pageIndex, pageSize]);

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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <div key={row.values['global_instance_id'] || i} className="table-line">
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <LightTooltip
                        title={cell.value}
                        enterDelay={2100}
                        leaveDelay={100}
                        arrow
                      >
                        <div {...cell.getCellProps()} className="td">
                          {cell.render('Cell')}
                        </div>
                      </LightTooltip>
                    );
                  })}
                </div>
                <Link
                  href={`/log-detail/${row.original.global_instance_id}`}
                  passHref
                >
                  <BPTableDetailButton
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{paddingLeft: 4}}>Detail</span>
                    <IconChevronRight width={17} height={17} strokeWidth={2.2}/>
                  </BPTableDetailButton>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <BPPaginationController
        pageState={pageIndex}
        pageCount={pageCount}
        style={{
          display: pageCount > 1 ? 'flex' : 'none',
          position: 'fixed',
          bottom: '22px',
          right: '23px',
        }}
        onChange={(newPageIndex) => {
          console.log(newPageIndex);
          gotoPage(newPageIndex);
        }}
      />
    </BPTableRootStructure>
  );
}
