import Count from './Count';
import Grid from '@mui/material/Grid';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import {red} from '@mui/material/colors';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Counts(props) {
  const sumHighPriority = () => {
    let sum = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].priority === 'High') {
        sum++;
      }
    }
    return sum;
  };
  const sumMediumPriority = () => {
    let sum = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].priority === 'Medium') {
        sum++;
      }
    }
    return sum;
  };
  const sumErrors = () => {
    let sum = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].type === 'Error') {
        sum++;
      }
    }
    return sum;
  };
  const sumWarnings = () => {
    let sum = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].type === 'Warning') {
        sum++;
      }
    }
    return sum;
  };
  return (
    <Grid container direction='row' spacing={2}>
      <Grid item xs={3}>
        <Count
          icon={<ErrorOutlineRoundedIcon
            sx={{color: red[500]}} />}
          countTitle={'High Priority Logs'}
          total={sumHighPriority()}
          onClick={props.toggleLogEvents}
          type='priority'
          priority='High'
          start={props.start}
          end={props.end}
        />
      </Grid>
      <Grid item xs={3}>
        <Count
          countTitle={'Medium Priority Logs'}
          total={sumMediumPriority()}
          onClick={props.toggleLogEvents}
          type='priority'
          priority='Medium'
          start={props.start}
          end={props.end}
        />
      </Grid>
      <Grid item xs={3}>
        <Count
          countTitle={'Error Logs'}
          total={sumErrors()}
          onClick={props.toggleLogEvents}
          type='severity'
          severity='Error'
          start={props.start}
          end={props.end}
        />
      </Grid >
      <Grid item xs={3}>
        <Count
          countTitle={'Warning Logs'}
          total={sumWarnings()}
          onClick={props.toggleLogEvents}
          type='severity'
          severity='Warning'
          start={props.start}
          end={props.end}
        />
      </Grid>
    </Grid>
  );
}

