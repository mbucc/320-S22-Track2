import React, { useState } from "react";
import { Select, MenuItem, FormControl, makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Dropdown(props) {
  return (
    <div className="Dropdown">
      <Select defaultValue={60}>
        <MenuItem value = {15} onClick={function() { props.setTimeframe(15); props.refresh(); }}>15 mins</MenuItem>
        <MenuItem value = {30} onClick={function() { props.setTimeframe(30); props.refresh(); }}>30 mins</MenuItem>
        <MenuItem value = {60} onClick={function() { props.setTimeframe(60); props.refresh(); }}>1 hour</MenuItem>
        <MenuItem value = {240} onClick={function() { props.setTimeframe(240); props.refresh(); }}>4 hours</MenuItem>
        <MenuItem value = {720} onClick={function() { props.setTimeframe(720); props.refresh(); }}>12 hours</MenuItem>
        <MenuItem value = {1440} onClick={function() { props.setTimeframe(1440); props.refresh(); }}>1 day</MenuItem>
      </Select>

      <IconButton color="primary" onClick={() => props.refresh()}>
        <RefreshIcon color="action"></RefreshIcon>
      </IconButton>
    </div>
  );
}