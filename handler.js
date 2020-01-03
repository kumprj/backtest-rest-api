const db = require('./db_connect');
const request = require('request');

// module.exports.getBars = async (event, context, callback) => {
//   const curl = new (require( 'curl-request' ))();
//   const code = "Authorization: ";
//   curl.setHeaders([code])
//       .get('https://api.tdameritrade.com/v1/marketdata/AAPL/pricehistory?apikey=IDLDIAQZL3ZV2GGZWD5TNDDTF3YPPPEE&periodType=year&period=1&frequencyType=weekly&frequency=1')
//       .then(({statusCode, body, headers}) => {
//         callback(null, {
//           headers: {
//             "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
//           },          
//           statusCode: 200,
//           body: JSON.stringify(body)
//         })
//       })
//       .catch((e) => {
//           console.log(e);
//   });
// };

// ROBBIE VERSION
// module.exports.getBars = async (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   const request = require('request');
//   const result = request('https://api.tdameritrade.com/v1/marketdata/AAPL/pricehistory?apikey=IDLDIAQZL3ZV2GGZWD5TNDDTF3YPPPEE&periodType=year&period=1&frequencyType=weekly&frequency=1',
//     {json: true}, (err, res, body)
//       .callback(null, {
//         statusCode: 200,
//         body: JSON.stringify(res)
//
//       })
//   );
//   console.log(result);
// };

// NICK VERSION
module.exports.getBars = async (params, callback) => {
  const apiUrl = 'https://api.tdameritrade.com/v1/marketdata/AAPL/pricehistory?apikey=IDLDIAQZL3ZV2GGZWD5TNDDTF3YPPPEE&periodType=year&period=1&frequencyType=weekly&frequency=1';

  request(apiUrl, {method: 'get', json: true}, (err, res, body) => {
    if (err) {
      return console.log(err);
    } else if (res.statusCode === 200 && body) {
      callback(null,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          statusCode: 200,
          body: JSON.parse(body)
        }
      );
    }
  });
};

String.prototype.replaceAll = function (stringToFind, stringToReplace) {
  if (stringToFind === stringToReplace) return this;
  var temp = this;
  var index = temp.indexOf(stringToFind);
  while (index != -1) {
    temp = temp.replace(stringToFind, stringToReplace);
    index = temp.indexOf(stringToFind);
  }
  return temp;
};

module.exports.getResults = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    var input = event.pathParameters.todays_date;
    var date = input.replaceAll('_', '/');
    console.log(date);
    const sql = 'select symbol, indicator_level, win_rate, avg_return, avg_win, avg_loss, observation_period, total_trades, total_pos, total_neg from backtest_results_stg where todays_date = $1 order by symbol, cast(left(observation_period, position(\' \' IN observation_period)-1) as int)';
    const result = await db.query(sql, date)
      .then(res => {
        callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*' // Required for CORS support to work
          },
          statusCode: 200,
          body: JSON.stringify(res)
        });
      });
    //console.log(result)
  } catch (e) {
    console.log(e);
  }

};

// Get MA results
module.exports.getMaResults = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    var input = event.pathParameters.todays_date;
    var date = input.replaceAll('_', '/');
    console.log(date);
    const sql = 'select symbol, indicator_level, win_rate, avg_return, avg_win, avg_loss, observation_period, total_trades, total_pos, total_neg from backtest_results_10ma where todays_date = $1 order by symbol, cast(left(observation_period, position(\' \' IN observation_period)-1) as int)';
    const result = await db.query(sql, date)
      .then(res => {
        callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*' // Required for CORS support to work
          },
          statusCode: 200,
          body: JSON.stringify(res)
        });
      });
    //console.log(result)
  } catch (e) {
    console.log(e);
  }

};

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
