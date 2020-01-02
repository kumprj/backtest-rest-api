import React from 'react';
import {TextField, Button} from '@material-ui/core';

export default ({handleSymbolFilterTyped, handleExpandAllClicked, expandAll}) => {
  return (
    <div className='options-pane'>
      <TextField
        label='Search by Symbol'
        onChange={handleSymbolFilterTyped}
      />
      <Button
        color={expandAll ? 'secondary' : 'primary'}
        variant='contained'
        size='large'
        onClick={handleExpandAllClicked}
      >
        {expandAll ? 'Collapse All' : 'Expand All'}
      </Button>
    </div>
  );
};
