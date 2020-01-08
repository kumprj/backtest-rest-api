import React, {Component} from 'react';
import moment from 'moment';
import {Container, CircularProgress} from '@material-ui/core';
import {DateForm, ResultsList, OptionsPane, NoDataMessage} from '../components';
import {getStocksByDate} from '../services/api-service';
import {formatDateForUrl} from '../utils/utils';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: null,
      searchDate: null,
      expandAll: false,
      symbolSearch: '',
      loading: true,
    };

    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.refreshTable = this.refreshTable.bind(this);

    this.handleExpandAllToggle = this.handleExpandAllToggle.bind(this);
    this.handleSymbolTyped = this.handleSymbolTyped.bind(this);
  }

  async handleDateChanged(date) {
    this.setState({searchDate: date, loading: true}, () => {
      this.refreshTable();
    });
  }

  async refreshTable() {
    const formattedDate = formatDateForUrl(this.state.searchDate);
    const jsonData = await getStocksByDate(formattedDate);
    this.setState({tableData: jsonData, loading: false});
  }

  handleExpandAllToggle() {
    this.setState({expandAll: !this.state.expandAll}, () => {
      // forced re-render of results list to show them all expanded
      this.setState({tableData: this.state.tableData});
    });
  }

  handleSymbolTyped(event) {
    this.setState({
      symbolSearch: event.target.value.toUpperCase()
    });
  }

  componentDidMount() {
    this.refreshTable();
  }

  componentWillMount() {
    this.setState({
      searchDate: moment()
    });
  }

  render() {
    return (
      <Container>
        <DateForm
          onDateChange={this.handleDateChanged}
          date={this.state.searchDate}
        />
        <OptionsPane
          handleExpandAllClicked={this.handleExpandAllToggle}
          handleSymbolFilterTyped={this.handleSymbolTyped}
          expandAll={this.state.expandAll}
        />
        {this.state.loading
          ?
          <div className='absolute-center'>
            <CircularProgress />
          </div>
          : (this.state.tableData.length > 0
            ?
            <ResultsList
              data={this.state.tableData}
              symbolSearch={this.state.symbolSearch}
              expandAll={this.state.expandAll}
            />
            :
            <NoDataMessage date={this.state.searchDate}/>
          )
        }
      </Container>
    );
  }
}
