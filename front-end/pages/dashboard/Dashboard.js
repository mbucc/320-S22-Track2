import React, { useState, useEffect } from 'react';
import Timelines from './Timelines';
import Counts from './Counts'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DonutCharts from './donutchart';
import Typography from '@mui/material/Typography';
import Dropdown from './Dropdown';
import fakeData from './fake_data.json';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Dashboard(props) {
  const getData = (tf) => {
    return fakeData.filter(e => e.time <= tf).sort((a, b) => b.time - a.time)
  }

  // const [timeframe, setTimeframe] = useState(60) // (in minutes)
  const [state, setState] = useState({
    timeframe: 60,
    data: getData(60)
  })

  const changeTimeframe = (tf) => {
    setState({
      timeframe: tf,
      data: getData(tf)
    })
  }

  if (state.data) {
    return (
      <div className='dashboard'>
        <Box px={6} py={3} sx={{ height: '100%', width: '100%' }}>
          <Grid container direction='row' height={'100%'} spacing={3}>
            <Grid item xs={12}>
              <Grid container style={{alignItems: "center"}}>
                <Grid item xs={6}>
                  <Typography variant="h4">
                    Welcome!
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Dropdown timeframe={state.timeframe} setTimeframe={changeTimeframe}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Counts toggleLogEvents={props.toggleLogEvents} data={state.data}/>
            </Grid>
            <Grid item xs={12}>
              <Grid container item direction="row" spacing={5}>
                <Grid item xs={7}>
                  <DonutCharts data={state.data} toggleBP={props.toggleBP} />
                </Grid>
                <Grid item xs={5}>
                  <Timelines toggleLogEvents={props.toggleLogEvents} data={state.data} timeframe={state.timeframe} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
  return(<div>Loading data...</div>)
}
