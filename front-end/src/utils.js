
// TODO: this method is horrible. Refactor eventually to use better constructs/3rd party lib
export const groupAndFilterDataBySymbol = (data, filter) => {
    const groupedData = {};

    data.forEach(entry => {
        if (groupedData[entry.symbol]) {
            groupedData[entry.symbol].push(entry)
        } else {
            groupedData[entry.symbol] = [entry]
        }
    });

    const dataList = [];

    Object.keys(groupedData).forEach(symbol => {
        if (filter === '' || (filter && symbol.startsWith(filter))) {
            dataList.push({
                symbol,
                rows: groupedData[symbol]
            })
        }
    });

    return dataList;
};

/**
 * @param {moment.Moment} date
 * @returns {string}
 */
export const formatDateForUrl = (date) => {
    const day = date.date().toString().padStart(2, '0');
    const month = (date.month() + 1).toString().padStart(2, '0');
    const year = date.year().toString().substr(2);

    return `${month}_${day}_${year}`;
};

