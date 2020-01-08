import React from 'react';
import Chart from 'react-apexcharts';
import {GRAPH_TYPES} from '../constants';

const convertDataToSeries = (data) => {
  const series = [];

  data.forEach(candle => {
    series.push([new Date(candle.datetime), candle.close]);
  });

  return [{name: 'Price (USD)', data: series}];
};

const colors = {
  RED: '#d32f2f',
  GREEN: '#2e7d32',
};

// TODO: find a way to combine this component with price-history-candlestick-graph.jsx and render conditionally.
export default ({data}) => {
  const series = convertDataToSeries(data.candles);
  const isPositiveGrowth = data.candles[0].close < data.candles[data.candles.length - 1].close;

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
      <Chart
        options={options}
        type={GRAPH_TYPES.AREA}
        height={350}
        series={series}
      />
    </div>
  );
};
