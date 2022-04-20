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
  const getPointLabels = () => {
    const block = props.timeframe / 6;
    let label = props.timeframe;
    const labels = [props.timeframe];

    while (label - block > 0) {
      label -= block;
      labels.push(label);
    }
    labels.push(0);

    return labels;
  };

  /*
  * Returns array of points for total logs timeline
  */
  const getPoints = (criteria) => {
    const labels = getPointLabels();
    let points = labels.map((e) => ({time: e, logs: 0}));
    let pointIndex = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].time < labels[pointIndex]) {
        pointIndex += 1;
      }
      if (!criteria || props.data[i].type === criteria) {
        points[pointIndex].logs += 1;
      }
    }

    points = points.map((point) => ({time: moment().subtract(point.time, 'minute'), logs: point.logs}));
    return points;
  };

  /*
  * Returns array of points for total errors timeline
  */
  const getErrorPoints = () => {
    return getPoints('Error');
  };

  /*
  * Returns array of points for total errors timeline
  */
  const getWarningPoints = () => {
    return getPoints('Warning');
  };

  return (
    <Paper elevation={3} sx={{height: '100%'}}>
      <Box px={5} pb={5} pt={3}>
        <Grid container direction='column' justifyContent="space-between" spacing={1}>
          <Grid item xs={3}>
            <Typography variant='h5' gutterBottom component='div'>
              Timelines
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Timeline
              toggleLogEvents={props.toggleLogEvents}
              type="Logs"
              data={getPoints()}
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
