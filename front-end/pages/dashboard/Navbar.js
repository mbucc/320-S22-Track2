import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
function Navbar(props) {
  return (
    <>
      <AppBar position='static' color='primary'>
        <Container maxWidth='100%'>
          <Toolbar>
            <Typography variant='h6' noWrap component='div' sx={{mr: 5}}>
                            ISO CLOG Monitor
            </Typography>

            <Box sx={{flexGrow: 1}}>
              <Tabs variant='standard' value={props.display} textColor='inherit' indicatorColor >
                <Tab label='Dashboard' value={0} onClick={() => props.toggleNav('dashboard clicked', 0)} />
                <Tab label='Business Processes' value={1} onClick={() => props.toggleNav('bus process clicked', 1)} />
                <Tab label='Log Events' value={2} onClick={() => props.toggleNav('log events clicked', 2)} />
              </Tabs>
            </Box>
            <Button color='inherit'>
                            Log out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
