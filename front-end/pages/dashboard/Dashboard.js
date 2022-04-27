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
  const getTime = () => {
    const today = new Date;
    const hr = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    return ((hr < 10) ? '0' : '') + hr + ':' + ((min < 10) ? '0' : '') + min + ':' + ((sec < 10) ? '0' : '') + sec;
  };
  const [updateTime, setUpdateTime] = useState(getTime());

  if (state.data) {
    return (
      <div className='dashboard'>
        <Box px={6} py={3} sx={{height: '100%', width: '100%'}}>
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
              <Counts toggleLogEvents={props.toggleLogEvents} data={state.data}/>
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
