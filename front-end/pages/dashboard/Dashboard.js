import React from 'react'
import Timelines from './Timelines'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DonutCharts from './donutchart'

export default function Dashboard(props) {

    return (
        <Box mx={10} my={5}>
            <Grid container direction="column">
                <Grid item>
                    {/* Hello + timeframe */}
                </Grid>
                <Grid item>
                    {/* counts */}
                </Grid>
                <Grid container item direction="row" spacing={5}>
                    <Grid item xs={7}>
                        <DonutCharts />
                    </Grid>
                    <Grid item xs={5}>
                        <Box>
                            <Timelines />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>

    )
}
