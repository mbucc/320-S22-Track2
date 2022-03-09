import DonutChart from 'react-donut-chart';

function DonutChartComponent(props) {
    return (
      <div >
          <DonutChart
            data={props.data}
            onClick={(item, toggled) => {if(toggled) {props.onClickFunc(item['label'],item['value'])}}}
          />
      </div>
    );
  }

export default DonutChartComponent;