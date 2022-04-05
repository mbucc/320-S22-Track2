import React, { useState } from "react";
import { Select, MenuItem, FormControl, makeStyles } from "@material-ui/core";

export default function Dropdown() {
  return (
    <div className="Dropdown">
      <Select defaultValue={"1 day"}>
        <MenuItem value = {"15 mins"}>15 mins</MenuItem>
        <MenuItem value = {"30 mins"}>30 mins</MenuItem>
        <MenuItem value = {"1 hour"}>1 hour</MenuItem>
        <MenuItem value = {"4 hours"}>4 hours</MenuItem>
        <MenuItem value = {"12 hours"}>12 hours</MenuItem>
        <MenuItem value = {"1 day"}>1 day</MenuItem>
      </Select>
    </div>
  );
}