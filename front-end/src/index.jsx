import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MomentUtils from '@date-io/moment';

import * as serviceWorker from './serviceWorker';

const Root = () => {
  return (
    <MuiThemeProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App/>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};


ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
