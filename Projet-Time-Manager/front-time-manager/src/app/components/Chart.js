import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const WorkingTimeChart = () => {
  useEffect(() => {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Working Times',
            align: 'left'
        },
        xAxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Hour'
            },
            stackLabels: {
                enabled: true
            }
        },
        legend: {
            align: 'left',
            x: 70,
            verticalAlign: 'top',
            y: 70,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'BPL',
            data: [3, 5, 1, 13]
        }, {
            name: 'FA Cup',
            data: [14, 8, 8, 12]
        }, {
            name: 'CL',
            data: [0, 2, 6, 3]
        }]
    };
    Highcharts.chart('WTChart',options);
  }, []);

  return <div>
            <div id="WTChart"></div>
        </div>;
};

export default WorkingTimeChart;