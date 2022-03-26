import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Timeline from './Timeline';

const data = [
  {time: '13:00', logs: 20},
  {time: '13:06', logs: 10},
  {time: '13:12', logs: 30},
  {time: '13:18', logs: 125},
  {time: '13:24', logs: 10},
  {time: '13:30', logs: 30},
  {time: '13:36', logs: 20},
  {time: '13:42', logs: 450},
  {time: '13:48', logs: 560},
];

export default function Timelines(props) {
  return (
    <Paper elevation={3}>
      <Box px={5} pb={5} pt={3}>
        <Grid container direction='column' justifyContent="space-between" spacing={1}>
          <Grid item xs={3}>
            <Typography variant='h5' gutterBottom component='div'>
                            Timelines
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Timeline
              title='Total Logs'
              labels={['13:00', '13:06', '13:12', '13:18', '13:24', '13:30', '13:36', '13:42', '13:48']}
              values={[20, 10, 0, 0, 250, 40, 10, 450, 560]}
              total={25000}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              title='Total Errors'
              labels={['13:00', '13:06', '13:12', '13:18', '13:24', '13:30', '13:36', '13:42', '13:48']}
              values={[20, 10, 0, 0, 250, 40, 10, 450, 560]}
              total={741}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              title='Total Warnings'
              labels={['13:00', '13:06', '13:12', '13:18', '13:24', '13:30', '13:36', '13:42', '13:48']}
              values={[20, 10, 0, 0, 250, 40, 10, 450, 560]}
              total={1572}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>

  );
}
