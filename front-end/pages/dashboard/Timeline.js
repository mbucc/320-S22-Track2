import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    ArgumentAxis,
    ValueAxis,
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
        <Grid container direction='column'>
            <Grid
                container
                item
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Grid item>
                    <Typography variant='subtitel1' gutterBottom component='div'>
                        {props.title}
                    </Typography>
                    <Typography variant='h5' gutterBottom component='div'>
                        25000
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => console.log("open log events")}>See More</Button>
                </Grid>
            </Grid>
            <Grid item>
                <Chart
                    data={data}
                    height={100}
                >
                    <SplineSeries
                        valueField='logs'
                        argumentField='time'
                    />
                    <ArgumentAxis />
                    <EventTracker />
                    <HoverState
                        hover={hover}
                        onHoverChange={changeHover}
                    />
                    <Tooltip
                        visible={hover}
                        closeOnOutsideClick={false}
                    >
                    </Tooltip>
                </Chart>
            </Grid>
        </Grid>
    )
}