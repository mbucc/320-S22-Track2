import React, { useState } from 'react'
import Dashboard from './dashboard/Dashboard';
import Navbar from './dashboard/Navbar';
import Grid from '@mui/material/Grid';

/**
 * The home page of the website.
 * @return {JSX.Element}
 */
export default function Home() {
  const [loggedIn, setLogin] = useState(true)
  const [display, setDisplay] = useState(0) //0, 1, 2 (dashboard, business process, log events)   
  const bpFilters = null
  const logeventFilters = null

  // function to pass into Navbar to handle tab clicking and changing the displayed view
  const toggleNav = (event, tab) => {
    setDisplay(tab);
  };

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for business process views
  * Sets display to business process and passes filters into component view
  */
  const toggleBP = (filters) => {
    
  }

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for log events views
  * Sets display to log events and passes filters into component view
  */
  const toggleLogEvents = (filters) => {

  }

  if (loggedIn) {
    return (
      <Grid container direction='column'>
        <Grid item height={'100%'}>
          <Navbar />
        </Grid>
        {/* <NavBar onChange={toggleNav} />*/}
        <Grid item height={'100%'}>
          {display == 0
            ? <Dashboard onBPClick={toggleBP} onClick={toggleLogEvents} />
            : display == 1
              ? <div>Business Process</div>
              : <div>Log Events</div>
          }
        </Grid>
      </Grid>
    )
  }
  return (
    <div>Login</div>
  )
}
