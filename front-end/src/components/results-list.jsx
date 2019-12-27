import React from 'react';
import ResultPanel from './result-panel';
import {groupAndFilterDataBySymbol} from '../utils/utils';

export default ({symbolSearch, data, expandAll}) => {
  return (
    <div>
      {groupAndFilterDataBySymbol(data, symbolSearch).map(stockData =>
        <ResultPanel
          key={stockData.symbol}
          data={stockData}
          isDefaultExpanded={expandAll}
        />
      )}
    </div>
  );
};
