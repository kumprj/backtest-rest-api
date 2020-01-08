import React from 'react';
import Chart from 'react-apexcharts';

const convertToSeries = (data, field) => {
  data.sort((entry1, entry2) => {
    return parseInt(entry2['observation_period'].replace(' Months', '')) - parseInt(entry1['observation_period'].replace(' Months', ''));
  });

  const series = data.map(entry => field.convertToNumerical(entry[field.field]));

  return [{name: field.label, data: series}];
};

export default ({data, yAxis}) => {
  const series = convertToSeries(data, yAxis);

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: ['12 Months', '9 Months', '6 Months', '3 Months', '1 Month']
    },
    yaxis: {
      min: Number.isInteger(yAxis.min) ? yAxis.min : Math.min(...series[0].data) * 0.95,
      max: Number.isInteger(yAxis.max) ? yAxis.max : Math.max(...series[0].data) * 1.05,
    },
    fill: {
      opacity: 0.8
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type='bar'
        height={350}
      />
    </div>
  );
};