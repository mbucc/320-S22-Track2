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
    ArgumentScale,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';

const data = [
    { time: '13:00', logs: 20 },
    { time: '13:06', logs: 10 },
    { time: '13:12', logs: 30 },
    { time: '13:18', logs: 125 },
    { time: '13:24', logs: 10 },
    { time: '13:30', logs: 30 },
    { time: '13:36', logs: 20 },
    { time: '13:42', logs: 450 },
    { time: '13:48', logs: 560 },
];

export default function Timeline(props) {
    const [hover, changeHover] = useState(null);
    const [tooltipTarget, changeTooltip] = useState(null);

    // const TooltipContent = (props) => {
    //     return (
    //         <div>
    //             <Tooltip.Content
    //                 text={props.targetItem.logs}
    //             />
    //             <Tooltip.Content
    //                 text={props.targetItem.time}
    //             />
    //         </div>
    //     )
    // }

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
                        targetItem={tooltipTarget}
                        onTargetItemChange={changeTooltip}
                        // contentComponent={TooltipContent}
                    >
                    </Tooltip>
                </Chart>
            </Grid>
        </Grid>
    )
}