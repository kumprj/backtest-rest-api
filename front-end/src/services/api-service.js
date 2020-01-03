import {DB_URL, STOCK_HISTORY_URL} from '../api-config';
import {validateDate} from '../utils/utils';

export async function getStocksByDate(date) {
  validateDate(date);
  const response = await fetch(`${DB_URL}/${date}`);
  return await response.json();
}

export async function getStockHistory(symbol) {
  const url = `${STOCK_HISTORY_URL}/${symbol}`;
  const response = await fetch(url);
  return await response.json();
}
