import React, {Component} from 'react';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default class OptionsPane extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='options-pane'>
                <TextField
                    label='Search by Symbol'
                    onChange={this.props.handleSymbolFilterTyped}
                />
                <Button
                    color='secondary'
                    variant='contained'
                    size='large'
                    onClick={this.props.handleExpandAllClicked}
                >
                    {this.props.expandAll ? 'Collapse All' : 'Expand All'}
                </Button>
            </div>
        );
    }
}
