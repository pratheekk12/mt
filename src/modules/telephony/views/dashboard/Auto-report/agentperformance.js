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
import InteractionDate from './agentperformance_date'
import DownloadReport from '../DownloadReport'
import axios from 'axios';
import moment from 'moment'
import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import ExcelReport from '../ExcelReport'
import {AGENT_SERVICE,AMI} from 'src/modules/dashboard-360/utils/endpoints'
import CircularProgress from '@material-ui/core/CircularProgress'

const AgentPerformance = (props) => {
    const [date, setdate] = useState("")
    const [records, setRecords] = useState([])
    const [loader, setLoader] = useState(false)
    const profilesColumns = [
        {
            headerName: 'SL.No',
            field: 'id',
            flex: 0.5
        },
        {
            headerName: 'Agent Name',
            field: 'AgentName',
            flex: 0.5

        },
        {
            headerName: 'Login Duration',
            field: 'TotalLoginTime',
            flex: 0.5
        },
        {
            headerName: 'Calls Offered',
            field: 'TotalCalls',
            flex: 0.5
        },
        {
            headerName: 'Calls Handled',
            field: 'TotalConnectedCalls',
            flex: 0.5
        },
        {
            headerName: 'Missed Calls',
            field: 'TotalRingNoAnswerCalls',
            flex: 0.5
        },
        {
            headerName: 'Break Duration',
            field: 'TotalBreakTime',
            flex: 0.5
        },
        {
            headerName: 'Talk Duration',
            field: 'TotalTalkTime',
            flex: 0.5
        },
        {
            headerName: 'Idle Duration',
            field: 'TotalIdleDuration',
            flex: 0.5
        },
        {
            headerName: 'ACW',
            field: 'ACW',
            flex: 0.5
        },
    ]

    const getData = (date) => {
        setLoader(true)
        let value = moment(date).format().slice(0, 10)
        const data = {
            "startDate": value
        }

        axios.post(`${AGENT_SERVICE}/AgentPeformanceReport`, data)
            .then((res) => {
                setLoader(false)
                console.log(res.data.filteredArray)
                var i = 0
                res.data.filteredArray.map((ele) => {
                   var TotalLoginTime = moment.utc(ele.TotalLoginTime*1000).format('HH:mm:ss');
                 
                   
                   var TotalTalkTime = moment.utc(ele.TotalTalkTime*1000).format('HH:mm:ss');
                   var TotalIdleDuration = moment.utc(ele.TotalIdleDuration*1000).format('HH:mm:ss');
                   var TotalBreakTime= moment.utc(ele.TotalBreakTime*1000).format('HH:mm:ss');
                   
                    var ACW = moment.utc(ele.ACW*1000).format('HH:mm:ss');
              
                   ele.TotalBreakTime=TotalBreakTime
                    ele.TotalIdleDuration=TotalIdleDuration
                    ele.TotalTalkTime=TotalTalkTime
                    ele.TotalLoginTime=TotalLoginTime
                    ele.ACW=ACW
                    i = i + 1
                    return ele.id = i
                })
                setRecords(res.data.filteredArray)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (<div>
        <br />
        <br />
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>Agent Performance Report</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /> {records && records.length > 0 && (
              <ExcelReport
                data={records}
                fileName={'Agent Performance'}
              />
            )}</Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
            <Grid item xs={4} sm={4} lg={2}>
                {
                    loader ? (<div>

                        <CircularProgress />

                    </div>
                    ) : (null)
                }
            </Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                          <Card >
                            <CardContent style={{ 'height': '500px' }}>
                        <DataGrid components={{
                                    Toolbar: GridToolbar,
                                }} rows={records} columns={profilesColumns} pageSize={10}
                          
                            autoHeight="true"
                            pagination />
                            </CardContent>
                            </Card>
                    </Grid>
                ) : (null)
            }

        </Grid>
    </div>)
}

export default AgentPerformance