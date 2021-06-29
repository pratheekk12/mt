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
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
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


const LanguageReport = (props) => {
  const classes = useStyles();

  const [campaigns, setCampaigns] = useState("")
  const [selectedCamapign, setSelectedCampaign] = useState("")
  const [campaigndata, setCampaignData] = useState([])
  const [records1, setRecords] = useState([])
  const [loader, setLoader] = useState(false)
  const [englishRecordsl, setEnglishRecordsl] = useState("")
  const [hindiRecordsl, setHindiRecordsl] = useState("")
  const [kannadaRecordsl, setKannadaRecordsl] = useState("")
  const [attemptRecordsl, setAttemptRecordsl] = useState("")

  useEffect(() => {
    getCampaigns()

  }, [])

  useEffect(() => {
    if (localStorage.getItem('campaign')) {
      setLoader(true)
      getExcelData()
 
      const interval = setInterval(async () => {
      
        getExcelData()
       
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

  const getExcelData = () => {
    const data = {
      "ivrCampaignName": localStorage.getItem('campaign')
    }

    axios.post(`${UPLOAD_FILE}/channel/getLanguageReport`, data)
      .then(function (res) {
        console.log(res.data, "excel data");


        var id = 1;
        var id1 = 1;
        var id2 = 1;
        res.data.English.map((ele) => {

          ele.ID = 0;
          var formatted = moment.utc(ele.createdAt).format('DD-MM-yyyy HH:mm:ss');
          ele.createdAt = formatted;
          var formatted1 = moment.utc(ele.Call_Duration * 1000).format('HH:mm:ss');
          ele.Call_Duration = formatted1;

          ele.ID = ele.id
          ele.id = id++;
          delete ele._id;

        })
        res.data.Hindi.map((ele) => {

          ele.ID = 0;
          var formatted = moment.utc(ele.createdAt).format('DD-MM-yyyy HH:mm:ss');
          ele.createdAt = formatted;
          var formatted1 = moment.utc(ele.Call_Duration * 1000).format('HH:mm:ss');
          ele.Call_Duration = formatted1;

          ele.ID = ele.id
          ele.id = id1++;
          delete ele._id;
        })
        res.data.Kannada.map((ele) => {

          ele.ID = 0;
          var formatted = moment.utc(ele.createdAt).format('DD-MM-yyyy HH:mm:ss');
          ele.createdAt = formatted;
          var formatted1 = moment.utc(ele.Call_Duration * 1000).format('HH:mm:ss');
          ele.Call_Duration = formatted1;

          ele.ID = ele.id
          ele.id = id2++;
          delete ele._id;
        })


        setEnglishRecordsl(res.data.English)
        setHindiRecordsl(res.data.Hindi)
        setKannadaRecordsl(res.data.Kannada)

      })
      .catch(function (error) {
        console.log(error.message, "failed to fetch excel data");
      });
  }





  const englishColumns = [
    {
      headerName: 'sl no',
      field: 'id',
      width: 150
    },
    {
      headerName: 'Ref ID',
      field: 'refId',
      width: 200

    },
    {
      headerName: 'Bank Name',
      field: 'bankname',
      width: 200

    },
    {
      headerName: 'Phone No',
      field: 'phone',
      width: 200

    },
    {
      headerName: 'Client',
      field: 'client',
      width: 200
    },
    {
      headerName: 'Stage',
      field: 'stage',
      width: 200
    },
    {
      headerName: 'Reason',
      field: 'reason',
      width: 200

    },
    {
      headerName: 'City',
      field: 'city',
      width: 200
    },
    {
      headerName: 'Loan Amount ',
      field: 'loanamount',
      width: 300
    },
    {
      headerName: 'CF CL',
      field: 'cfCl',
      width: 150
    },
    {
      headerName: 'Link',
      field: 'link',
      width: 500
    },
    {
      headerName: 'ID',
      field: 'ID',
      width: 500
    },
    {
      headerName: 'Partner Name',
      field: 'PartnerName',
      width: 500
    },
    {
      headerName: 'CRM Disposition',
      field: 'CRMDisposition',
      width: 500
    },
    {
      headerName: 'Reason',
      field: 'Reason',
      width: 500
    },
    {
      headerName: 'Attempts',
      field: 'Attempts',
      width: 150
    },
    {
      headerName: 'Campaign Name',
      field: 'ivrCampaignName',
      width: 300
    },
    {
      headerName: 'Agent ID',
      field: 'Interaction_AGENTID',
      width: 150
    },
    {
      headerName: 'Caller ID',
      field: 'CDR_CallerID',
      width: 200
    },
    {
      headerName: 'Call StartTime',
      field: 'Call_StartTime',
      width: 200
    },
    {
      headerName: 'Call AnswerTime',
      field: 'Call_AnswerTime',
      width: 200
    },
    {
      headerName: 'Call EndTime',
      field: 'Call_EndTime',
      width: 200
    },
    {
      headerName: 'Call Duration',
      field: 'Call_Duration',
      width: 200
    },


    {
      headerName: 'Created At',
      field: 'createdAt',
      width: 300
    },
    {
      headerName: 'IVR Option Selected',
      field: 'IVR_Option_Selected',
      width: 400
    },

  ];

  const kannadaColumns = [
    {
      headerName: 'sl no',
      field: 'id',
      width: 150
    },
    {
      headerName: 'Ref ID',
      field: 'refId',
      width: 200

    },
    {
      headerName: 'Bank Name',
      field: 'bankname',
      width: 200

    },
    {
      headerName: 'Phone No',
      field: 'phone',
      width: 200

    },
    {
      headerName: 'Client',
      field: 'client',
      width: 200
    },
    {
      headerName: 'Stage',
      field: 'stage',
      width: 200
    },
    {
      headerName: 'Reason',
      field: 'reason',
      width: 200

    },
    {
      headerName: 'City',
      field: 'city',
      width: 200
    },
    {
      headerName: 'Loan Amount ',
      field: 'loanamount',
      width: 300
    },
    {
      headerName: 'CF CL',
      field: 'cfCl',
      width: 150
    },
    {
      headerName: 'Link',
      field: 'link',
      width: 500
    },
    {
      headerName: 'ID',
      field: 'ID',
      width: 500
    },
    {
      headerName: 'Partner Name',
      field: 'PartnerName',
      width: 500
    },
    {
      headerName: 'CRM Disposition',
      field: 'CRMDisposition',
      width: 500
    },
    {
      headerName: 'Reason',
      field: 'Reason',
      width: 500
    },
    {
      headerName: 'Attempts',
      field: 'Attempts',
      width: 150
    },
    {
      headerName: 'Campaign Name',
      field: 'ivrCampaignName',
      width: 300
    },
    {
      headerName: 'Agent ID',
      field: 'Interaction_AGENTID',
      width: 150
    },
    {
      headerName: 'Caller ID',
      field: 'CDR_CallerID',
      width: 200
    },
    {
      headerName: 'Call StartTime',
      field: 'Call_StartTime',
      width: 200
    },
    {
      headerName: 'Call AnswerTime',
      field: 'Call_AnswerTime',
      width: 200
    },
    {
      headerName: 'Call EndTime',
      field: 'Call_EndTime',
      width: 200
    },
    {
      headerName: 'Call Duration',
      field: 'Call_Duration',
      width: 200
    },


    {
      headerName: 'Created At',
      field: 'createdAt',
      width: 300
    },
    {
      headerName: 'IVR Option Selected',
      field: 'IVR_Option_Selected',
      width: 400
    },

  ];

  const hindiColumns = [
    {
      headerName: 'sl no',
      field: 'id',
      width: 150
    },
    {
      headerName: 'Ref ID',
      field: 'refId',
      width: 200

    },
    {
      headerName: 'Bank Name',
      field: 'bankname',
      width: 200

    },
    {
      headerName: 'Phone No',
      field: 'phone',
      width: 200

    },
    {
      headerName: 'Client',
      field: 'client',
      width: 200
    },
    {
      headerName: 'Stage',
      field: 'stage',
      width: 200
    },
    {
      headerName: 'Reason',
      field: 'reason',
      width: 200

    },
    {
      headerName: 'City',
      field: 'city',
      width: 200
    },
    {
      headerName: 'Loan Amount ',
      field: 'loanamount',
      width: 300
    },
    {
      headerName: 'CF CL',
      field: 'cfCl',
      width: 150
    },
    {
      headerName: 'Link',
      field: 'link',
      width: 500
    },
    {
      headerName: 'ID',
      field: 'ID',
      width: 500
    },
    {
      headerName: 'Partner Name',
      field: 'PartnerName',
      width: 500
    },
    {
      headerName: 'CRM Disposition',
      field: 'CRMDisposition',
      width: 500
    },
    {
      headerName: 'Reason',
      field: 'Reason',
      width: 500
    },
    {
      headerName: 'Attempts',
      field: 'Attempts',
      width: 150
    },
    {
      headerName: 'Campaign Name',
      field: 'ivrCampaignName',
      width: 300
    },
    {
      headerName: 'Agent ID',
      field: 'Interaction_AGENTID',
      width: 150
    },
    {
      headerName: 'Caller ID',
      field: 'CDR_CallerID',
      width: 200
    },
    {
      headerName: 'Call StartTime',
      field: 'Call_StartTime',
      width: 200
    },
    {
      headerName: 'Call AnswerTime',
      field: 'Call_AnswerTime',
      width: 200
    },
    {
      headerName: 'Call EndTime',
      field: 'Call_EndTime',
      width: 200
    },
    {
      headerName: 'Call Duration',
      field: 'Call_Duration',
      width: 200
    },


    {
      headerName: 'Created At',
      field: 'createdAt',
      width: 300
    },
    {
      headerName: 'IVR Option Selected',
      field: 'IVR_Option_Selected',
      width: 400
    },
  ];


  return (<>

    <Grid item lg={12} md={12} xs={12}>
      <Card >
        <CardContent style={{ 'height': '600px' }}>
          <h4>English Calls Details</h4>
          {englishRecordsl.length > 0 && <DataGrid components={{
            Toolbar: GridToolbar,
          }} rows={englishRecordsl} columns={englishColumns} pageSize={5}
            pagination />}

        </CardContent>
      </Card>
    </Grid>



    <Grid item lg={12} md={12} xs={12}>
      <Card >
        <CardContent style={{ 'height': '500px' }}>
          <h4>Hindi Calls Details</h4>
          {hindiRecordsl.length > 0 && <DataGrid components={{
            Toolbar: GridToolbar,
          }} rows={hindiRecordsl} columns={hindiColumns} pageSize={5}
            pagination />}
        </CardContent>
      </Card>
    </Grid>


    <Grid item lg={12} md={12} xs={12}>
      <Card >
        <CardContent style={{ 'height': '300px' }}>
          <h4>kannada Calls Details</h4>
          {kannadaRecordsl.length > 0 && <DataGrid components={{
            Toolbar: GridToolbar,
          }} rows={kannadaRecordsl} columns={kannadaColumns} pageSize={5}
            pagination />}
        </CardContent>
      </Card>
    </Grid>


  </ >)
}

export default LanguageReport