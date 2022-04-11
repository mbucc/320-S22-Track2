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
export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLogin] = useState(false);
  const [display, setDisplay] = useState(0); // 0, 1, 2 (dashboard, business process, log events)
  const childToParent = (childdata) => {
    setLogin(childdata);
  };
  // eslint-disable-next-line no-unused-vars
  const bpFilters = null;
  // eslint-disable-next-line no-unused-vars
  const logEventFilters = null;

  // function to pass into Navbar to handle tab clicking and changing the displayed view
  // eslint-disable-next-line no-unused-vars
  const toggleNav = (event, tab) => {
    if (tab == 0) {
      bpFilters = null;
      logEventFilters = null;
    }
    setDisplay(tab);
  };

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for business process views
  * Sets display to business process and passes filters into component view
  */
  const toggleBP = (filters) => {
    bpFilters = filters;
    setDisplay(1);
  };

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for log events views
  * Sets display to log events and passes filters into component view
  */
  const toggleLogEvents = (filters) => {
    logEventFilters = filters;
    setDisplay(2);
  };

  if (loggedIn) {
    return (
      <Grid container direction='column'>
        <Grid item height={'100%'}>
          <Navbar toggleNav={toggleNav} display={display} />
        </Grid>
        <Grid item height={'100%'}>
          {display == 0 ?
            <Dashboard onBPClick={toggleBP} onLogEventsClick={toggleLogEvents} onClick={toggleLogEvents} /> :
            display == 1 ?
              <div>Business Process</div> :
              <div>Log Events</div>
          }
        </Grid>
      </Grid>
    );
  } else {
    return (
      <div className='Login_page'>

        <Login setLogin = {childToParent}/>
      </div>

    );
  }
}

