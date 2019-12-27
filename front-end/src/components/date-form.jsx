import React from 'react';
import {DatePicker} from '@material-ui/pickers';

export default ({onDateChange, date}) => {
  return (
    <div>
      <DatePicker
        label="Date: "
        value={date}
        onChange={onDateChange}
      />
    </div>
  );
};
