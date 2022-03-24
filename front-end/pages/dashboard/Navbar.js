import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function Navbar(props) {
  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth='100%'>
          <Toolbar maxWidth='100%'>
            <Typography variant='h6' noWrap component='div' sx={{mr: 5}}>
                            ISO CLOG Monitor
            </Typography>

            <Box sx={{flexGrow: 1}}>
              <Tabs variant='standard' textColor='inherit'>
                <Tab label='Dashboard' />
                <Tab label='Business Processes' />
                <Tab label='Log Events' />
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
