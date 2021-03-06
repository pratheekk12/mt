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
import FileUpload from './Ivrfileupload'
import Showmodal from './Showmodal'


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setDayWithOptions } from 'date-fns/fp';
import ScheduleIcon from '@material-ui/icons/Schedule';
import QueuePlayNextOutlinedIcon from '@material-ui/icons/QueuePlayNextOutlined';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import DialerSipOutlinedIcon from '@material-ui/icons/DialerSipOutlined';
import CallMissedOutgoingOutlinedIcon from '@material-ui/icons/CallMissedOutgoingOutlined';
import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';
import PhoneMissedOutlinedIcon from '@material-ui/icons/PhoneMissedOutlined';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import PhoneDisabledOutlinedIcon from '@material-ui/icons/PhoneDisabledOutlined';
import SettingsPhoneOutlinedIcon from '@material-ui/icons/SettingsPhoneOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import Download from 'src/modules/dashboard-360/views/DashboardView/DownloadReport.js'
import Download1 from './DownloadReport'
import { CAMPAIGN_REPORT, UPLOAD_FILE } from 'src/modules/dashboard-360/utils/endpoints'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        margin: '1rem 2rem'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 260,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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
    const [campaignname, setCampaignname] = useState([])
    const [option, setOptions] = useState([])
    const [name, setname] = useState("")
    const [attemptRecords, setAttemptRecords] = useState("")
    const [records1, setRecords] = useState([])
    const [loader, setLoader] = useState(false)
    const [englishRecords, setEnglishRecords] = useState("")
    const [hindiRecords, setHindiRecords] = useState("")
    const [kannadaRecords, setKannadaRecords] = useState("")

    useEffect(() => {
        getCampaigns()


    }, [])

    console.log(modaldata)

    const updateCampaign = (id, status) => {
        const data = {
            "_id": id,
            "status": status

        }
        console.log(data, "fdsfsd")

        axios.post(`${CAMPAIGN_REPORT}/campaign/updateCampaignbyID`, data)
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
            url: `${UPLOAD_FILE}/campaign/getAllCampaign`,
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.data.Record.length > 0) {
                    console.log("chaitra", response.data.Record)
                    var i = 0;
                    response.data.Record = response.data.Record.reverse()
                    response.data.Record.map((ele) => {
                        i = i + 1;

                        var dateFormat = 'DD-MM-YYYY HH:mm:ss';
                        var endUtc = moment.utc(ele.enddate);
                        var startUtc = moment.utc(ele.startdate);
                        var localeDate = endUtc.local();
                        var localsDate = startUtc.local();
                        ele.enddate = localeDate.format(dateFormat);
                        ele.startdate = localsDate.format(dateFormat);
                        return ele.id = i;
                    })
                    setCampaigns(response.data.Record)
                }


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    console.log(attemptRecords, "attemp")

    const handleUpload = (data) => {
        console.log(data)


    }

    const englishColumns = [
        {
            headerName: 'Attempt',
            field: 'attempt',
            flex: 0.5

        },
        {
            headerName: 'IVR Success',
            field: 'optionE1',
            flex: 0.5

        },
        {
            headerName: 'Call now',
            field: 'optionEC1',
            flex: 0.5,

        },
        {
            headerName: 'Call back',
            field: 'optionEC2',
            flex: 0.5
        },
        {
            headerName: 'Call back on tommorow',
            field: 'optionEC3',
            flex: 0.6
        },
        {
            headerName: 'Call back 1 ',
            field: 'optionECT1',
            flex: 0.4,

        },
        {
            headerName: 'Call back 2 ',
            field: 'optionECT2',
            flex: 0.4
        },
        {
            headerName: 'Call back 3 ',
            field: 'optionECT3',
            flex: 0.4
        },
        {
            headerName: 'Invalid Option',
            field: 'optionEInvalid1',
            flex: 0.4
        },


    ];
    const kannadaColumns = [
        {
            headerName: 'Attempt',
            field: 'attempt',
            flex: 0.5

        },
        {
            headerName: 'IVR Success',
            field: 'optionK3',
            flex: 0.5

        },
        {
            headerName: 'Call now',
            field: 'optionKC1',
            flex: 0.5,

        },
        {
            headerName: 'Call back',
            field: 'optionKC2',
            flex: 0.5
        },
        {
            headerName: 'Call back on tommorow',
            field: 'optionKC3',
            flex: 0.6
        },
        {
            headerName: 'Call back 1 ',
            field: 'optionKCT1',
            flex: 0.4,

        },
        {
            headerName: 'Call back 2 ',
            field: 'optionKCT2',
            flex: 0.4
        },
        {
            headerName: 'Call back 3 ',
            field: 'optionKCT3',
            flex: 0.4
        },
        {
            headerName: 'Invalid Option',
            field: 'optionKInvalid3',
            flex: 0.4
        },

    ];

    const hindiColumns = [
        {
            headerName: 'Attempt',
            field: 'attempt',
            flex: 0.5

        },
        {
            headerName: 'IVR Success',
            field: 'optionH2',
            flex: 0.5

        },
        {
            headerName: 'Call now',
            field: 'optionHC1',
            flex: 0.5,

        },
        {
            headerName: 'Call back',
            field: 'optionHC2',
            flex: 0.5
        },
        {
            headerName: 'Call back on tommorow',
            field: 'optionHC3',
            flex: 0.6
        },
        {
            headerName: 'Call back 1 ',
            field: 'optionHCT1',
            flex: 0.4,

        },
        {
            headerName: 'Call back 2 ',
            field: 'optionHCT2',
            flex: 0.4
        },
        {
            headerName: 'Call back 3 ',
            field: 'optionHCT3',
            flex: 0.4
        },
        {
            headerName: 'Invalid Option',
            field: 'optionHInvalid2',
            flex: 0.4
        },

    ];

    const getCampaignDetails = () => {

    }



    const handleChange = (event) => {
        setLoader(true)
        getAttemptDetails(event.target.value)
        // console.log("called again")
        setCampaignname(event.target.value);
        setcampaignname(event.target.value)
        setname(event.target.value)
        // console.log(campaignName)
        // console.log(name)
        // console.log("data", event.target.value)
        // console.log(campaignName, "1st")
        // console.log(campaignname, "2nd")
        // console.log()

        var axios = require('axios');
        var data = JSON.stringify({ "ivrCampaignName": event.target.value });

        var config = {
            method: 'post',
            url: `${UPLOAD_FILE}/channel/getJobreportExcel`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data), "ressssssssssssssssssssssssssss");
                setRecords(response.data.Record)
                response.data.Record.map((ele) => {
                    var formatted = moment.utc(ele.Call_Duration * 1000).format('HH:mm:ss');
                    ele.CDR_Duration = formatted;
                    delete ele._id;
                })

                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
            });

        setInterval(function () {
            var axios = require('axios');
            var data = JSON.stringify({ "ivrCampaignName": event.target.value });

            var config = {
                method: 'post',
                url: `${UPLOAD_FILE}/channel/getBycampaign`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    //  if(response.data.counts.length>0){
                    // console.log(response.data)
                    response.data.counts[0].Campaignstartdate = moment(response.data.counts[0].Campaignstartdate).format('Do MMMM  YYYY, h:mm:ss a');
                    response.data.counts[0].Campaignenddate = moment(response.data.counts[0].Campaignenddate).format('Do MMMM  YYYY, h:mm:ss a');

                    // response.data.counts[0].Campaignstartdate.replace('T', "")
                    // setModaldata("")
                    setModaldata(response.data.counts);
                    setShow(true)
                    // console.log("i am called")

                    //  }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }, 3000);



    }

    const getAttemptDetails = (value, date) => {
        const data = {
            ivrCampaignName: value
        }
        var en = []
        var hi = []
        var kn = []
        console.log("data", data)

        axios.post(`${UPLOAD_FILE}/channel/getinteractionExcel`, data)
            .then((res) => {
                // console.log(res)
                if (res.data.final.length > 0) {
                    res.data.date = date
                    res.data.final.map((ele) => {
                        return ele.date = date
                    })
                    console.log(res.data, "data attempt")
                    res.data.final.forEach(element => {
                        en.push({
                            ivrsuccess: element.optionE1,
                            option1: element.optionEC1,
                            option2: element.optionEC2,
                            option3: element.optionEC3,
                            Callbackoption1: element.optionECT1,
                            Callbackoption2: element.optionECT2,
                            Callbackoption3: element.optionECT3,
                            InvalidOption: element.optionEInvalid1,
                        })
                        hi.push({
                            ivrsuccess: element.optionH2,
                            option1: element.optionHC1,
                            option2: element.optionHC2,
                            option3: element.optionHC3,
                            Callbackoption1: element.optionHCT1,
                            Callbackoption2: element.optionHCT2,
                            Callbackoption3: element.optionHCT3,
                            InvalidOption: element.optionHInvalid2,
                        })
                        kn.push({
                            ivrsuccess: element.optionK3,
                            option1: element.optionKC1,
                            option2: element.optionKC2,
                            option3: element.optionKC3,
                            Callbackoption1: element.optionKCT1,
                            Callbackoption2: element.optionKCT2,
                            Callbackoption3: element.optionKCT3,
                            InvalidOption: element.optionKInvalid3,
                        })
                    });

                    setEnglishRecords(en)
                    setHindiRecords(hi)
                    setKannadaRecords(kn)
                    setAttemptRecords(res.data.final)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }




    const handleClose = () => {

        setShow(false)
    }



    return (<div>
        <h1 style={{ textAlign: 'center' }}>Campaign Monitoring</h1>

        <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}></Grid>
            <Grid item lg={5} md={12} xs={12}></Grid>
            <Grid item lg={2} md={12} xs={12}>
                <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel id="demo-simple-select-outlined-label">Campaign</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={campaignName}
                        onChange={handleChange}
                        label="Campaign"
                        autoWidth="true"
                    >
                        {
                            campaigns.map((ele) => {
                                return (<MenuItem value={ele.campaign_name}>{ele.campaign_name}</MenuItem>)
                            })
                        }

                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={5} md={12} xs={12}></Grid>
            <Grid item lg={12} md={12} xs={12}>
                {
                    loader ? (<h1 style={{ textAlign: 'center' }}><CircularProgress /></h1>) : (null)
                }

            </Grid>
            {show === true ? <>
                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#A52A2A', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><ScheduleIcon /> Start date : </b>{modaldata[0].Campaignstartdate}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#696969', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><ScheduleIcon /> End date : </b>{modaldata[0].Campaignenddate}</h3></CardContent>
                    </Card>

                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#800080', borderRadius: '12px', }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><QueuePlayNextOutlinedIcon /> Queue: </b>{modaldata[0].queue}</h3></CardContent>
                    </Card>

                </Grid>


                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#66CDAA', borderRadius: '12px', justifyContent: 'center' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><BackupOutlinedIcon /> Total Records Uploaded : </b>{modaldata[0].totalRecords}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#191970', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><DialerSipOutlinedIcon /> Dailed records Count: </b>{modaldata[0].DailedCountrecordsCount}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#6B8E23', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><CallMissedOutgoingOutlinedIcon /> NotDailed records Count: </b>{modaldata[0].NotDailedrecordsCount}</h3></CardContent>
                    </Card>
                </Grid>


                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#006400', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><AddIcCallOutlinedIcon /> Answered records Count: </b>{modaldata[0].AnsweredrecordCount}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#BC8F8F', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><PhoneMissedOutlinedIcon /> Not Answered records Count: </b>{modaldata[0].NoAnsweredrecordCount}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#FA8072', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><PhoneDisabledOutlinedIcon /> Failed calls records Count: </b>{modaldata[0].FailerrecordCount}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#708090', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><MicOffOutlinedIcon /> Busy calls records Count: </b>{modaldata[0].BusyrecordCount}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#2F4F4F', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><SettingsPhoneOutlinedIcon /> Congestion calls records Count: </b>{modaldata[0].CongestionrecordCount}</h3></CardContent>
                    </Card>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#DAA520', borderRadius: '12px' }}>
                        <CardContent ><h3 style={{ color: 'white', textAlign: 'center' }}><b> <StorageOutlinedIcon /> Job complete records Count: </b>{modaldata[0].jobcompleterecordcount}</h3></CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#808000', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b> <StorageOutlinedIcon /> Job not complete records Count: </b>{modaldata[0].jobnotcompleterecordcount}</h3></CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={12} xs={12}>
                    <Card style={{ backgroundColor: '#0000CD', borderRadius: '12px' }}>
                        <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><ReplayOutlinedIcon /> Retries : </b>{modaldata[0].retries}</h3></CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={12} xs={12}>
                    <Button>
                        <Download DownloadData={records1} />
                    </Button>
                </Grid>


            </> : <></>}
        </Grid>
        {/* </CardContent>

    </Card > */}
        <Grid item lg={12} md={12} xs={12}></Grid>
        <Grid item lg={2} md={12} xs={12}>
            <br></br>
            <br></br>
            <Button>
                <Download1 DownloadData={englishRecords} />
            </Button>

        </Grid>
        <br />
        {attemptRecords.length > 0 && <Card >
            <CardContent style={{ 'height': '300px' }}>
                <h2>English Calls</h2>
                <DataGrid rows={attemptRecords} columns={englishColumns} pageSize={5}
                    // rowsPerPageOptions={[10, 20, 50]}
                    // onRowClick={showProfile}
                    pagination />

            </CardContent>
        </Card>
        }

        <Grid item lg={2} md={12} xs={12}>
            <br></br>
            <br></br>
            <Button>
                <Download1 DownloadData={hindiRecords} />
            </Button>
        </Grid>
        <br />
        {attemptRecords.length > 0 && <Card >

            <CardContent style={{ 'height': '300px' }}>
                <h2>Hindi Calls</h2>
                <DataGrid rows={attemptRecords} columns={hindiColumns} pageSize={5}
                    // rowsPerPageOptions={[10, 20, 50]}
                    // onRowClick={showProfile}
                    pagination />

            </CardContent>
        </Card>
        }
        <Grid item lg={2} md={12} xs={12}>
            <br></br>
            <br></br>
            <Button>
                <Download1 DownloadData={kannadaRecords} />
            </Button>
        </Grid>
        <br />
        {attemptRecords.length > 0 && <Card >

            <CardContent style={{ 'height': '300px' }}>
                <h2>Kannada Calls</h2>
                <DataGrid rows={attemptRecords} columns={kannadaColumns} pageSize={5}
                    // rowsPerPageOptions={[10, 20, 50]}
                    // onRowClick={showProfile}
                    pagination />

            </CardContent>
        </Card>
        }
    </div >)
}

export default Campaign