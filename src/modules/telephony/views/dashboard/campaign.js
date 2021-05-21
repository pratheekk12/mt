import React, { useEffect, useState } from 'react'
import TimePicker from './timepicker'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    makeStyles,
    Typography,
    TextField,
    Paper,
    Button,
    Tooltip,
    IconButton

} from '@material-ui/core';
import moment from 'moment';
import Date from './DaterangeReport'
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios'
import FileUpload from './FileUpload3'





const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        margin: '1rem 2rem'
    }
}));

const Campaign = (props) => {
    const classes = useStyles();
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndtime] = useState("")
    const [queue, setQueue] = useState("")
    const [campaignRetry, setRetry] = useState("")
    const [campaignName, setcampaignname] = useState("")
    const [date, setdate] = useState("")
    const [campaigns, setCampaigns] = useState([])
    const [disable, setDisable] = useState(true)


    useEffect(() => {
        getCampaigns()
    }, [])

    const handleQueueChange = (e) => setQueue(e.target.value)
    const handleretryChange = (e) => {
        setRetry(e.target.value)
        setDisable(false)
    }
    const handlecampaignNameChange = (e) => setcampaignname(e.target.value)

    const handleReset = () => {
        setdate("")
        setStartTime("")
        setEndtime("")
        setQueue("")
        setRetry("")
        setcampaignname("")

    }

    const handleTime = (time, label) => {
        if (label === 'start time') {
            console.log(time)
            const time1 = moment(time).format()
            const time2 = time1.replace('T', " ").slice(10, 19)
            setStartTime(time2)

        } else if (label === 'End time') {
            const time1 = moment(time).format()
            const time2 = time1.replace('T', " ").slice(10, 19)
            setEndtime(time2)
        }

    }

    const handleAddCampaign = (e) => {
        const data = {
            "campaignName": campaignName,
            "campaignQueue": queue,
            "campaignStartDate": `${date}${startTime}`,
            "campaignEndDate": `${date}${endTime}`,
            "campaignRetry": campaignRetry
        }

        axios.post(`http://192.168.3.36:62008/api/Create_Campaign`, data)
            .then((response) => {
                console.log(response.data)
                handleReset()
            })
            .catch((error) => {
                console.log(error)
            })
        // console.log(data)

    }

    const updateCampaign = (id, status) => {
        const data = {
            "campaignID": id,
            "campaignStatus": status

        }
        console.log(data, "fdsfsd")

        axios.post(`http://192.168.3.36:62008/api/Update_Status_Campaign`, data)
            .then((response) => {
                console.log(response.data, "update")
                getCampaigns()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getCampaigns = () => {
        var axios = require('axios');
        var data = '';

        var config = {
            method: 'get',
            url: 'http://192.168.3.36:62008/api/getCampaign',
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.length > 0) {
                    response.data.map((ele) => {
                        return ele.datetime_end === ele.datetime_end.slice(0, 10)
                    })
                }
                console.log(response.data)
                setCampaigns(response.data.reverse())
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleUpload = (data) => {
        console.log(data)
        // data.map((ele) => {
        //     console.log(ele)
        // })

    }

    const profilesColumns = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 0.5

        },
        {
            headerName: 'Start Date',
            field: 'datetime_init',
            flex: 0.5
        },
        {
            headerName: 'End Date',
            field: 'datetime_end',
            flex: 0.5
        },
        {
            headerName: 'Start Time',
            field: 'daytime_init',
            flex: 0.5
        },
        {
            headerName: 'End Time',
            field: 'daytime_end',
            flex: 0.5
        },
        {
            headerName: 'Queue',
            field: 'queue',
            flex: 0.5
        },
        {
            headerName: 'Retries',
            field: 'retries',
            flex: 0.5
        },
        {
            headerName: 'Status',
            field: '',

            renderCell: rowData => (
                <>
                    {
                        rowData.row.estatus === 'I' && (<div>
                            <Tooltip title="Activated">
                                <IconButton

                                ><Typography>Inactive</Typography>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                    {
                        rowData.row.estatus === 'A' && (<div>
                            <Tooltip title="Activate">
                                <IconButton
                                ><Typography>Active</Typography>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                    {
                        rowData.row.estatus === 'T' && (<div>
                            <Tooltip title="Finished">
                                <IconButton
                                ><Typography>Finished</Typography>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                </>
            ),
            flex: 0.5
        },
        {
            headerName: 'Actions',
            field: 'id',

            renderCell: rowData => (
                <>
                    {
                        rowData.row.estatus === 'I' && (<div>
                            <Tooltip title="Activate">
                                <IconButton
                                    onClick={() => { updateCampaign(rowData.row.id, "A") }}
                                ><Button variant="contained" >Activate</Button>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                    {
                        rowData.row.estatus === 'A' && (<div>
                            <Tooltip title="Deactivate">
                                <IconButton
                                    onClick={() => { updateCampaign(rowData.row.id, "I") }}
                                ><Button variant="contained" >Deactivate</Button>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                </>
            ),
            flex: 0.5
        },
        {
            headerName: 'Upload',
            field: 'Script',

            renderCell: rowData => (
                <>
                    {
                        <FileUpload id={rowData.row.id} handleUpload={handleUpload} />
                    }

                </>
            ),
            flex: 0.5
        }


    ];

    const showProfile = (data) => {
        console.log(data)
    }



    return (<div>
        <Grid container spacing={3}>
            <Grid item lg={4} md={12} xs={0}></Grid>
            <Grid item lg={4} md={12} xs={0}>
                <h1 >&nbsp;Campaign Admin Dashboard</h1>
            </Grid>
            <Grid item lg={4} md={12} xs={0}></Grid>
        </Grid>
        <br /><br />
        <Paper className={classes.root}>

            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}></Grid>
                <Grid item lg={12} md={12} xs={12}>
                    &nbsp;<Date setdate={setdate} />
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <TimePicker label="start time" handleTime={handleTime} />
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <TimePicker label="End time" handleTime={handleTime} />
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <TextField id="outlined-basic" label="Queue" variant="outlined" value={queue} onChange={handleQueueChange} />
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <TextField id="outlined-basic" label="Campaign Name" variant="outlined" value={campaignName} onChange={handlecampaignNameChange} />
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <TextField id="outlined-basic" label="Campaign Retry" variant="outlined" value={campaignRetry} onChange={handleretryChange} />
                </Grid>
                <Grid item lg={2} md={12} xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddCampaign} disabled={disable}>
                        Add Campaign
                    </Button>
                </Grid>


            </Grid>
        </Paper>
        <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
                <Card>
                    <CardContent>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid rows={campaigns} columns={profilesColumns} pageSize={20}
                                // rowsPerPageOptions={[10, 20, 50]}
                                // onRowClick={showProfile}
                                pagination />
                        </div>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>)
}

export default Campaign