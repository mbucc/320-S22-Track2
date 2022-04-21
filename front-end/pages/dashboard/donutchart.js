import DonutChartComponent from './donutchartcomponent';
import styles from '../../styles/Dashboard.module.css';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
function DonutCharts(props) {
  const endTime =  moment()
  const startTime = moment().subtract(props.timeframe, 'minute')
  const toggleBP = (filters) => {
    filters['start'] = startTime._d
    filters['end'] = endTime._d
    props.toggleBP(filters)
  }
  const filterData = (type) => {
    const bpscore = {};
    const filtered = props.data.filter((e)=>e.type===type);
    for (let i = 0; i<filtered.length; i+=1) {
      if (!(filtered[i]['BP_name'] in bpscore)) {
        bpscore[filtered[i]['BP_name']] = 0;
      }
      bpscore[filtered[i]['BP_name']] += 1;
    }
    const temparr = [];
    for (const el in bpscore) {
      temparr.push([el, bpscore[el]]);
    }

    temparr.sort((a, b)=>b[1]-a[1]);
    const labels = [];
    const values = [];
    for (let i = 0; i<5; i++) {
      labels.push(temparr[i][0]);
      values.push(temparr[i][1]);
    }
    return {'labels': labels, 'values': values};
  };
  return (
    <div className='donuts'>
      <Paper elevation={3} sx={{height: '100%'}}>
        <Box pt={3}>
          <Typography variant="h5" gutterBottom component="div" align='center'>
            Business Processes Summary
          </Typography>
          <div className={styles.row}>
            <div className={styles.column}>
              <DonutChartComponent
                data={filterData('Warning')}
                toggleBP={toggleBP}
                type='Warning'
                title='Percent Contribution to Warnings'
              />
            </div>
            <div className={styles.column}>
              <DonutChartComponent
                data={filterData('Error')}
                toggleBP={toggleBP}
                type='Error'
                title='Percent Contribution to Errors'
              />
            </div>
          </div>
        </Box>
      </Paper>
    </div>

  );
}

export default DonutCharts;


