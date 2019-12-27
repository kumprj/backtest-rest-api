import React, {Fragment} from "react";
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Table from './table';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default ({data, isExpanded}) =>
    <Fragment>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
            >
                {data.symbol}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Table
                    data={data.rows}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </Fragment>
