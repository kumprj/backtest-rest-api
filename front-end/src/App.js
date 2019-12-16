import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Table from "./table";
const db_url = 'https://4w629k6x07.execute-api.us-east-2.amazonaws.com/dev/backtest_results_10ma';

const getCurrentFormmatedDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = `${mm}_${dd}_${yyyy}`;
  return today;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      date: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    //  TODO: Verify the given date is formatted properly. Need both client/server validation
    fetch(`${db_url}/${this.state.date}`)
      .then(response => response.json())
      .then(data => this.setState({ tableData: data }));
    event.preventDefault();
  }


  // This function is called post render. React lifecycle is weird. 
  // Essentially, this will run before the site is visually displayed to the user
  componentDidMount() {
    const today = getCurrentFormmatedDate();
    fetch(`${db_url}/${today}`)
      .then(response => response.json())
      .then(data => this.setState({ tableData: data }));
  }

  // TODO: Maybe dont hardcode the 
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label value={this.state.date} onChange={this.handleChange}>
              Date:
            <input type="text" name="date" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Table
            data={this.state.tableData}
            header={[
              {
                name: "Symbol",
                prop: "symbol"
              },              
              {
                name: "Indicator level",
                prop: "indicator_level"
              },
              {
                name: "Win Rate",
                prop: "win_rate"
              },
              {
                name: "Average return",
                prop: "avg_return"
              },
              {
                name: "Average win",
                prop: "avg_win"
              },
              {
                name: "Average loss",
                prop: "avg_loss"
              },
              {
                name: "Observation period",
                prop: "observation_period"
              },
              {
                name: "Total Trades",
                prop: "total_trades"
              },
              {
                name: "Total Positive",
                prop: "total_pos"
              },
              {
                name: "Total Negative",
                prop: "total_neg"
              },

            ]}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;