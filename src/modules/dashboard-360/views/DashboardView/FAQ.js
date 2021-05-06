import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    maxW50: {
        maxWidth: '50%',
        width: '50%'
    },
    customLink: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    chipPrimary: {
        backgroundColor: theme.palette.success.light
    },
    rootChip: {
        color: theme.palette.common.white
    },
    chipWarning: {
        backgroundColor: theme.palette.warning.light
    },
    mt1: {
        marginTop: '0.25rem'
    },
    container1: {
        position: 'relative',
        '&::after': {
            content: 'no-open-quote',
            borderRight: '1px solid rgba(0,0,0,0.2)',
            height: '60%',
            position: 'absolute',
            right: 0,
            top: '50%',
            bottom: '50%',
            transform: 'translateY(-50%)'
        }
    },
    profileIcon: {
        right: 5
    },
    dialog: {
        minWidth: 400
    }
}));

export default function FAQ({ }) {
    const classes = useStyles();


    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        FAQ Sample 1
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Details</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                    FAQ Sample 2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Details</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                    FAQ Sample 3
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Details</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
