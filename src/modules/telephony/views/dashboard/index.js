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

  useEffect(() => {
    getCampaigns()


  }, [])


  const updateCampaign = (id, status) => {
    const data = {
      "_id": id,
      "status": status

    }
    console.log(data, "fdsfsd")

    axios.post(`http://192.168.4.44:62010/campaign/updateCampaignbyID`, data)
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
      url: 'http://192.168.4.44:62010/campaign/getAllCampaign',
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

  const getCampaignDetails = () => {

  }



  const handleChange = (event) => {
    setCampaignname(event.target.value);
    setcampaignname(event.target.value)
    setname(event.target.value)
    console.log(campaignName)
    console.log(name)
    console.log("data", event.target.value)
    console.log(campaignName, "1st")
    console.log(campaignname, "2nd")
    console.log()
    setInterval(function () {
      var axios = require('axios');
      var data = JSON.stringify({ "ivrCampaignName": event.target.value });

      var config = {
        method: 'post',
        url: 'http://192.168.4.44:62010/channel/getBycampaign',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          //  if(response.data.counts.length>0){
          console.log(response.data)
          response.data.counts[0].Campaignstartdate = moment(response.data.counts[0].Campaignstartdate).format('Do MMMM  YYYY, h:mm:ss a');
          response.data.counts[0].Campaignenddate = moment(response.data.counts[0].Campaignenddate).format('Do MMMM  YYYY, h:mm:ss a');
          // response.data.counts[0].Campaignstartdate.replace('T', "")
          setModaldata(response.data.counts);
          setShow(true)
          console.log("i am called")
          //  }
        })
        .catch(function (error) {
          console.log(error);
        });

    }, 3000);



  }


  const handleClose = () => {

    setShow(false)
  }

  console.log(campaignName)

  return (<div>
    <Grid container spacing={3}>
      <Grid item lg={4} md={12} xs={0}></Grid>
      <Grid item lg={4} md={12} xs={0}>
        <h1 style={{ textAlign: 'center' }}>Campaign Monitoring</h1>
      </Grid>
      <Grid item lg={4} md={12} xs={0}></Grid>
    </Grid>
    <br /><br />
    <Card >
      <CardContent>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}></Grid>
          <Grid item lg={12} md={12} xs={12}>
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
          {show === true ? <>
            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#A52A2A', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><ScheduleIcon /> Start date : </b>{modaldata[0].Campaignstartdate}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#696969', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><ScheduleIcon /> End date : </b>{modaldata[0].Campaignenddate}</h3></CardContent>
              </Card>

            </Grid>

            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#800080', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><QueuePlayNextOutlinedIcon /> Queue: </b>{modaldata[0].queue}</h3></CardContent>
              </Card>

            </Grid>


            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#66CDAA', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><BackupOutlinedIcon /> Total Records Uploaded : </b>{modaldata[0].totalRecords}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#191970', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><DialerSipOutlinedIcon /> Dailed records Count: </b>{modaldata[0].DailedCountrecordsCount}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#6B8E23', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><CallMissedOutgoingOutlinedIcon /> NotDailed records Count: </b>{modaldata[0].NotDailedrecordsCount}</h3></CardContent>
              </Card>
            </Grid>


            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#006400', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><AddIcCallOutlinedIcon /> Answered records Count: </b>{modaldata[0].AnsweredrecordCount}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#BC8F8F', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><PhoneMissedOutlinedIcon /> Not Answered records Count: </b>{modaldata[0].NoAnsweredrecordCount}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#FA8072', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><PhoneDisabledOutlinedIcon /> Failed calls records Count: </b>{modaldata[0].FailerrecordCount}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#708090', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><MicOffOutlinedIcon /> Busy calls records Count: </b>{modaldata[0].BusyrecordCount}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#2F4F4F', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><SettingsPhoneOutlinedIcon /> Congestion calls records Count: </b>{modaldata[0].CongestionrecordCount}</h3></CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#DAA520', borderRadius: '12px' }}>
                <CardContent ><h3 style={{ color: 'white' }}><b> <StorageOutlinedIcon /> Job complete records Count: </b>{modaldata[0].jobcompleterecordcount}</h3></CardContent>
              </Card>
            </Grid>
            <Grid item lg={3} md={12} xs={12}>
              <Card style={{ backgroundColor: '#808000', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b> <StorageOutlinedIcon /> Job not complete records Count: </b>{modaldata[0].jobnotcompleterecordcount}</h3></CardContent>
              </Card>
            </Grid>
            <Grid item lg={2} md={12} xs={12}>
              <Card style={{ backgroundColor: '#0000CD', borderRadius: '12px' }}>
                <CardContent><h3 style={{ color: 'white' }}><b><ReplayOutlinedIcon /> Retries : </b>{modaldata[0].retries}</h3></CardContent>
              </Card>
            </Grid>


          </> : <></>}
        </Grid>
      </CardContent>

    </Card >
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}></Grid>
      <Grid item lg={12} md={12} xs={12}></Grid>
      <Grid item lg={12} md={12} xs={12}>
        <DataGrid rows={campaigns} columns={profilesColumns} pageSize={20}
          // rowsPerPageOptions={[10, 20, 50]}
          // onRowClick={showProfile}
          pagination />
      </Grid>
    </Grid>
    {/* <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
                <Card>
                    <CardContent>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid rows={campaigns} columns={profilesColumns} pageSize={20}
                                // rowsPerPageOptions={[10, 20, 50]}
                                onRowClick={showProfile}
                                pagination />
                        </div>

                    </CardContent>
                </Card>
            </Grid>
        </Grid> */}
    {/* {show===true? <Showmodal show={show} modaldata={modaldata}  handleClose={handleClose} />:<></>} */}
  </div >)
}

export default Campaign
