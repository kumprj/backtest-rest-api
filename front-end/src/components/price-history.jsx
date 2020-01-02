import React, {Component} from 'react';
import {getStockHistory} from '../services/mock-api-service';
import {ResponsiveContainer, CartesianGrid, Tooltip, YAxis, Area, AreaChart, XAxis} from 'recharts';
import moment from 'moment';

const tickFormatter = (epochTime) => {
  return moment.unix(epochTime).format('MM-DD hh:mm');
};

const formatTooltip = (value) => {
  return ['', `${value} USD`];
};

const formatTooltipLabel = (value) => {
  return `${moment.unix(value).format('MM-DD-YYYY hh:mm a')}`;
};

export default class PriceHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: [],
    };

    this.getStockData = this.getStockData.bind(this);
    this.determineFill = this.determineFill.bind(this);
    this.determineLineColor = this.determineLineColor.bind(this);
  }

  async getStockData() {
    // TODO: change the import so that this is using the non-mocked getStockHistory method
    return await getStockHistory(this.props.symbol);
  }

  determineFill() {
    if (this.state.graphData.length) {
      if (this.state.graphData[0].open < this.state.graphData[this.state.graphData.length - 1].open) {
        // light green
        return '#c8e6c9';
      } else if (this.state.graphData[0].open > this.state.graphData[this.state.graphData.length - 1].open) {
        // light red
        return '#ffcdd2';
      } else {
        // light gray
        return '#f5f5f5';
      }
    }
  }

  determineLineColor() {
    if (this.state.graphData.length) {
      if (this.state.graphData[0].open < this.state.graphData[this.state.graphData.length - 1].open) {
        // dark green
        return '#4caf50';
      } else if (this.state.graphData[0].open > this.state.graphData[this.state.graphData.length - 1].open) {
        // dark red
        return '#f44336';
      } else {
        // dark gray
        return '#9e9e9e';
      }
    }
  }

  componentDidMount() {
    this.getStockData().then(data => {
      this.setState({
        graphData: data
      });
    });
  }

  render() {
    return (
      <div style={{width: '100%', height: 350}}>
        <ResponsiveContainer>
          <AreaChart
            data={this.state.graphData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey='datetime'
              tickFormatter={tickFormatter}
            />
            <YAxis
              domain={['dataMin', 'dataMax + 10']}
            />
            <Tooltip
              formatter={formatTooltip}
              labelFormatter={formatTooltipLabel}
              separator=''
            />
            <Area
              dataKey='open'
              type='monotone'
              fill={this.determineFill()}
              stroke={this.determineLineColor()}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

