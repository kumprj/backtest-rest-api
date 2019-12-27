import React, {Component} from 'react';
import moment from 'moment'
import DateForm from './components/date-form';
import {getStocksByDate} from './api-service';
import ResultsList from './components/results-list';
import {Container} from '@material-ui/core';
import {formatDateForUrl} from './utils';
import OptionsPane from "./components/options";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: [],
            searchDate: null,
            expandAll: false,
            symbolSearch: '',
        };

        this.handleDateChanged = this.handleDateChanged.bind(this);
        this.refreshTable = this.refreshTable.bind(this);

        this.handleExpandAllToggle = this.handleExpandAllToggle.bind(this);
        this.handleSymbolTyped = this.handleSymbolTyped.bind(this);
    }

    async handleDateChanged(date) {
        this.setState({searchDate: date}, () => {
            this.refreshTable();
        })
    };

    async refreshTable() {
        const formattedDate = formatDateForUrl(this.state.searchDate);
        const jsonData = await getStocksByDate(formattedDate);
        this.setState({tableData: jsonData})
    }

    handleExpandAllToggle() {
        this.setState({
            expandAll: !this.state.expandAll
        })
    }

    handleSymbolTyped(event) {
        this.setState({
            symbolSearch: event.target.value.toUpperCase()
        })
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
                <ResultsList
                    data={this.state.tableData}
                    symbolSearch={this.state.symbolSearch}
                    expandAll={this.state.expandAll}
                />
            </Container>
        )
    }
}
