import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function DonutChartComponent(props) {
    return (
      <div >
          <Doughnut 
            data={{
              labels: props.labels,
              datasets: [
                {
                  label: '# of Votes',
                  data: props.values,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              onClick:(event,element) => {
                if(element.length>0){
                  props.onClickFunc("Click");
                  props.onClickFunc(props.labels[element[0].index])
                }
              }
            }}
            
          />
      </div>
    );
  }

export default DonutChartComponent;