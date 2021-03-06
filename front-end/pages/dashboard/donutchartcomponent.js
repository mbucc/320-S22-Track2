import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
function DonutChartComponent(props) {
  return (
    <Doughnut
      data={{
        labels: props.data.labels,
        datasets: [
          {
            label: '# of Votes',
            data: props.data.values,
            backgroundColor: [
              'rgba(31, 54, 61, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(15, 139, 141, 1)',
              'rgba(236, 167, 44,1)',
              'rgba(153, 102, 255, 1)',
            ].slice(0, Math.min(5, props.data.values.length)),
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        onClick: (event, element) => {
          if (element.length > 0) {
            // props.onClickFunc('Click');
            props.toggleBP({type: 'severity', severity: props.type, bp: props.data.labels[element[0].index]});
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: props.title,
          },
        },
      }}

    />
  );
}

export default DonutChartComponent;
