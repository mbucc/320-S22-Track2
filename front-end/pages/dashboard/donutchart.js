import DonutChartComponent from "./donutchartcomponent"
import styles from "../../styles/Dashboard.module.css" 

function DonutCharts(props) {
  return (
    <div className={styles.row}>
      <div className={styles.column}>
          <DonutChartComponent
            data={getData1()}
            onClickFunc={onClickFunc}
          />;
        </div>
    <div className={styles.column}>
          <DonutChartComponent 
            data={getData2()}
            onClickFunc={onClickFunc}
          />
        </div>   
    </div>
  )
}

function onClickFunc(label, value){
  console.log("Label:"+label+" value:"+value)
}


function getData1(){
  return [
      {
        label: 'BP1',
        value: 25,
      },
      {
        label: 'BP2',
        value: 15,
      },
      {
        label: 'BP3',
        value: 40,
      },
      {
        label: 'BP4',
        value: 40,
      }
    ]
}

function getData2(){
  return [
      {
        label: 'BP1',
        value: 35,
      },
      {
        label: 'BP2',
        value: 5,
      },
      {
        label: 'BP3',
        value: 50,
      },
      {
        label: 'BP4',
        value: 10,
      }
    ]
}

export default DonutCharts;



