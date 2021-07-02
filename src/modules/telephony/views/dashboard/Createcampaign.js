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
import FileUpload from './Uploadjobs'
import Showmodal from './Showmodal'
import { AUTH, AGENT_SERVICE, AMI, CAMPAIGN } from '../../../dashboard-360/utils/endpoints'



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
    const [modaldata, setModaldata] = useState([])
    const [show, setShow] = useState(false)

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
            "campaign_name": campaignName,
            "queue": queue,
            "startdate": `${date}${startTime}`,
            "enddate": `${date}${endTime}`,
            "retries": campaignRetry,
            "status": "1"
        }

        axios.post(`${CAMPAIGN}/campaign/createCampaign`, data)
            .then((response) => {
                console.log(response.data)
                handleReset()
                getCampaigns()
            })
            .catch((error) => {
                console.log(error)
            })


    }

    const updateCampaign = (id, status) => {
        const data = {
            "_id": id,
            "status": status

        }
        console.log(data, "fdsfsd")

        axios.post(`${CAMPAIGN}/campaign/updateCampaignbyID`, data)
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
            url: `${CAMPAIGN}`+'/campaign/getAllCampaign',
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.Record.length > 0) {

                    var i = 0;
                    response.data.Record.map((ele) => {
                        i = i + 1;

                        var dateFormat = 'DD-MM-YYYY hh:mm:ss';
                        var endUtc = moment.utc(ele.enddate);
                        var startUtc = moment.utc(ele.startdate);

                        ele.startdate = ele.startdate.replace("T", " ");
                        ele.startdate = ele.startdate.replace("Z", " ");
                        ele.enddate = ele.enddate.replace("T", " ");
                        ele.enddate = ele.enddate.replace("Z", " ");
                        var localeDate = endUtc.local();
                        var localsDate = startUtc.local();
                        ele.enddate = ele.enddate;
                        ele.startdate = ele.startdate;
                        return ele.id = i;


                    })
                    setCampaigns(response.data.Record.reverse())
                }


            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleUpload = (data) => {
        console.log(data)


    }

    const profilesColumns = [
        {
            headerName: 'Name',
            field: 'campaign_name',
            flex: 0.5

        },
        {
            headerName: 'Start Date',
            field: 'startdate',
            flex: 0.5,


        },
        {
            headerName: 'End Date',
            field: 'enddate',
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
                        rowData.row.status === '1' && (<div>
                            <Tooltip title="Activated">
                                <IconButton

                                ><Typography>Inactive</Typography>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                    {
                        rowData.row.status === '0' && (<div>
                            <Tooltip title="Activate">
                                <IconButton
                                ><Typography>Active</Typography>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                    {
                        rowData.row.status === 'F' && (<div>
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
                        rowData.row.status === '1' && (<div>
                            <Tooltip title="Activate">
                                <IconButton
                                    onClick={() => { updateCampaign(rowData.row._id, "0") }}
                                ><Button variant="contained" >Activate</Button>
                                </IconButton>
                            </Tooltip>
                        </div>)
                    }
                    {
                        rowData.row.status === '0' && (<div>
                            <Tooltip title="Deactivate">
                                <IconButton
                                    onClick={() => { updateCampaign(rowData.row._id, "1") }}
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
                        <FileUpload id={rowData.row._id} retries={rowData.row.retries} campaignID={rowData.row.campaign_name} handleUpload={handleUpload} />
                    }

                </>
            ),
            flex: 0.5
        }


    ];


    const showProfile = (data) => {
        console.log("data", data.row.campaign_name)
        var axios = require('axios');
        var data = JSON.stringify({ "ivrCampaignName": data.row.campaign_name });

        var config = {
            method: 'post',
            url: `${CAMPAIGN}`+'/channel/getBycampaign',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                setModaldata(response.data.counts);
                setShow(true)

            })
            .catch(function (error) {
                console.log(error);
            });


    }


    const handleClose = () => {

        setShow(false)
    }



    return (<div>
        <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={0}></Grid>
            <Grid item lg={4} md={12} xs={0}></Grid>
            <Grid item lg={6} md={12} xs={0}>
                <h1 >&nbsp; IVR Campaign Admin Dashboard</h1>
            </Grid>
            <Grid item lg={2} md={12} xs={0}></Grid>
        </Grid>
        <br /><br />
        <Paper className={classes.root}>
            <Card>
                <CardContent>
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
                </CardContent>
            </Card>
        </Paper>
        <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
                <Card>
                    <CardContent>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid rows={campaigns} columns={profilesColumns} pageSize={20}

                                onRowClick={showProfile}
                                pagination />
                        </div>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        {show === true ? <Showmodal show={show} modaldata={modaldata} handleClose={handleClose} /> : <></>}
    </div>)
}

export default Campaign