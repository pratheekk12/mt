import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

export default function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Paper square>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && children}
            </div>
        </Paper>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};