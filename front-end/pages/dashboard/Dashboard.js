import {React,useState} from 'react';
import Timelines from './Timelines';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DonutCharts from './donutchart';
import Typography from '@mui/material/Typography';
import Dropdown from './Dropdown';
import fakeData from './fake_data.json';
/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Dashboard(props) {
  const [timeframe, setTimeframe] = useState(60); // (in hours)
  const [data, setData] = useState(getData());

  const refresh = () => {
    setData(getData())
  }

  const getData = () => {
    return fakeData.filter(e => e.time <= timeframe)
  }

  return (
    <div className='dashboard'>
      <Box px={10} py={5} sx={{height: '100%', width: '100%'}}>
        <Grid container direction='row' height={'100%'} spacing={3}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h5">
                  Welcome!
                </Typography>
              </Grid>
              <Grid item xs={1} align="right">
                <Dropdown />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* replace Grid block with Counts component */}
            <Grid container direction='row' spacing={2}>
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid >
              <Grid item xs={3}>
                <Paper elevation={3}>
                  <Box px={2} pt={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Count
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container item direction="row" spacing={5}>
              <Grid item xs={6}>
                <DonutCharts />
              </Grid>
              <Grid item xs={6}>
                <Timelines setFilters={props.onLogEventsClick} data={data} timeframe={timeframe}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>

  );
}
