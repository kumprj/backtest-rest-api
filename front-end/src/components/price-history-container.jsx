import React, {Component} from 'react';
import {Grid, Switch, Select, Typography, CircularProgress} from '@material-ui/core';
import {getStockHistory} from '../services/api-service';
import PriceHistoryCandleStickGraph from './price-history-candlestick-graph';
import PriceHistoryLineGraph from './price-history-line-graph';
import {GRAPH_TYPES} from '../constants';


const determineViewToShow = (view, data) => {
  if (data) {
    if (data.length === 0) {
      return (
        <div align='center'>
          TD Ameritrade does not have stock history for this symbol.
        </div>
      );
    } else if (view === GRAPH_TYPES.AREA) {
      return <PriceHistoryLineGraph data={data}/>;
    } else {
      return <PriceHistoryCandleStickGraph data={data}/>;
    }
  } else {
    return (
      <div align='center'><CircularProgress /></div>
    );
  }
};

export default class PriceHistoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: GRAPH_TYPES.CANDLESTICK,
      period: 'monthly',
      graphData: null,
    };

    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.refreshGraphData = this.refreshGraphData.bind(this);
  }

  handleViewChange() {
    this.setState({
      view: this.state.view === GRAPH_TYPES.AREA ? GRAPH_TYPES.CANDLESTICK : GRAPH_TYPES.AREA
    });
  }

  handlePeriodChange(event) {
    this.setState({period: event.target.value}, () => {
      this.refreshGraphData();
    });
  }

  async refreshGraphData() {
    const data = await getStockHistory(this.props.symbol);
    this.setState({
      graphData: data
    });
  }

  componentDidMount() {
    this.refreshGraphData();
  }

  render() {
    return (
      <Grid
        component='div'
        container
      >
        <Grid item xs={9}/>
        <Grid item xs={2}>
          <Typography component='div'>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Candle</Grid>
              <Grid item>
                <Switch
                  checked={this.state.view === GRAPH_TYPES.AREA}
                  onChange={this.handleViewChange}
                />
              </Grid>
              <Grid item>Line</Grid>
            </Grid>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Select
            native
            onChange={this.handlePeriodChange}
            value={this.state.period}
          >
            <option value='hourly'>Hourly</option>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
          </Select>
        </Grid>
        <Grid item xs={12}>
          {determineViewToShow(this.state.view, this.state.graphData)}
        </Grid>
      </Grid>
    );
  }
}