import React from 'react';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default ({handleSymbolFilterTyped, handleExpandAllClicked, expandAll}) => {
  return (
    <div className='options-pane'>
      <TextField
        label='Search by Symbol'
        onChange={handleSymbolFilterTyped}
      />
      <Button
        color='secondary'
        variant='contained'
        size='large'
        onClick={handleExpandAllClicked}
      >
        {expandAll ? 'Collapse All' : 'Expand All'}
      </Button>
    </div>
  );
};
