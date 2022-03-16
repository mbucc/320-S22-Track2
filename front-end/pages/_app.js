import '../styles/globals.css';
import '../styles/Dashboard.css'

import {StyledEngineProvider} from '@mui/material';

/**
 * The Root App Component.
 * @param {React.Component} Component
 * @param {object} pageProps
 * @return {JSX.Element}
 */
function ClogApp({Component, pageProps}) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}

export default ClogApp;
