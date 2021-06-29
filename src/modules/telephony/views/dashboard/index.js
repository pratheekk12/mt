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
import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import axios from 'axios'
import FileUpload from './Ivrfileupload'
import Showmodal from './Showmodal'
import Download from 'src/modules/dashboard-360/views/DashboardView/DownloadReport'
import Download1 from './DownloadReport'

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
import { CAMPAIGN_REPORT, UPLOAD_FILE } from 'src/modules/dashboard-360/utils/endpoints'
import CircularProgress from '@material-ui/core/CircularProgress';
import ExcelReport from 'src/components/ExcelReport';
import { Language } from '@material-ui/icons';
import LanguageTable from './languageReport'


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

  const [campaigns, setCampaigns] = useState("")
  const [selectedCamapign, setSelectedCampaign] = useState("")
  const [campaigndata, setCampaignData] = useState([])
  const [records1, setRecords] = useState([])
  const [loader, setLoader] = useState(false)
  const [englishRecords, setEnglishRecords] = useState("")
  const [hindiRecords, setHindiRecords] = useState("")
  const [kannadaRecords, setKannadaRecords] = useState("")
  const [attemptRecords, setAttemptRecords] = useState("")

  useEffect(() => {
    getCampaigns()

  }, [])

  useEffect(() => {
    if (localStorage.getItem('campaign')) {
      setLoader(true)
      getExcelData()
      getInteractionDeatils()
      const interval = setInterval(async () => {
        getCampaignDetails()
        getExcelData()
        //getExcelData()
      }, 3000);
    }
  }, [selectedCamapign])




  const getCampaigns = () => {
    axios.get(`${UPLOAD_FILE}/campaign/getAllCampaign`)
      .then((res) => {
        setCampaigns(res.data.Record.reverse())

      })
      .catch((err) => {
        console.log("Failed to get campaigns values")
      })
  }

  const getCampaignDetails = () => {

    const data = {
      "ivrCampaignName": localStorage.getItem('campaign')
    }

    axios.post(`${UPLOAD_FILE}/channel/getBycampaign`, data)
      .then((response) => {
        console.log(response.data, "particular campaign")

        response.data.counts[0].Campaignstartdate = response.data.counts[0].Campaignstartdate.replace("T", " ")
        response.data.counts[0].Campaignstartdate = response.data.counts[0].Campaignstartdate.slice(0, 19)

        response.data.counts[0].Campaignenddate = response.data.counts[0].Campaignenddate.replace("T", " ")
        response.data.counts[0].Campaignenddate = response.data.counts[0].Campaignenddate.slice(0, 19)


        // response.data.counts[0].Campaignstartdate = moment(response.data.counts[0].Campaignstartdate).format();
        // response.data.counts[0].Campaignenddate = moment(response.data.counts[0].Campaignenddate).format();
        console.log(response.data)
        setCampaignData(response.data.counts)
      })
      .catch((err) => {
        console.log(err.message, "failed to fetch campaign details")
      })
  }

  const getInteractionDeatils = () => {
    var axios = require('axios');
    var data = JSON.stringify({ "ivrCampaignName": localStorage.getItem('campaign') });

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
  }



  const getExcelData = () => {
    const data = {
      "ivrCampaignName": localStorage.getItem('campaign')
    }

    var en = []
    var hi = []
    var kn = []

    axios.post(`${UPLOAD_FILE}/channel/getinteractionExcel`, data)
      .then(function (res) {
        console.log(res.data, "excel data");
        if (res.data.final.length > 0) {
          // res.data.date = date
          // res.data.final.map((ele) => {
          //   return ele.date = date
          // })
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
      .catch(function (error) {
        console.log(error.message, "failed to fetch excel data");
      });
  }


  const handleChange = (e) => {
    localStorage.setItem("campaign", e.target.value)
    setSelectedCampaign(e.target.value)
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


  return (<div>
    {/* <h3 style={{ textAlign: 'center' }}>Campaign Monitoring</h3> */}

    <Grid container spacing={3}>
      {/* <Grid item lg={12} md={12} xs={12}></Grid> */}
      <Grid item lg={5} md={12} xs={12}></Grid>
      <Grid item lg={2} md={12} xs={12}>
        <FormControl variant="outlined" className={classes.formControl} >
          <InputLabel id="demo-simple-select-outlined-label">Campaign</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectedCamapign}
            onChange={handleChange}
            label="Campaign"
            autoWidth="true"
          >
            {
              campaigns.length > 0 ? (
                campaigns.map((ele) => {
                  return (<MenuItem value={ele.campaign_name}>{ele.campaign_name}</MenuItem>)
                })
              ) : (null)
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
      {campaigndata.length > 0 ? <>
        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#A52A2A', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><ScheduleIcon /> Start date : </b>{campaigndata[0].Campaignstartdate}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#696969', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><ScheduleIcon /> End date : </b>{campaigndata[0].Campaignenddate}</h3></CardContent>
          </Card>

        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#800080', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><QueuePlayNextOutlinedIcon /> Queue: </b>{campaigndata[0].queue}</h3></CardContent>
          </Card>

        </Grid>


        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#66CDAA', borderRadius: '12px', justifyContent: 'center', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><BackupOutlinedIcon /> Total Records Uploaded : </b>{campaigndata[0].totalRecords}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#191970', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><DialerSipOutlinedIcon /> Dailed records Count: </b>{campaigndata[0].DailedCountrecordsCount}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#6B8E23', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><CallMissedOutgoingOutlinedIcon /> NotDailed records Count: </b>{campaigndata[0].NotDailedrecordsCount}</h3></CardContent>
          </Card>
        </Grid>


        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#006400', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><AddIcCallOutlinedIcon /> Answered records Count: </b>{campaigndata[0].AnsweredrecordCount}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#BC8F8F', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><PhoneMissedOutlinedIcon /> Not Answered records Count: </b>{campaigndata[0].NoAnsweredrecordCount}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#FA8072', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><PhoneDisabledOutlinedIcon /> Failed calls records Count: </b>{campaigndata[0].FailerrecordCount}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#708090', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><MicOffOutlinedIcon /> Busy calls records Count: </b>{campaigndata[0].BusyrecordCount}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#2F4F4F', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><SettingsPhoneOutlinedIcon /> Congestion calls records Count: </b>{campaigndata[0].CongestionrecordCount}</h3></CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#DAA520', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent ><h3 style={{ color: 'white', textAlign: 'center' }}><b> <StorageOutlinedIcon /> Job complete records Count: </b>{campaigndata[0].jobcompleterecordcount}</h3></CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#808000', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b> <StorageOutlinedIcon /> Job not complete records Count: </b>{campaigndata[0].jobnotcompleterecordcount}</h3></CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={12} xs={12}>
          <Card style={{ backgroundColor: '#0000CD', borderRadius: '12px', fontSize: '13px' }}>
            <CardContent><h3 style={{ color: 'white', textAlign: 'center' }}><b><ReplayOutlinedIcon /> Retries : </b>{campaigndata[0].retries}</h3></CardContent>
          </Card>
        </Grid>
        {
          records1.length > 0 && <Grid item lg={3} md={12} xs={12}>
            <Button>
              <Download DownloadData={records1} />
            </Button>
          </Grid>
        }



      </> : <></>}
      <Grid item lg={12} md={12} xs={12}></Grid>
 
      {attemptRecords.length > 0 &&  
        <LanguageTable/>
      }
      {/* <Grid item lg={2} md={12} xs={12}>
        <br></br>
        <br></br>
        <Button>
          <Download1 DownloadData={englishRecords} />
        </Button>
      </Grid> */}
      {attemptRecords.length > 0 && <Grid item lg={12} md={12} xs={12}>
        <Card >
          <CardContent style={{ 'height': '400px' }}>
            <h4>English Calls Counts</h4>
            <DataGrid rows={attemptRecords} components={{
          Toolbar: GridToolbar,}} columns={englishColumns} pageSize={5}
              pagination />

          </CardContent>
        </Card>
      </Grid>
      }
    </Grid>
    {/* <Grid item lg={2} md={12} xs={12}>
      <br></br>
      <br></br>
      <Button>
        <Download1 DownloadData={hindiRecords} />
      </Button>
    </Grid> */}
    {attemptRecords.length > 0 && <Grid item lg={12} md={12} xs={12}>
      <Card >
        <CardContent style={{ 'height': '400px' }}>
          <h4>Hindi Calls Counts</h4>
          <DataGrid rows={attemptRecords} components={{
          Toolbar: GridToolbar,}} columns={hindiColumns} pageSize={5}
            pagination />
        </CardContent>
      </Card>
    </Grid>
    }
    {/* <Grid item lg={2} md={12} xs={12}>
      <br></br>
      <br></br>
      <Button>
        <Download1 DownloadData={kannadaRecords} />
      </Button>
    </Grid> */}
    {attemptRecords.length > 0 && <Grid item lg={12} md={12} xs={12}>
      <Card >
        <CardContent style={{ 'height': '400px' }}>
          <h4>kannada Calls Counts</h4>
          <DataGrid rows={attemptRecords} components={{
          Toolbar: GridToolbar,}} columns={kannadaColumns} pageSize={5}
            pagination />
        </CardContent>
      </Card>
    </Grid>
    }

  </div >)
}

export default Campaign