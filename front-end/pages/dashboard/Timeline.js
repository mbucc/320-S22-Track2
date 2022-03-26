import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    ArgumentAxis,
    Chart,
    SplineSeries,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Timeline(props) {
    const [hover, changeHover] = useState(null);
    const [tooltipTarget, changeTooltip] = useState(null);

    const TooltipContent = (props) => {
        return (
            <div>
                <Tooltip.Content
                    text={props.targetItem.logs}
                />
                <Tooltip.Content
                    text={props.targetItem.time}
                />
            </div>
        )
    }

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
                        {props.total}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => console.log("open log events")}>See More</Button>
                </Grid>
            </Grid>
            <Grid item>
                {/* <div style={{height:'10vh', width: '30vw', position:"relative"}}>
                    <Line
                        data={{
                            labels: props.labels,
                            datasets: [
                                {
                                    label: '# logs',
                                    data: props.values,
                                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    tension: 0.3,
                                    hoverBorderWidth: 10
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    }
                                },
                                y: {
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div> */}
                <Chart
                    data={data}
                    height={'100'}
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