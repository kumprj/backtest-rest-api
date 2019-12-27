import React, {Fragment} from 'react';
import {ExpansionPanel, ExpansionPanelDetails} from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Table from './table';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default ({data, isDefaultExpanded}) => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Fragment>
      <ExpansionPanel
        expanded={isDefaultExpanded || expanded}
        onChange={handleChange}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
        >
          {data.symbol}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {(expanded || isDefaultExpanded) &&
            <Table
              data={data.rows}
            />
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  )
}
