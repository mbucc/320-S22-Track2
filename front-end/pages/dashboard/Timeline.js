import React, { useState } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  ArgumentAxis,
  Chart,
  SplineSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';
import moment from 'moment';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Timeline(props) {
  const [hover, changeHover] = useState(null);
  const [tooltipTarget, changeTooltip] = useState(null);

  const getTimeFormat = (m) => {
    return m.format('HH:mm')
  }

  const TooltipContent = (target) => {
    return (
      <div>
        <Tooltip.Content
          text={'# Logs: ' + target.text}
        />
        <Tooltip.Content
          text={'Time: ' + getTimeFormat(props.data[target.targetItem.point].time)}
        />
      </div>
    );
  };

  const Label = ({ text, ...props }) => {
    let time = text.replace(/\,/g, ''); // 1125, but a string, so convert it to number
    time = parseInt(time, 10);
    return <ArgumentAxis.Label {...props} text={getTimeFormat(moment(time))} />;
  }

  const onClickTimeline = ({ targets }) => {
    if (targets) {
      const index = targets[0].point
      const point = props.data[index]
      if (index == 0) {
        props.toggleLogEvents(getFilters(point.time, point.time))
        return
      }
      const filters = getFilters(props.data[index - 1].time, point.time)
      props.toggleLogEvents(filters)
    }
  }

  const getFilters = (start, end) => {
    console.log('Get log events of type ' + props.type + ' from ' + start + ' to ' + end);

    return {start: start, end: end, type: 'severity', severity: props.type};
  };

  const getTotal = () => {
    return props.data.reduce((acc, e) => { return acc + e.logs }, 0) - props.data[0].logs
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
            {getTotal()}
          </Typography>
        </Grid>
        <Grid item>
          {/* Need to change linking to pass filters */}
          <Button variant="text" onClick={() => props.toggleLogEvents(getFilters(props.data[0].time, props.data[props.data.length - 1].time))}>
            <Link href='/LogEvent/' passHref>
              <a>
                See More
              </a>
            </Link>
          </Button>
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
          >
          </SplineSeries>
          <ArgumentAxis labelComponent={Label} />
          {/* <ArgumentAxis /> */}
          <EventTracker onClick={onClickTimeline} />
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
