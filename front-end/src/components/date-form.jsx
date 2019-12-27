import React, {Component} from 'react';
import {DatePicker} from '@material-ui/pickers';

class DateForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.onDateChange(date);
  }

  render() {
    return (
      <div>
        <DatePicker
          label="Date: "
          value={this.props.date}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DateForm;
