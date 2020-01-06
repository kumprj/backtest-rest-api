import React from 'react';
import Chart from 'react-apexcharts';
import {GRAPH_TYPES} from '../constants';

const convertDataToSeries = (data) => {
  const series = [];

  if (data) {
    data.forEach(candle => {
      series.push({
        x: new Date(candle.datetime),
        y: [candle.open, candle.high, candle.low, candle.close]
      });
    });
  }

  return [{name: 'Price (USD)', data: series}];
};

export default ({data, view}) => {
  const series = convertDataToSeries(data.candles, view);
  const options = {
    chart: {
      type: GRAPH_TYPES.CANDLESTICK,
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
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    toolbar: {
      show: false
    },
  };

  return (
    <div>
      {(data.candles && data.candles.length > 0) &&
      <Chart
        options={options}
        type={GRAPH_TYPES.CANDLESTICK}
        height={350}
        series={series}
      />
      }
    </div>
  );
};
