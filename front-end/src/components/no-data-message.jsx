import {Card, CardContent, Typography} from '@material-ui/core';
import React from 'react';

export default ({date}) => {
  const style = {
    'text-align': 'center',
  };

  return (
    <Card>
      <CardContent>
        <Typography style={style} color='textSecondary'>
          No data found for {date.format('MM-DD-YYYY')}
        </Typography>
      </CardContent>
    </Card>
  );
};