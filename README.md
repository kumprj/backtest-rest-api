
- Endpoint is https://4w629k6x07.execute-api.us-east-2.amazonaws.com/dev/backtest_results_stg/{todays_date}
    - you can just curl that url with an underscored date (see next line)
    - {today's_date} is formatted like so: 11_23_19. For days 1-9, it needs to be 11_09_19
- Vision is Home page that has two things on the homepage
    - button that says "today" and when you hit the button, it reloads the page as website.com/11_23_19 (or whatever today is) and hits the rest api for that date. 
    - Or, text box where you can enter a date (it doesn't need great error handling, maybe it just takes an entry like 11_10_19) and maybe goes to a webpage for that date.
    Then hits the  api for that value
-  api returns (in most cases) 5 results per symbol: https://imgur.com/a/K0Jxmb4
    - so for each Symbol, there needs to be a table for the below information. So the headers might be symbol/indicator level/win rate / avg win / avg loss/ 
    and the left hand would. Sample table in excel https://imgur.com/a/r89Q18J
    - Goal is just a nicely formatted table like that, for each symbol for that day. so it could have 0 tables one day, 9 the next.
    - Can you leave a little space between the tables. I'm going to eventually want to query Stock Prices for that ticker and make a graph below the Table. 