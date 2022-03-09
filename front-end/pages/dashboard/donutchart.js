import DonutChartComponent from "./donutchartcomponent"
import styles from "../../styles/Dashboard.module.css" 

function DonutCharts(props) {
  return (
    <div className={styles.row}>
      <div className={styles.column}>
          <DonutChartComponent
           labels = {['BP1','BP2','BP3','BP4','Rest']}
           values={[10, 10, 10, 10, 30]}
           onClickFunc={onClickFunc}
          />;
        </div>
    <div className={styles.column}>
          <DonutChartComponent 
            labels = {['BP1','BP2','BP3','BP4','Rest']}
            values={[12, 19, 3, 5, 20]}
            onClickFunc={onClickFunc}
          />
        </div>   
    </div>
  )
}

function onClickFunc(label, value){
  console.log(label)
}

export default DonutCharts;



