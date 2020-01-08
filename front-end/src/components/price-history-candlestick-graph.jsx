import React from 'react';
import Chart from 'react-apexcharts';
import {GRAPH_TYPES} from '../constants';
import CircularProgress from '@material-ui/core/CircularProgress';

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

// TODO: find a way to combine this component with price-history-line-graph.jsx and render conditionally
export default ({data, view}) => {
  if (data && data.candles) {
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
        <Chart
          options={options}
          type={GRAPH_TYPES.CANDLESTICK}
          height={350}
          series={series}
        />
      </div>
    );
  } else {
    return (
      <div align='center'>
        <CircularProgress />
      </div>
    );
  }
};
