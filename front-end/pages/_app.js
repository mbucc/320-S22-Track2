import '../styles/globals.css';
import '../styles/Dashboard.css';
import '../styles/index.css';
import '../styles/styles.css';

import React, { useState } from 'react';
import Navbar from './dashboard/Navbar';
import Grid from '@mui/material/Grid';
import Login from './login/login';
import { useRouter } from 'next/router'

import { StyledEngineProvider } from '@mui/material';

/**
 * The Root App Component.
 * @param {React.Component} Component
 * @param {object} pageProps
 * @return {JSX.Element}
 */
function ClogApp({ Component, pageProps }) {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLogin] = useState(false);
  const childToParent = (childdata) => {
    setLogin(childdata);
  };
  // eslint-disable-next-line no-unused-vars
  const [bpFilters, setBPFilters] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [logEventFilters, setLogEventFilters] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const router = useRouter()

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for business process views
  * Sets display to business process and passes filters into component view
  */
  const toggleBP = (filters) => {
    setBPFilters(filters)
    router.push('./business-process/')
  };

  /*
  * Function to be called by clickable components in Dashboard
  * Requires relevant filters for log events views
  * Sets display to log events and passes filters into component view
  */
  const toggleLogEvents = (filters) => {
    setLogEventFilters(filters)
    router.push('LogEvent')
  };

  const clearFilters = () => {
    setLogEventFilters(null)
    setBPFilters(null)
  }

  if (loggedIn) {
    return (
      <StyledEngineProvider injectFirst>
        <Grid container direction='column'>
          <Grid item height={'100%'}>
            <Navbar clearFilters={clearFilters}/>
          </Grid>
          <Grid item height={'100%'}>
            {<Component {...pageProps}
              bpFilters={bpFilters}
              logEventFilters={logEventFilters}
              toggleBP={toggleBP}
              toggleLogEvents={toggleLogEvents}
            />}
          </Grid>
        </Grid>
      </StyledEngineProvider>
    );
  } else {
    return (
      <div className='Login_page'>
        <Login setLogin={childToParent} />
      </div>

    );
  }
}

export default ClogApp;
