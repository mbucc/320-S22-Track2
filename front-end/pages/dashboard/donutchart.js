import DonutChartComponent from "./donutchartcomponent"
import styles from "../../styles/Dashboard.module.css"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function DonutCharts(props) {
  return (
    <Paper elevation={3}>
      <Box p={5}>
        <div className={styles.row}>
          <div className={styles.column}>
            <DonutChartComponent
              labels={['BP1', 'BP2', 'BP3', 'BP4', 'Rest']}
              values={[10, 10, 10, 10, 30]}
              onClickFunc={onClickFunc}
              title='Percent Contribution to Warnings'
            />
          </div>
          <div className={styles.column}>
            <DonutChartComponent
              labels={['BP1', 'BP2', 'BP3', 'BP4', 'Rest']}
              values={[12, 19, 3, 5, 20]}
              onClickFunc={onClickFunc}
              title='Percent Contribution to Errors'
            />
          </div>
        </div>
      </Box>
    </Paper>
  )
}

function onClickFunc(label, value) {
  console.log(label)
}

export default DonutCharts;



