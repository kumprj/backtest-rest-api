import {DB_URL} from '../api-config';
import {validateDate} from '../utils/utils';

export async function getStocksByDate(date) {
  validateDate(date);
  const response = await fetch(`${DB_URL}/${date}`);
  return await response.json();
}
