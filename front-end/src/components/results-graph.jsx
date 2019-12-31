import React, {Component} from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation, ArgumentScale, BarSeries, ValueScale} from '@devexpress/dx-react-chart';
import {scaleBand} from '@devexpress/dx-chart-core';
import Select from '@material-ui/core/Select';

const values = {
  win_rate: {
    field: 'win_rate',
    label: 'Win Rate'
  },
  avg_return: {
    field: 'avg_return',
    label: 'Average Return'
  },
  avg_win: {
    field: 'avg_win',
    label: 'Average Win'
  },
  avg_loss: {
    field: 'avg_loss',
    label: 'Average Loss'
  },
  total_trades: {
    field: 'total_trades',
    label: 'Total Trades'
  },
  total_pos: {
    field: 'total_pos',
    label: 'Total Positive'
  },
  total_neg: {
    field: 'total_neg',
    label: 'Total Negative'
  },
};

const getValueScale = (fieldName) => {

};

const cleanDataForGraph = (dataRows) => {
  const graphRows = [];

  dataRows.forEach(row => {
    graphRows.push({
      observation_period: parseInt(row['observation_period'].replace(' Months', '')),
      win_rate: parseInt(row['win_rate'].replace('%', '')),
      avg_return: parseInt(row['avg_return'].replace('%', '')),
      avg_win: parseInt(row['avg_win'].replace('%', '')),
      avg_loss: parseInt(row['avg_loss'].replace('%', '')),
      total_trades: parseInt(row['total_trades']),
      total_pos: parseInt(row['total_pos']),
      total_neg: parseInt(row['total_neg'])
    });
  });
  return graphRows;
};

const format = () => tick => tick;

const ValueLabel = (props) => {
  const {text} = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}`}
    />
  );
};

export default class ResultGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yAxis: values.win_rate,
      graphData: cleanDataForGraph(this.props.data)
    };

    this.handleAxisFieldChange = this.handleAxisFieldChange.bind(this);
  }

  handleAxisFieldChange(event) {
    this.setState({
      yAxis: values[event.target.value]
    });
  }

  render() {
    return (
      <div>
        <Select
          native
          onChange={this.handleAxisFieldChange}
          value={this.state.yAxis.field}
        >
          {Object.entries(values).map(([name, value]) => {
            return (
              <option
                value={name}
                key={`${name}_key`}
              >
                {value.label}
              </option>);
          })}
        </Select>
        <Chart
          data={this.state.graphData}
        >
          <ArgumentScale
            factory={scaleBand}
          />
          <ArgumentAxis
            tickFormat={format}
          />

          <ValueScale
            factory={getValueScale(this.state.yAxis.field)}
          />
          <ValueAxis
            labelComponent={ValueLabel}
          />

          <BarSeries
            name={this.state.yAxis.name}
            valueField={this.state.yAxis.field}
            argumentField='observation_period'
          />
          <Animation />
        </Chart>
      </div>
    );
  }

}