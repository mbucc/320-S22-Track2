import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  ArgumentAxis,
  Chart,
  SplineSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {EventTracker, HoverState} from '@devexpress/dx-react-chart';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Timeline(props) {
  const [hover, changeHover] = useState(null);
  const [tooltipTarget, changeTooltip] = useState(null);

  const TooltipContent = (props) => {
    console.log(props);
    return (
      <div>
        <Tooltip.Content
          text={'# Logs: ' + props.text}
        />
        <Tooltip.Content
          text={props.targetItem.time}
        />
      </div>
    );
  };

  const onClickTimeline = ({targets}) => {
    if (targets) {
        const point = props.data[targets[0].point]
        console.log(props.data[targets[0].point])
        props.onClick(getFilters(point.start, point.end))
    }
  }

  const getFilters = (start, end) => {
    console.log('Get log events of type ' + props.type + ' from ' + start + ' to ' + end);

    return {};
  };

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
          height={100}
        >
          <SplineSeries
            valueField='logs'
            argumentField='time'
          />
          <ArgumentAxis />
          <EventTracker onClick={onClickTimeline}/>
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
      </Grid>
    </Grid>
  );
}
