import React, {Component} from 'react';
import ResultPanel from './result-panel';
import {groupAndFilterDataBySymbol} from '../utils';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {groupAndFilterDataBySymbol(this.props.data, this.props.symbolSearch).map(stockData =>
          <ResultPanel
            key={stockData.symbol}
            data={stockData}
          />
        )}
      </div>
    );
  }
}
