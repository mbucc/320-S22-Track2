import React, { useState } from "react";
import { Select, MenuItem, FormControl, makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Dropdown() {
  return (
    <div className="Dropdown">
      <Select defaultValue={60}>
        <MenuItem value = {15}>15 mins</MenuItem>
        <MenuItem value = {30}>30 mins</MenuItem>
        <MenuItem value = {60}>1 hour</MenuItem>
        <MenuItem value = {240}>4 hours</MenuItem>
        <MenuItem value = {720}>12 hours</MenuItem>
        <MenuItem value = {1440}>1 day</MenuItem>
      </Select>

      <IconButton color="primary">
        <RefreshIcon color="action"></RefreshIcon>
      </IconButton>
    </div>
  );
}