import React from 'react';
import Select from '@material-ui/core/Select';
import ResultsGraph from './results-graph';

const values = {
  win_rate: {
    field: 'win_rate',
    label: 'Win Rate',
    unit: '%',
    min: 0,
    max: 100,
    convertToNumerical: (value) => parseFloat(value.replace('%', ''))
  },
  avg_return: {
    field: 'avg_return',
    label: 'Average Return',
    unit: '%',
    min: -30,
    max: 30,
    convertToNumerical: (value) => parseFloat(value.replace('%', ''))
  },
  avg_win: {
    field: 'avg_win',
    label: 'Average Win',
    unit: '%',
    min: 0,
    max: 100,
    convertToNumerical: (value) => parseFloat(value.replace('%', ''))
  },
  avg_loss: {
    field: 'avg_loss',
    label: 'Average Loss',
    unit: '%',
    min: -100,
    max: 0,
    convertToNumerical: (value) => parseFloat(value.replace('%', ''))
  },
  total_trades: {
    field: 'total_trades',
    label: 'Total Trades',
    unit: null,
    convertToNumerical: (value) => parseInt(value)
  },
  total_pos: {
    field: 'total_pos',
    label: 'Total Positive',
    unit: null,
    convertToNumerical: (value) => parseInt(value)
  },
  total_neg: {
    field: 'total_neg',
    label: 'Total Negative',
    unit: null,
    convertToNumerical: (value) => parseInt(value)
  },
};

export default ({data}) => {
  const [yAxis, setYAxis] = React.useState(values.win_rate.field);

  const setAxis = (event) => {
    setYAxis(event.target.value);
  };

  return (
    <div>
      <Select
        native
        onChange={setAxis}
        value={yAxis}
      >
        {Object.entries(values).map(([name, value]) => {
          return (
            <option
              value={value.field}
              key={`${name}_key`}
            >
              {value.label}
            </option>);
        })}
      </Select>
      <ResultsGraph
        data={data}
        yAxis={values[yAxis]}
      />
    </div>
  );
};