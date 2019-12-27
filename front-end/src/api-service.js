import {DB_URL} from './config';
import {validateDate} from './utils';

export async function getStocksByDate(date) {
  validateDate(date);
  const response = await fetch(`${DB_URL}/${date}`);
  return await response.json();
}
