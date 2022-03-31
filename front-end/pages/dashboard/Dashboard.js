import React, { useState } from 'react'
import Timelines from './Timelines'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DonutCharts from './donutchart';
import Typography from '@mui/material/Typography';

export default function Dashboard(props) {
  const [timeframe, setTimeframe] = useState(1) // (in hours)
  const [data, setData] = useState(null)

  return (
    <div className='dashboard'>
      <Box px={10} py={5} sx={{ height: '100%', width: '100%' }}>
        <Grid container direction='row' height={'100%'} spacing={3}>
          <Grid item xs={12}>
            {/* replace Paper block with header component */}
            <Paper elevation={3}>
              <Box px={2} pt={4}>
                <Typography variant="h5" gutterBottom component="div">
                  Hello
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {/* replace Grid block with Counts component */}
            <Grid container direction='row' spacing={2}>
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid >
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container item direction="row" spacing={5}>
              <Grid item xs={7}>
                <DonutCharts />
              </Grid>
              <Grid item xs={5}>
                <Timelines setFilters={props.onLogEventsClick}/>
              </Grid>
            </Grid>

          </Grid>

        </Grid>

      </Box>
    </div>

  );
}
