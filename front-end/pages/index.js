import React, {useState} from 'react';
import Dashboard from './dashboard/Dashboard';
import Navbar from './dashboard/Navbar';
import Grid from '@mui/material/Grid';
import Login from './login/login';
// import "./index.css"

/**
 * The home page of the website.
 * @return {JSX.Element}
 */
export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLogin] = useState(false);
  const [display, setDisplay] = useState(0); // 0, 1, 2 (dashboard, business process, log events)
  const childToParent = (childdata) => {
    setLogin(childdata);
  }
  // const bpFilters = null;
  // const logEventFilters = null;

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
    bpFilters = null;
    setDisplay(1);
  };

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for log events views
  * Sets display to log events and passes filters into component view
  */
  const toggleLogEvents = (filters) => {
    logEventFilters = null;
    setDisplay(2);
  };

  if (loggedIn) {
    return (
      <Grid container direction='column'>
        <Grid item height={'100%'}>
          <Navbar />
        </Grid>
        {/* <NavBar onChange={toggleNav} />*/}
        <Grid item height={'100%'}>
          {display == 0 ?
            <Dashboard onBPClick={toggleBP} onClick={toggleLogEvents} /> :
            display == 1 ?
              <div>Business Process</div> :
              <div>Log Events</div>
          }
        </Grid>
      </Grid>
    );
  }
  else{
    return (
      <div className='Login_page'>

<Login setLogin = {childToParent}/>
      </div>
      
    )
  }

}
