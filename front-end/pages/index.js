import React, {useState} from 'react';
import Dashboard from './dashboard/Dashboard';
import Navbar from './dashboard/Navbar';
import Grid from '@mui/material/Grid';
import Login from './login/login';
// import "./index.css"

/**
 *
 * @return {JSX.Element}
 */
export default function Home(props) {
  return (
    <Dashboard {...props}/>
  )
}