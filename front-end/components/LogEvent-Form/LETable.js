import React, {useState} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Typography, Button, TableSortLabel, CircularProgress} from '@mui/material';
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

  // UNCOMMENT IF USING LOG DETAIL DIALOG COMPONENT
  /**
   * modal state for detail dialog
   */
  // const [modalState, setModalState] = useState(false);
  // const [modalData, setModalData] = useState(null);

  /**
   * loading state for the log detail
   */
  // const [detailIsLoading, setDetailIsLoading] = useState(false);

  // const openModal = async (logid)=>{
  //   setModalState(true);
  //   // while the data is getting fetched, loading state = true
  //   setDetailIsLoading(true);
  //   const res = await axios.get(`http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/logDetail?id=${logid}`);
  //   const data = res.data;
  //   setModalData(data);
  //   // once modal receives data, set loading = false
  //   setDetailIsLoading(false);
  // };

  // const closeModal = ()=>{
  //   setModalData(null);
  //   setModalState(false);
  // };

  /**
   * 0 = default sort
   * 1 = by severity descending
   * 2 = by severity ascending
   * 3 = by priority descending
   * 4 = by priority ascending
   * 5 = by date descending
   * 6 = by date ascending
   */
  const [sort, setSort] = useState(5);

  /* event handlers for changing number of pages and changing page*/
  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };
  const handleChangeRPP = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
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
        sortedData = sortedData.sort(severityComparison('desc'));
        props.setData(sortedData);
        return 1;
      case 2:
        sortedData = sortedData.sort(severityComparison('asc'));
        props.setData(sortedData);
        return 2;
      case 3:
        sortedData = sortedData.sort(priorityComparison('desc'));
        props.setData(sortedData);
        return 3;
      case 4:
        sortedData = sortedData.sort(priorityComparison('asc'));
        props.setData(sortedData);
        return 4;
      case 5:
        sortedData = sortedData.sort(dateComparison('desc'));
        props.setData(sortedData);
        return 5;
      case 6:
        sortedData = sortedData.sort(dateComparison('asc'));
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
      if (comp === 'desc') {
        if (aNum < bNum) {
          return 1;
        }
        if (aNum > bNum) {
          return -1;
        }
        return 0;
      }
      if (comp === 'asc') {
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

  const priorityComparison = (comp)=>{
    return (a, b) =>{
      const aNum = a.priority;
      const bNum = b.priority;
      if (comp === 'desc') {
        if (aNum < bNum) {
          return 1;
        }
        if (aNum > bNum) {
          return -1;
        }
        return 0;
      }
      if (comp === 'asc') {
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
      if (comp === 'asc') {
        return moment(a['creation_time']).format('MMDDYYYYHHmmss') - moment(b['creation_time']).format('MMDDYYYYHHmmss');
      }
      if (comp === 'desc') {
        return moment(b['creation_time']).format('MMDDYYYYHHmmss') - moment(a['creation_time']).format('MMDDYYYYHHmmss');
      }
    };
  };

  const rankSeverity = (severity) => {
    let severityText;
    if (severity >= 50) {
      severityText = 'Error';
    } else if (severity < 50 && severity >= 30) {
      severityText = 'Warn';
    } else if (severity < 30 && severity >= 10) {
      severityText = 'Info';
    } else {
      // eslint-disable-next-line no-unused-vars
      severityText = 'Success';
    }
    return severityText;
  };

  const rankPriority = (priority) => {
    let priorityText;
    if (priority === '10') {
      priorityText = 'Low';
    } else if (priority === '50') {
      priorityText = 'Medium';
    } else {
      // eslint-disable-next-line no-unused-vars
      priorityText = 'High';
    }
    return priorityText;
  };

  return (
    <div>
      {props.isLoading ? (<CircularProgress color = 'success' />) :
      <><Typography variant="h6">
          Results
      </Typography><Table style={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel data-testid = "logevent-button-sort-severity"
                onClick={() => setSort(sortHandler(sort != 1 ? 1 : 2))}
                direction={(sort % 2 === 1 ? 'desc' : 'asc')}>
                    Severity
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel data-testid = "logevent-button-sort-priority"
                onClick={() => setSort(sortHandler(sort != 3 ? 3 : 4))}
                direction={(sort % 2 === 1 ? 'desc' : 'asc')}>
                    Priority
              </TableSortLabel>
            </TableCell>
            <TableCell>Category</TableCell>
            <TableCell>
              <TableSortLabel data-testid = "logevent-button-sort-date"
                onClick={() => setSort(sortHandler(sort != 5 ? 5 : 6))}
                direction={(sort % 2 === 1 ? 'desc' : 'asc')}>
                    Created Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Application</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>EAI Domain</TableCell>
            <TableCell> Business Domain </TableCell>
            <TableCell> Business SubDomain </TableCell>
            <TableCell>Log Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data
              .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
              .map((e, i) => {
                const severityText = rankSeverity(e.severity);
                const priorityText = rankPriority(e.priority);
                return (
                  <TableRow key={i} data-testid='logevent-table-row'>
                    <TableCell data-testid="logevent-table-cell-severity"
                      style={{
                        color: e.severity >= 50 ? BPColors.error :
                            e.severity < 50 && e.severity >= 30 ? BPColors.warning :
                              e.severity < 30 && e.severity >= 10 ? BPColors.info :
                                BPColors.success,
                        width: '120px',
                      }}
                    >
                      {e.severity >= 50 ? <ErrorIcon style={{color: BPColors.error, paddingTop: '8px'}} /> :
                          e.severity < 50 && e.severity >= 30 ? <WarningIcon style={{color: BPColors.warning, paddingTop: '8px'}} /> :
                            e.severity < 30 && e.severity >= 10 ? <InfoIcon style={{color: BPColors.info, paddingTop: '8px'}} /> :
                              <CheckCircleIcon style={{color: BPColors.success, paddingTop: '8px'}} />}
                      <div style={{display: 'inline-block', alignSelf: 'center', marginLeft: '2px'}}>{severityText}</div>
                    </TableCell>
                    <TableCell data-testid="logevent-table-cell-priority">
                      {priorityText}
                    </TableCell>
                    <TableCell data-testid="logevent-table-cell-category">{e.category_name}</TableCell>
                    <TableCell data-testid="logevent-table-cell-date">{moment(e['creation_time']).format('MM/DD/YYYY HH:mm:ss')}</TableCell>
                    <TableCell data-testid="logevent-table-cell-app">{e['application']}</TableCell>
                    <TableCell data-testid="logevent-table-cell-ps">{e['activity']}</TableCell>
                    <TableCell data-testid="logevent-table-cell-eai">{e['eai_domain']}</TableCell>
                    <TableCell data-testid="logevent-table-cell-bd">{e['business_domain']}</TableCell>
                    <TableCell data-testid="logevent-table-cell-bsd">{e['business_subdomain']}</TableCell>
                    <TableCell data-testid="logevent-table-cell-detail">
                      <Button hyperlink-testid={i}
                        variant="text"
                        sx={{
                          borderRadius: 999,
                          padding: '6px 14px',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#00000008',
                          },
                        }}
                        // onClick = {()=>openModal(e.global_instance_id)}
                      >
                        <a
                          href={`/log-detail/${e.global_instance_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{textDecoration: 'none', color: 'black'}}>
                            Detail
                        </a>
                      </Button>
                      {/* <LogDetail
                        data = {modalData}
                        modalState = {modalState}
                        closeModal = {closeModal}
                        isLoading = {detailIsLoading} /> */}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        data-testid={'logevent-table-pagination'}
        count={props.data.length}
        rowsPerPageOptions={[5, 10, 20, 50]}
        page={props.page}
        onPageChange={handleChangePage}
        rowsPerPage={props.rowsPerPage}
        onRowsPerPageChange={handleChangeRPP} /></>}
    </div>

  );
}
