import {formatDateForUrl, groupAndFilterDataBySymbol, validateDate} from '../utils/utils';
import moment from 'moment';

describe('groupAndFilterDataBySymbol', () => {
  it('creates a list of objects with symbol and rows fields', () => {
    const testData = [
      {symbol: 'TEST', data1: 1, data2: 2, data3: 3, data4: 'testing'},
      {symbol: 'TEST', data1: 4, data2: 1, data3: 2, data4: 'testing2'},
      {symbol: 'TEST2', data1: 2, data2: 3, data3: 4, data4: 'testing2'},
    ];

    const dataBySymbolWithRows = groupAndFilterDataBySymbol(testData);

    expect(dataBySymbolWithRows).toHaveLength(2);

    expect(dataBySymbolWithRows[0].symbol).toEqual('TEST');
    expect(dataBySymbolWithRows[0].rows).toHaveLength(2);

    expect(dataBySymbolWithRows[1].symbol).toEqual('TEST2');
    expect(dataBySymbolWithRows[1].rows).toHaveLength(1);
  });

  it('filters symbols to only those starting with filter prefix', () => {
    const testData = [
      {symbol: 'TEST', data1: 1, data2: 2, data3: 3, data4: 'testing'},
      {symbol: 'TEST2', data1: 4, data2: 1, data3: 2, data4: 'testing2'},
      {symbol: 'JEST', data1: 2, data2: 3, data3: 4, data4: 'testing2'},
    ];

    const dataBySymbolWithRows = groupAndFilterDataBySymbol(testData, 'TEST');

    expect(dataBySymbolWithRows).toHaveLength(2);
  });
});

describe('formatDateForUrl', () => {
  it('offsets months by one to account for zero index', () => {
    const date = moment('2019-01-01');

    const formattedDate = formatDateForUrl(date);

    expect(formattedDate).toHaveLength(8);
    expect(formattedDate.substring(0, 2)).toEqual('01');
  });

  it('pads single digit month and day', () => {
    const date = moment('2019-02-02');

    const formattedDate = formatDateForUrl(date);

    expect(formattedDate).toHaveLength(8);
    expect(formattedDate.substring(0, 2)).toEqual('02');
    expect(formattedDate.substring(3, 5)).toEqual('02');
  });
});

describe('validateDate', () => {
  it('throws error if value is not a string', () => {
    const types = [null, undefined, 1, false, {}, []];

    types.forEach(type => {
      expect(() => {validateDate(type);}).toThrow(TypeError);
    });
  });

  it('throws error if value is not proper format', () => {
    const strings = ['01-01-2019, 01-01-19, 01/01/2019', '01/01/19', '010119', '01012019', '01_01', '01'];

    strings.forEach(string => {
      expect(() => {validateDate(string);}).toThrowError();
    });
  });

  it('throws error if value has wrong length for values', () => {
    const values = ['01_01_2019', '1_01_19', '01_1_19'];

    values.forEach(value => {
      expect(() => validateDate(value)).toThrowError();
    });
  });

  it('does not throw error if date is correct format', () => {
    const date = '01_01_19';

    expect(() => validateDate(date)).not.toThrowError();
  });
});
