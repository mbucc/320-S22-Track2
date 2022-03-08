import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
    Chart,
    SplineSeries,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';

const data = [
    { time: 1, logs: 20 },
    { time: 2, logs: 10 },
    { time: 3, logs: 30 },
    { time: 4, logs: 125 },
    { time: 5, logs: 10 },
    { time: 6, logs: 30 },
    { time: 7, logs: 20 },
    { time: 8, logs: 450 },
    { time: 9, logs: 560 },
];

export default function Timeline(props) {
    const [hover, changeHover] = useState(null);

    return (
        <Paper elevation={3}>
            <Grid container direction='column' spacing={3}>
                <Box m={5}>
                    <Grid item>
                        <Typography variant='subtitel1' gutterBottom component='div'>
                            Total Logs
                        </Typography>
                        <Typography variant='h5' gutterBottom component='div'>
                            25000
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Chart
                            data={data}
                        >
                            <SplineSeries valueField='logs' argumentField='time' />
                            <EventTracker />
                            <HoverState hover={hover} onHoverChange={changeHover} />
                            <Tooltip
                                visible={hover}
                                closeOnOutsideClick={false}
                            >
                            </Tooltip>
                        </Chart>
                    </Grid>
                </Box>
            </Grid>
        </Paper>
    )
}