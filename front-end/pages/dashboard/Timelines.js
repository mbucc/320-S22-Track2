import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Timeline from './Timeline'

export default function Timelines() {
    return (
        <Paper elevation={3}>
            <Box p={5}>
                <Grid container direction='column' spacing={10}>
                    <Grid item>
                        <Typography variant='h3' gutterBottom component='div'>
                            Timelines
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Timeline title='Total Logs'/>
                    </Grid>
                    <Grid item>
                        <Timeline title='Total Errors'/>
                    </Grid>
                    <Grid item>
                        <Timeline title='Total Warnings'/>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}