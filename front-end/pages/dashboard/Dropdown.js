import React from 'react';
import {Select, MenuItem} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * @param {Object} props
* @return {JSX.Element}
*/

const dropdownFormat = {
  height: '40px'
};

export default function Dropdown(props) {
  return (
    <div className="Dropdown">
      <Select defaultValue={60} style={dropdownFormat}>
        <MenuItem value = {15} onClick={function() { props.setTimeframe(15); props.setUpdateTime(props.getTime()); }}>15 mins</MenuItem>
        <MenuItem value = {30} onClick={function() { props.setTimeframe(30); props.setUpdateTime(props.getTime()); }}>30 mins</MenuItem>
        <MenuItem value = {60} onClick={function() { props.setTimeframe(60); props.setUpdateTime(props.getTime()); }}>1 hour</MenuItem>
        <MenuItem value = {240} onClick={function() { props.setTimeframe(240); props.setUpdateTime(props.getTime()); }}>4 hours</MenuItem>
        <MenuItem value = {720} onClick={function() { props.setTimeframe(720); props.setUpdateTime(props.getTime()); }}>12 hours</MenuItem>
        <MenuItem value = {1440} onClick={function() { props.setTimeframe(1440); props.setUpdateTime(props.getTime()); }}>1 day</MenuItem>
      </Select>

      <IconButton color="primary" onClick={function() { props.setTimeframe(props.timeframe); props.setUpdateTime(props.getTime()); }}>
        <RefreshIcon color="action"></RefreshIcon>
      </IconButton>
    </div>
  );
}
