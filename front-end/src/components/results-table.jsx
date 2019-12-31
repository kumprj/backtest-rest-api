import React from 'react';
import {API_HEADERS} from '../api-config';
import {Paper} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';


const options = {
  responsive: 'scrollMaxHeight',
  fixedHeaderOptions: {xAxis: true, yAxis: true},
  selectableRows: 'none',
  pagination: false,
  search: false,
  filter: false,
};

export default ({data}) =>
  <Paper className='container'>
    <MUIDataTable
      data={data}
      columns={API_HEADERS}
      options={options}
    />
  </Paper>;


