import React, {useState} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button, TableSortLabel} from '@mui/material';
import {TablePagination} from '@mui/material';
import moment from 'moment';
import {BPColors} from '../../utils/business-process/standards.js';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

/**
 *
 * @param {*} props state of data to be displayed by the Table
 * @return {JSX.Element}
 */
export default function LETable(props) {
  const tableStyle = {
    marginTop: '20px',
    width: 'inherit',
  };

  /**
   * 0 = default sort
   * 1 = by severity descending
   * 2 = by severity ascending
   * 3 = by date ascending
   * 4 = by date descending
   * 5 = by priority descending
   * 6 = by priority descending
   */
  const [sort, setSort] = useState(6);

  /* event handlers for changing number of pages and changing page*/
  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };
  const handleChangeRPP = (event) => {
    setRPP(parseInt(event.target.value, 10));
    props.setPage(0);
  };


  /**
   *
   * @param {int} sort number corresponding to the desired sorting state
   * @return
   */

  const sortHandler = (sort)=>{
    let sortedData = props.data;
    switch (sort) {
      case 1:
        sortedData = sortedData.sort(severityComparison('lt'));
        props.setData(sortedData);
        return 1;
      case 2:
        sortedData = sortedData.sort(severityComparison('gt'));
        props.setData(sortedData);
        return 2;
      case 3:
        sortedData = sortedData.sort(priorityComparison('lt'));
        props.setData(sortedData);
        return 3;
      case 4:
        sortedData = sortedData.sort(priorityComparison('gt'));
        props.setData(sortedData);
        return 4;
      case 5:
        sortedData = sortedData.sort(dateComparison('lt'));
        props.setData(sortedData);
        return 5;
      case 6:
        sortedData = sortedData.sort(dateComparison('gt'));
        props.setData(sortedData);
        return 6;
    }
  };

  // const severityToNum = (severity)=>{
  //   switch (severity.toLowerCase()) {
  //     case 'success':
  //       return 0;
  //     case 'info':
  //       return 1;
  //     case 'warning':
  //       return 2;
  //     case 'error':
  //       return 3;
  //   }
  // };

  // const priorityToNum = (priority)=>{
  //   switch (priority.toLowerCase()) {
  //     case 'low':
  //       return 0;
  //     case 'medium':
  //       return 1;
  //     case 'high':
  //       return 2;
  //   }
  // };


  const severityComparison = (comp)=>{
    // callback used to compare different severities
    return (a, b) =>{
      const aNum = a.severity;
      const bNum = b.severity;
      if (comp === 'gt') {
        if (aNum < bNum) {
          return -1;
        }
        if (aNum > bNum) {
          return 1;
        }
        return 0;
      }
      if (comp === 'lt') {
        if (aNum < bNum) {
          return 1;
        }
        if (aNum > bNum) {
          return -1;
        }
        return 0;
      }
    };
  };

  const priorityComparison = (comp)=>{
    return (a, b) =>{
      const aNum = a.priority;
      const bNum = b.priority;
      if (comp === 'lt') {
        if (aNum < bNum) {
          return 1;
        }
        if (aNum > bNum) {
          return -1;
        }
        return 0;
      }
      if (comp === 'gt') {
        if (aNum < bNum) {
          return -1;
        }
        if (aNum > bNum) {
          return 1;
        }
        return 0;
      }
    };
  };

  const dateComparison = (comp)=>{
    return (a, b) =>{
      console.log(a['creation_time']);
      console.log(moment(a['creation_time']).format('MMDDYYYYHHmmss'));
      if (comp === 'lt') {
        return moment(a['creation_time']).format('MMDDYYYYHHmmss') - moment(b['creation_time']).format('MMDDYYYYHHmmss');
      }
      if (comp === 'gt') {
        return moment(b['creation_time']).format('MMDDYYYYHHmmss') - moment(a['creation_time']).format('MMDDYYYYHHmmss');
      }
    };
  };

  return (
    <div>
      <Typography variant = "h6">
            Results
      </Typography>
      <Table style={tableStyle}>
        <TableHead >
          <TableRow>
            <TableCell >
              <TableSortLabel
                onClick={()=>setSort(sortHandler(sort != 1 ? 1 : 2))}
                direction = {(sort%2 === 1 ? 'asc' : 'desc')}>
                Severity
              </TableSortLabel>
            </TableCell>
            <TableCell >
              <TableSortLabel
                onClick={()=>setSort(sortHandler(sort != 3 ? 3 : 4))}
                direction = {(sort%2 === 1 ? 'asc' : 'desc')}>
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell >Category</TableCell>
            <TableCell >
              <TableSortLabel
                onClick={()=>setSort(sortHandler(sort != 5 ? 5 : 6))}
                direction = {(sort%2 === 1 ? 'asc' : 'desc')}>
                Created Date
              </TableSortLabel>
            </TableCell>
            <TableCell >Application</TableCell>
            <TableCell >Activity</TableCell>
            <TableCell >EAI Domain</TableCell>
            <TableCell> Business Domain </TableCell>
            <TableCell> Business SubDomain </TableCell>
            <TableCell >Log Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data
              .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
              .map((e, i)=>{
                console.log(e.priority);
                return (
                  <TableRow key = {i}>
                    <TableCell
                      style = {
                        {
                          color:
                            e.severity >= 50 ? BPColors.error :
                            e.severity < 50 && e.severity >= 30 ? BPColors.warning :
                            e.severity < 30 && e.severity >= 10 ? BPColors.info :
                            BPColors.success,
                          width: '120px',
                        }
                      }
                    >
                      {
                        e.severity >= 50 ? <ErrorIcon style = {{color: BPColors.error, paddingTop: '8px'}}/> :
                        e.severity < 50 && e.severity >= 30 ? <WarningIcon style = {{color: BPColors.warning, paddingTop: '8px'}}/> :
                        e.severity < 30 && e.severity >= 10 ? <InfoIcon style = {{color: BPColors.info, paddingTop: '8px'}}/> :
                        <CheckCircleIcon style = {{color: BPColors.success, paddingTop: '8px'}}/>
                      }
                      <div style = {{display: 'inline-block', alignSelf: 'center', marginLeft: '2px'}}>{e.severity}</div>
                    </TableCell>
                    <TableCell>
                      {e.priority}
                    </TableCell>
                    <TableCell>{e.category_name}</TableCell>
                    <TableCell>{e['creation_time']}</TableCell>
                    <TableCell>{e['application']}</TableCell>
                    <TableCell>{e['activity']}</TableCell>
                    <TableCell>{e['eai_domain']}</TableCell>
                    <TableCell>{e['business_domain']}</TableCell>
                    <TableCell>{e['business_subdomain']}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        sx={{
                          borderRadius: 999,
                          padding: '6px 14px',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#00000008',
                          },
                        }}
                      >
                        <a
                          href={`/log-detail/${e.global_instance_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{textDecoration: 'none', color: 'black'}}>
                          Detail
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        count = {props.data.length}
        rowsPerPageOptions = {[5, 10, 20, 50]}
        page = {props.page}
        onPageChange = {handleChangePage}
        rowsPerPage = {props.rowsPerPage}
        onRowsPerPageChange = {handleChangeRPP}
      />
    </div>

  );
}
