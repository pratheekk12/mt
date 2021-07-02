import React, { useState } from 'react'
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardHeader,
    Box,
    Button,
    TextField,
    Paper,
    Snackbar,
    Tooltip,
    IconButton
} from '@material-ui/core';
import InteractionDate from './DaterangeReport'
import DownloadReport from '../DownloadReport'
import axios from 'axios';
import moment from 'moment'
import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import Popup from './cdrPopup'
import ExcelReport from '../ExcelReport'
import CircularProgress from '@material-ui/core/CircularProgress'
import {AGENT_SERVICE,AMI, REPORT_SP} from 'src/modules/dashboard-360/utils/endpoints'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
const QueueReport = (props) => {
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [show, setShow] = useState(false)
    const [cdr, setCdr] = useState([])
    const [loader,setLoader]= useState(false)
    const [selectedQueue, setSelectedQueue] = useState("")
    
    const queueColumns = [
        {
            headerName: 'sl no',
            field: 'id',
            width: 150
        },
        {
            headerName: 'calldate',
            field: 'calldate',
            width: 200
    
        },
        {
            headerName: 'clid',
            field: 'clid',
            width: 200
    
        },
        {
            headerName: 'src',
            field: 'src',
            width: 200
    
        },
        {
            headerName: 'dst',
            field: 'dst',
            width: 200
        },
        {
            headerName: 'dcontext',
            field: 'dcontext',
            width: 200
        },
    
        {
            headerName: 'dstchannel',
            field: 'dstchannel',
            width: 300
        },
        {
            headerName: 'lastapp',
            field: 'lastapp',
            width: 200
        },
        {
            headerName: 'lastdata',
            field: 'lastdata',
            width: 400
        },
        {
            headerName: 'duration',
            field: 'duration',
            width: 150
        },
        {
            headerName: 'billsec',
            field: 'billsec',
            width: 150
        },
        {
            headerName: 'disposition',
            field: 'disposition',
            width: 200
        },
    
        {
            headerName: 'amaflags',
            field: 'amaflags',
            width: 200
        },
        {
            headerName: 'accountcode',
            field: 'accountcode',
            width: 300
        },
        {
            headerName: 'uniqueid',
            field: 'uniqueid',
            width: 200
        },
        {
            headerName: 'cnum',
            field: 'cnum',
            width: 200
        },
        {
            headerName: 'recordingfile',
            field: 'recordingfile',
            width: 400
    
        },
    ];


    

   
    const getData = (date, enddate) => {
        setLoader(true)
        console.log(date, enddate,selectedQueue)
        let value = moment(date).format().slice(0, 10)
        let value2 = moment(enddate).format().slice(0, 10)
        const data = {
            "startdate": value,
            "enddate": value2,
            "queue":selectedQueue
        }
       
        axios.post(`${REPORT_SP}/get_queue_records`, data)
            .then((res) => {
                setLoader(false)
                console.log(res.data,"records")
                res.data = res.data[0].reverse()
                var i = 0
                res.data.map((ele) => {
                    i = i + 1
                    var formatted = moment.utc(ele.calldate).format('DD-MM-yyyy HH:mm:ss');
                    ele.calldate = formatted
                    var formatted1 = moment.utc(ele.duration * 1000).format('HH:mm:ss');
                    ele.duration = formatted1;
                    var formatted2 = moment.utc(ele.billsec * 1000).format('HH:mm:ss');
                    ele.billsec = formatted2;
                    return ele.id = i
                })



                setRecords(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        localStorage.setItem("Queue", e.target.value)
        setSelectedQueue(e.target.value)
      }

    return (<div>
        <br />
        <br />
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>Queue Report</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> 
            <FormControl variant="outlined" className={classes.formControl} >
          <InputLabel id="demo-simple-select-outlined-label">Queue</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectedQueue}
            onChange={handleChange}
            label="Queue"
            autoWidth="true"
          >
           
               <MenuItem value="5001">5001</MenuItem>
               <MenuItem value="5006">5006</MenuItem>

          </Select>
        </FormControl>
            <InteractionDate getData={getData} setLoader={setLoader}/>
            <DownloadReport DownloadData={records} /></Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={4} sm={4} lg={2}>
            {
                loader ? (<div>
                    
                   <CircularProgress />
                    
                </div>  
                ):(null)
            }
            </Grid>
            <Grid item xs={6} sm={6} lg={5}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
     
        </Grid>
        <Grid container spacing={3} direction="row">
            {
                records.length > 0 ? (
                    <Grid item xs={12} sm={6} lg={12}>
                        <Card >
                            <CardContent style={{ 'height': '500px' }}>
                                <DataGrid components={{
                                    Toolbar: GridToolbar,
                                }} rows={records} columns={queueColumns} pageSize={5}
                                    pagination />
                            </CardContent>
                        </Card>
                    </Grid>
                ) : (null)
            }
        </Grid>

    </div>)
}

export default QueueReport