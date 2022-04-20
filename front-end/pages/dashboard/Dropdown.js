import React from 'react';
import {Select, MenuItem} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Dropdown(props) {
  return (
    <div className="Dropdown">
      <Select defaultValue={60}>
        <MenuItem value = {15} onClick={() => props.setTimeframe(15)}>15 mins</MenuItem>
        <MenuItem value = {30} onClick={() => props.setTimeframe(30)}>30 mins</MenuItem>
        <MenuItem value = {60} onClick={() => props.setTimeframe(60)}>1 hour</MenuItem>
        <MenuItem value = {240} onClick={() => props.setTimeframe(240)}>4 hours</MenuItem>
        <MenuItem value = {720} onClick={() => props.setTimeframe(720)}>12 hours</MenuItem>
        <MenuItem value = {1440} onClick={() => props.setTimeframe(1440)}>1 day</MenuItem>
      </Select>

      <IconButton color="primary" onClick={() => props.setTimeframe(props.timeframe)}>
        <RefreshIcon color="action"></RefreshIcon>
      </IconButton>
    </div>
  );
}
