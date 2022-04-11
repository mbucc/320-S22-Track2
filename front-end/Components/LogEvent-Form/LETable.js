import React, {useState} from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Typography} from '@mui/material';
import {TablePagination} from '@mui/material';


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

  {/* states for the table */}
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRPP] = useState(10);

  {/* event handlers for changing number of pages and changing page*/}
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRPP = (event) => {
    setRPP(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div>
      <Typography variant = "h6">
            Results
      </Typography>
      <Table style={tableStyle}>
        <TableHead >
          <TableRow>
            <TableCell >Severity</TableCell>
            <TableCell >Priority</TableCell>
            <TableCell >Category</TableCell>
            <TableCell >Created Date</TableCell>
            <TableCell >Application</TableCell>
            <TableCell >Process/Service</TableCell>
            <TableCell >Activity</TableCell>
            <TableCell >EAI Domain</TableCell>
            <TableCell> Business Domain </TableCell>
            <TableCell> Business SubDomain </TableCell>
            <TableCell >Log Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((e, i)=>{
                return (
                  <TableRow key = {i}>
                    <TableCell>{e.severity}</TableCell>
                    <TableCell>{e.priority}</TableCell>
                    <TableCell>{e.category}</TableCell>
                    <TableCell>{e['Created Date']}</TableCell>
                    <TableCell>{e['Application']}</TableCell>
                    <TableCell>{e['Process/Service']}</TableCell>
                    <TableCell>{e['Activity']}</TableCell>
                    <TableCell>{e['EAI Domain']}</TableCell>
                    <TableCell>{e['Business Domain']}</TableCell>
                    <TableCell>{e['Business SubDomain']}</TableCell>
                    <TableCell>{e['Log Event']}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        count = {props.data.length}
        rowsPerPageOptions = {[5, 10, 20, 50]}
        page = {page}
        onPageChange = {handleChangePage}
        rowsPerPage = {rowsPerPage}
        onRowsPerPageChange = {handleChangeRPP}
      />
    </div>

  );
}
