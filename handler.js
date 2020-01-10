const db = require('./db_connect');
const request = require('request');
const key = process.env.API_KEY;

module.exports.getBars = (event, context, callback) => {
  const symbol = event.pathParameters.symbol;
  const apiUrl = `https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory?apikey=${key}&periodType=year&period=1&frequencyType=weekly&frequency=1`;

  context.callbackWaitsForEmptyEventLoop = false;
  request.get(apiUrl, (error, response, body) => {
    if (error) {
      console.log(error);
    } else if (response.statusCode === 200 && body) {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*' // Required for CORS support to work
        },
        body
      })
    } else {
      callback(`Error processing request to TD Ameritrade API, returned status code: ${response.statusCode} for URI: ${apiUrl}`)
    }
  })
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

// Get ML Model results
module.exports.getMLResults = async (event, context, callback) => {  

  context.callbackWaitsForEmptyEventLoop = false;  
  try {
    const sql = "select * from currentmodelsignals"
    const result = await db.query(sql)
	  .then(res => {
		callback(null, {
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
			statusCode: 200,
			body: JSON.stringify(res)
		})
	  });
    //console.log(result)
   } catch (e) {
	console.log(e)
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
