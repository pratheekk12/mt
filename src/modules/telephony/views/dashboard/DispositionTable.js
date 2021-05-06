import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { DataGrid } from '@material-ui/data-grid';
import { DistributerCallColumns } from '../../../../../src/modules/dashboard-360/utils/columns-config';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    grey: {
        color: theme.palette.getContrastText(grey[50]),
        backgroundColor: grey[50]
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    paper: {
        textAlign: 'center'
    },
    list: {},
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        marginRight: '0.5vw'
    },
    listItem: {
        padding: 0
    },
    cardcontent: {
        padding: '0 0 0 5%',
        '&:last-child': {
            paddingBottom: 0
        }
    }
}));


const DisInboundTable = (props) => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [agentdisposedCalls, setagentdisposedCalls] = useState([])
    useEffect(() => {
        if (props.agentdisposedCalls.length) {
            setagentdisposedCalls(props.agentdisposedCalls)
        }

    }, [agentdisposedCalls]);
    return (
        <>
            <div className={classes.root}>

                {agentdisposedCalls.length ?
                    <DataGrid
                        page={page}
                        onPageChange={params => {
                            setPage(params.page);
                        }}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        autoHeight
                        columns={DistributerCallColumns}
                        rows={agentdisposedCalls.map(calls => ({
                            ...calls,
                            id: calls._id
                        }))}
                    />
                    : <></>}
            </div>

        </>
    );
};
export default DisInboundTable;
