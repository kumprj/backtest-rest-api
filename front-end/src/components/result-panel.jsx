import React, {Fragment} from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Tabs,
  Tab,
} from '@material-ui/core';
import Table from './results-table';
import PriceHistory from './price-history';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ResultGraph from './results-graph';

const TABLE = 'table';
const GRAPH = 'graph';
const HISTORY = 'history';

export default ({data, isDefaultExpanded}) => {

  const [expanded, setExpanded] = React.useState(false);
  const [toggleView, setView] = React.useState(TABLE);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const handleViewChange = (event, value) => {
    setView(value);
  };

  let displayComponent;

  if (toggleView === HISTORY) {
    displayComponent = <PriceHistory symbol={data.symbol} />;
  } else if (toggleView === GRAPH) {
    displayComponent = <ResultGraph data={data.rows}/>;
  } else {
    displayComponent = <Table data={data.rows}/>;
  }


  return (
    <Fragment>
      <ExpansionPanel
        expanded={isDefaultExpanded || expanded}
        onChange={handleChange}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          {data.symbol}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid component="div" container alignItems="center" spacing={1}>
            <Grid item>
              <Tabs
                value={toggleView}
                onChange={handleViewChange}
                indicatorColor='primary'
                textColor='primary'
                centered
              >
                <Tab value={TABLE} label='Table'/>
                <Tab value={GRAPH} label='Graph'/>
                <Tab value={HISTORY} label='History'/>
              </Tabs>
            </Grid>
            <Grid item xs={12}>
              {(expanded || isDefaultExpanded) && displayComponent}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
};
