import React from 'react';
import Chart from 'react-apexcharts';
import {GRAPH_TYPES} from '../constants';

const convertDataToSeries = (data) => {
  const series = [];

  if (data) {
    data.forEach(candle => {
      series.push([new Date(candle.datetime), candle.close]);
    });
  }

  return [{name: 'Price (USD)', data: series}];
};

const colors = {
  RED: '#d32f2f',
  GREEN: '#2e7d32',
};

export default ({data}) => {
  const series = convertDataToSeries(data.candles);
  const isPositiveGrowth = (data.candles && data.candles.length) && (data.candles[0].open < data.candles[data.candles.length - 1].open);

  const options = {
    chart: {
      type: GRAPH_TYPES.AREA,
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    title: {
      text: data.symbol,
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    dataLabels: {
      enabled: false
    },
    toolbar: {
      show: false
    },
    stroke: {
      curve: 'straight',
      colors: isPositiveGrowth ? [colors.GREEN] : [colors.RED],
    },
    fill: {
      colors: isPositiveGrowth ? [colors.GREEN] : [colors.RED],
      opacity: 0.2
    },
  };

  return (
    <div>
      {(data.candles && data.candles.length > 0) &&
      <Chart
        options={options}
        type={GRAPH_TYPES.AREA}
        height={350}
        series={series}
      />
      }
    </div>
  );
};