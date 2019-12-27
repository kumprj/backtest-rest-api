import {DB_URL} from "./config";

const validateDate = (date) => {
    if (typeof date !== 'string') {
        throw new Error('Invalid date input')
    }
    const dateParts = date.split('_');

    if (dateParts.length !== 3) {
        throw new Error('Missing month, day, or year field');
    }

    if (dateParts.some(datePart => datePart.length !== 2)) {
        throw new Error('Month, day, or year is improperly formatted');
    }
};

export async function getStocksByDate(date) {
    validateDate(date);
    const response = await fetch(`${DB_URL}/${date}`);
    return await response.json();
}
