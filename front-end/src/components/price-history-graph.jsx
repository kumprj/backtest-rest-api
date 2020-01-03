import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

const getFormatByPeriod = (period) => {
  if (period === 'monthly' || period === 'weekly') {
    return 'MM-DD-YYYY';
  } else if (period === 'daily') {
    return 'MM-DD';
  } else {
    return 'MM-DD hh:mm';
  }
};

const convertDataToSeries = (data, view) => {
  const series = [];

  if (data) {
    if (view === 'candlestick') {
      data.forEach(candle => {
        series.push({
          x: new Date(candle.datetime),
          y: [candle.open, candle.high, candle.low, candle.close]
        });
      });
    } else {
      data.forEach(candle => {
        series.push([candle.datetime, candle.close]);
      });
    }
  }

  return [{data: series}];
};

export default ({data, view}) => {
  const series = convertDataToSeries(data.candles, view);

  const options = {
    chart: {
      type: view,
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
  if (view === 'area') {
    options.stroke = {
      curve: 'straight',
      colors: ['#388e3c'],
    };

    options.fill = {
      colors: ['#e8f5e9']
    };


  }

  return (
    <div>
      {(data.candles && data.candles.length > 0) &&
      <Chart
        options={options}
        type={view}
        height={350}
        series={series}
      />
      }
    </div>
  );
};

