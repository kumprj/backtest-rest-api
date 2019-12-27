/* API JSON Fields
*
* column spec according to https://github.com/gregnb/mui-datatables
*/
export const API_HEADERS = [
  {
    label: 'Ticker',
    name: 'symbol'
  },
  {
    label: 'Indicator level',
    name: 'indicator_level'
  },
  {
    label: 'Win Rate',
    name: 'win_rate'
  },
  {
    label: 'Average return',
    name: 'avg_return'
  },
  {
    label: 'Average win',
    name: 'avg_win'
  },
  {
    label: 'Average loss',
    name: 'avg_loss'
  },
  {
    label: 'Observation period',
    name: 'observation_period',
    options: {
      sort: false
    }
  },
  {
    label: 'Total Trades',
    name: 'total_trades'
  },
  {
    label: 'Total Positive',
    name: 'total_pos'
  },
  {
    label: 'Total Negative',
    name: 'total_neg'
  }
];

/* API URL */
export const DB_URL = 'https://4w629k6x07.execute-api.us-east-2.amazonaws.com/dev/backtest_results_stg';

