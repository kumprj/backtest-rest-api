export async function getStockHistory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStockData());
    });
  });
}

const getRandomStockPrice = () => {
  return Math.floor(Math.random() * (1420 - 1380 + 1) + 1350);
};

const mockStockData = () => {
  const stockEntries = [];

  for (let i = 0; i <= 65; i++) {
    stockEntries.push(
      {
        'open': getRandomStockPrice(),
        'close': getRandomStockPrice(),
        'high': getRandomStockPrice(),
        'low': getRandomStockPrice(),
        'volume': 100,
        'datetime': 1577569478 + (1800 * i)
      }
    );
  }
  return stockEntries;
};