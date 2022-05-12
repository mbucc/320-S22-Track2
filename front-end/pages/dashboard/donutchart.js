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
  const endTime = moment();
  const startTime = moment().subtract(props.timeframe, 'minute');
  const toggleBP = (filters) => {
    filters['start'] = startTime._d;
    filters['end'] = endTime._d;
    props.toggleBP(filters);
  };
  const filterData = (type) => {
    const m = {'ACCOUNT':'accounting_app', 'OPER':'operations_app', 'CRM':'crm_app'}
    const labels = [];
    const values = [];
    const arr = [];
    let ind = 1;
    if (type === 'Warning') {
      ind = 0;
    }
    for (const el in props.bp) {
      if (props.bp.hasOwnProperty(el)) {
        if(m.hasOwnProperty(el)){
          arr.push([m[el], props.bp[el][ind]]);
        }
        else{
          arr.push([el, props.bp[el][ind]]);
        }
          
      }
    }
    arr.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < Math.min(5, arr.length); i++) {
      labels.push(arr[i][0]);
      values.push(arr[i][1]);
    }
    console.log('labels are ', labels);
    console.log('values are ', values);
    // return {'labels': labels, 'values': values};

    return {'labels': labels, 'values': values};
  };
  return (
    <div className='donuts'>
      <Paper elevation={3} sx={{height: '101.5%'}}>
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


