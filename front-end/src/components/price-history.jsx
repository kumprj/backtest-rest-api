import React, {Component} from 'react';
import {Grid, Switch, Select} from '@material-ui/core';
import {getStockHistory} from '../services/api-service';
import PriceHistoryGraph from './price-history-graph';
import Typography from "@material-ui/core/Typography";

export default class PriceHistory extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      view: 'candlestick',
      period: 'monthly',
      graphData: []
    };
    
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.refreshGraphData = this.refreshGraphData.bind(this);
  }
  
  handleViewChange() {
    this.setState({
      view: this.state.view === 'area' ? 'candlestick' : 'area'
    });
  }
  
  handlePeriodChange(event) {
    this.setState({period: event.target.value}, () => {
      this.refreshGraphData();
    });
  }
  
  refreshGraphData() {
    getStockHistory(this.props.symbol).then(data => {
      this.setState({
        graphData: data
      });
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
                  checked={this.state.view === 'area'}
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
          <PriceHistoryGraph
            data={this.state.graphData}
            view={this.state.view}
          />
        </Grid>
      </Grid>
    );
  }
}