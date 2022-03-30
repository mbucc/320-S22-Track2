import React, { useState } from 'react';
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
        console.log(props)
        return (
            <div>
                <Tooltip.Content
                    text={"# Logs: " + props.text}
                />
                <Tooltip.Content
                    text={props.targetItem.time}
                />
            </div>
        )
    }

    const getFilters = (start, end) => {
        console.log("Get log events of type " + props.type + " from " + start + " to " + end)

        return {}
    }

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
                        Total {props.type}
                    </Typography>
                    <Typography variant='h5' gutterBottom component='div'>
                        {props.total}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="text" onClick={() => props.onClick(getFilters(props.data[0].time, props.data[props.data.length - 1].time))}>See More</Button>
                </Grid>
            </Grid>
            <Grid item>
                <Chart
                    data={props.data}
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
                        contentComponent={TooltipContent}
                    >
                    </Tooltip>
                </Chart>
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
            </Grid>
        </Grid>
    )
}
