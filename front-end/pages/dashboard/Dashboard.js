import React, {useState} from 'react';
import Timelines from './Timelines';
import Counts from './Counts';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DonutCharts from './donutchart';
import Typography from '@mui/material/Typography';
import Dropdown from './Dropdown';
import fakeData from './fake_data.json';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Dashboard(props) {
  // const testing = async () => {
  //   await fetch('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/countByType?severity=error&intervals=6&timeBack=1440 ')
  //     .then((response) => {response.json();})
  //     .then((data) => {
  //       console.log('testing api: ', data)
  //     })
  // }

<<<<<<< HEAD
  const refresh = () => {
    setData(getData());
  };

  const getData = () => {
    return fakeData.filter((e) => e.time <= timeframe);
  };

  if (data) {
    const newLocal = '100%';
    return (
      <div className='dashboard'>
        <Box px={6} py={3} sx={{height: newLocal, width: '100%'}}>
=======
  // testing()

  const getData = (tf) => {
    return fakeData.filter((e) => e.time <= tf).sort((a, b) => b.time - a.time);
  };

  const [state, setState] = useState({
    timeframe: 60,
    data: getData(60),
  });

  const changeTimeframe = (tf) => {
    setState({
      timeframe: tf,
      data: getData(tf),
    });
  };

  // Helps show when all components have been last updated
  const [updateTime, setUpdateTime] = useState(getTime());
  const getTime = () => {
    const today = new Date;
    const hr = today.getHours();
    const min = today.getMinutes();
    return hr + ':' + ((min < 10) ? '0' : '') + min;
  };

  if (state.data) {
    return (
      <div className='dashboard'>
        <Box px={6} py={3} sx={{height: '100%', width: '100%'}}>
>>>>>>> 34d8808594e8221d0627f74828e749a554d22e63
          <Grid container direction='row' height={'100%'} spacing={3}>
            <Grid item xs={12}>
              <Grid container style={{alignItems: 'center'}}>
                <Grid item xs={6}>
                  <Typography variant="h4">
                    Welcome!
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Dropdown timeframe={state.timeframe} setTimeframe={changeTimeframe} setUpdateTime={setUpdateTime} getTime={getTime}/>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h7">
                        Last updated at {updateTime}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
<<<<<<< HEAD
              <Counts setFilters={props.onLogEventsClick} data={data} timeframe={'1 hour'}/>
=======
              <Counts toggleLogEvents={props.toggleLogEvents} data={state.data}/>
>>>>>>> 34d8808594e8221d0627f74828e749a554d22e63
            </Grid>
            <Grid item xs={12}>
              <Grid container item direction='row' spacing={5}>
                <Grid item xs={7}>
                  <DonutCharts data={state.data} toggleBP={props.toggleBP} timeframe={state.timeframe}/>
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
  return (<div>Loading data...</div>);
}
