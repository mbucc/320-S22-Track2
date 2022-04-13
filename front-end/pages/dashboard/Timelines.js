import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Timeline from './Timeline';
/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Timelines(props) {
  console.log(props.data.length)
  // const data = [
  //   {time: '13:00', logs: 20},
  //   {time: '13:06', logs: 10},
  //   {time: '13:12', logs: 30},
  //   {time: '13:18', logs: 125},
  //   {time: '13:24', logs: 10},
  //   {time: '13:30', logs: 30},
  //   {time: '13:36', logs: 20},
  //   {time: '13:42', logs: 450},
  //   {time: '13:48', logs: 560},
  // ];

  const getPointLabels = () => {
    let block = props.timeframe / 6
    let label = props.timeframe
    let labels = [props.timeframe]

    while (label - block > 0) {
      label -= block
      labels.push(label)
    }
    labels.push(0)

    return labels
  }

  /*
  * Returns array of points for total logs timeline
  */
  const getPoints = (criteria) => {
    let labels = getPointLabels()
    let points = labels.map((e) => ({ time: e, logs: 0 })).slice(1)
    let pointIndex = 1
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].time < labels[pointIndex]) {
        pointIndex += 1
      }
      if (!criteria || props.data[i].type === criteria) {
        points[pointIndex - 1].logs += 1
      }
    }

    points = points.map(point => ({ time: moment().subtract(point.time, 'minute').format('HH:mm'), logs: point.logs }))
    return [{time: moment().subtract(props.timeframe, 'minute').format('HH:mm'), logs: points[0].logs}].concat(points)
  };

  /*
  * Returns array of points for total errors timeline
  */
  const getErrorPoints = () => {
    return getPoints('Error')
  };

  /*
  * Returns array of points for total errors timeline
  */
  const getWarningPoints = () => {
    return getPoints('Warning')
  };

  return (
    <Paper elevation={3} sx={{ height: '100%' }}>
      <Box px={5} pb={5} pt={3}>
        <Grid container direction='column' justifyContent="space-between" spacing={1}>
          <Grid item xs={3}>
            <Typography variant='h5' gutterBottom component='div'>
              Timelines
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Timeline
              onClick={() => props.setFilters()}
              type="Logs"
              data={getPoints()}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              onClick={() => props.setFilters()}
              type="Errors"
              data={getErrorPoints()}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              onClick={() => props.setFilters()}
              type="Warnings"
              data={getWarningPoints()}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
