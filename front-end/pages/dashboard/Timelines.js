import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Timeline from './Timeline';
import moment from 'moment';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Timelines(props) {
  const getPoints = (data) => {
    const points = [];
    let dataIndex = 0;
    for (let i = props.timeframe; i >= 0; i--) {
      let numLogs = 0;
      while (dataIndex < data.length && data[dataIndex].time == i) {
        numLogs++;
        dataIndex++;
      }
      points.push({time: moment(props.end).subtract(i, 'minute'), logs: numLogs});
    }
    return points;
  };

  /*
  * Returns array of points for total logs timeline
  */
  const getAllPoints = () => {
    return getPoints(props.data);
  };

  /*
  * Returns array of points for total errors timeline
  */
  const getErrorPoints = () => {
    return getPoints(props.data.filter((e) => e.type === 'Error'));
  };

  /*
  * Returns array of points for total errors timeline
  */
  const getWarningPoints = () => {
    return getPoints(props.data.filter((e) => e.type === 'Warning'));
  };

  return (
    <Paper elevation={3} sx={{height: '100%'}}>
      <Box px={5} pb={5} pt={5}>
        <Grid container direction='column' justifyContent="space-between" spacing={1}>
          <Grid item xs={3} align='center'>
            <Typography variant='h5' gutterBottom component='div'>
              Timelines
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Timeline
              toggleLogEvents={props.toggleLogEvents}
              type="Logs"
              data={getAllPoints()}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              toggleLogEvents={props.toggleLogEvents}
              type="Errors"
              data={getErrorPoints()}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              toggleLogEvents={props.toggleLogEvents}
              type="Warnings"
              data={getWarningPoints()}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
