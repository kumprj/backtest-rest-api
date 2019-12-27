import React, {Component} from 'react';
import moment from 'moment'
import {Container, CircularProgress} from '@material-ui/core';

import DateForm from './components/date-form';
import ResultsList from './components/results-list';
import OptionsPane from "./components/options";

import {getStocksByDate} from './api-service';
import {formatDateForUrl} from './utils';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: [],
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
        })
    };

    async refreshTable() {
        const formattedDate = formatDateForUrl(this.state.searchDate);
        const jsonData = await getStocksByDate(formattedDate);
        this.setState({tableData: jsonData, loading: false})
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
                {this.state.loading
                    ?
                    <div className='absolute-center'>
                        <CircularProgress />
                    </div>
                    :
                    <ResultsList
                        data={this.state.tableData}
                        symbolSearch={this.state.symbolSearch}
                        expandAll={this.state.expandAll}
                    />

                }
            </Container>
        )
    }
}
