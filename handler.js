const db = require('./db_connect');

module.exports.getAllTodos = (event, context, callback) => {  
  context.callbackWaitsForEmptyEventLoop = false;  
  db.getAll('backtest_results_stg')
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Todos: ' + e
      })
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
    var input = event.pathParameters.todays_date
    var date = input.replaceAll("_", "/")
    console.log(date)
    const sql = "select symbol, indicator_level, avg_return, avg_win, avg_loss, observation_period from backtest_results_10ma where todays_date = $1 order by symbol, cast(left(observation_period, position(' ' IN observation_period)-1) as int)"
    const result = await db.query(sql, date)
	  .then(res => {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(res)
		})
	  });
    //console.log(result)
   } catch (e) {
	console.log(e)
   }

};

// Get MA results
module.exports.getMaResults = async (event, context, callback) => {  

  context.callbackWaitsForEmptyEventLoop = false;  
  try {
    var input = event.pathParameters.todays_date
    var date = input.replaceAll("_", "/")
    console.log(date)
    const sql = "select symbol, indicator_level, avg_return, avg_win, avg_loss, observation_period from backtest_results_10ma where todays_date = $1 order by symbol, cast(left(observation_period, position(' ' IN observation_period)-1) as int)"
    const result = await db.query(sql, date)
	  .then(res => {
		callback(null, {
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
