import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ReferenceLine
} from 'recharts';

const values = {
  win_rate: {
    field: 'win_rate',
    label: 'Win Rate',
    unit: '%',
    domain: [0, 100]
  },
  avg_return: {
    field: 'avg_return',
    label: 'Average Return',
    unit: '%',
    domain: [-50, 50]
  },
  avg_win: {
    field: 'avg_win',
    label: 'Average Win',
    unit: '%',
    domain: [0, 100]
  },
  avg_loss: {
    field: 'avg_loss',
    label: 'Average Loss',
    unit: '%',
    domain: [-100, 0]
  },
  total_trades: {
    field: 'total_trades',
    label: 'Total Trades',
    unit: null,
    domain: ['auto', 'auto']
  },
  total_pos: {
    field: 'total_pos',
    label: 'Total Positive',
    unit: null,
    domain: ['auto', 'auto']
  },
  total_neg: {
    field: 'total_neg',
    label: 'Total Negative',
    unit: null,
    domain: ['auto', 'auto']
  },
};

const cleanDataForGraph = (dataRows) => {
  const graphRows = [];

  dataRows.forEach(row => {
    graphRows.push({
      observation_period: parseInt(row['observation_period'].replace(' Months', '')),
      win_rate: parseFloat(row['win_rate'].replace('%', '')),
      avg_return: parseFloat(row['avg_return'].replace('%', '')),
      avg_win: parseFloat(row['avg_win'].replace('%', '')),
      avg_loss: parseFloat(row['avg_loss'].replace('%', '')),
      total_trades: parseInt(row['total_trades']),
      total_pos: parseInt(row['total_pos']),
      total_neg: parseInt(row['total_neg'])
    });
  });
  return graphRows;
};

const formatTooltip = (value, name) => {
  const formattedValue = `${value}${values[name].unit}`;

  return [values[name].label, formattedValue];
};

const formatTooltipLabel = (value) => {
  return `${value} Months`;
};

const getReferenceLine = (field) => {
  if (field === values.win_rate.field) {
    return 50;
  } else if (field === values.avg_return.field) {
    return 0;
  }
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
        <div style={{width: '100%', height: 350}}>
          <ResponsiveContainer>
            <BarChart
              data={this.state.graphData}
              margin={{top: 20, bottom: 10}}
            >
              <XAxis
                dataKey='observation_period'
                unit=' Months'
                reversed
              >
                <Label
                  value='Observation Period'
                  position='insideBottom'
                  offset={-10}
                />
              </XAxis>
              <YAxis
                label={{ value: this.state.yAxis.label, angle: -90, position: 'insideLeft' }}
                unit={this.state.yAxis.unit}
                domain={this.state.yAxis.domain}
              />
              <Tooltip
                formatter={formatTooltip}
                labelFormatter={formatTooltipLabel}
              />
              <ReferenceLine
                y={getReferenceLine(this.state.yAxis.field)}
                strokeDasharray="3 3"
                stroke='red'
              />
              <Bar
                dataKey={this.state.yAxis.field}
                fill='#002984'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

}