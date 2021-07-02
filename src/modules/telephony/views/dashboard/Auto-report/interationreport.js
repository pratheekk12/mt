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
import { AGENT_SERVICE, AMI } from 'src/modules/dashboard-360/utils/endpoints'

const InteractionReport = (props) => {
    const [records, setRecords] = useState([])
    const [show, setShow] = useState(false)
    const [cdr, setCdr] = useState([])
    const [loader, setLoader] = useState(false)
    const interactionColumns = [
        {
            headerName: 'sl no',
            field: 'id',
            width: 150
        },
   
        {
            headerName: 'Agent Name',
            field: 'AGENTNAME',
            width: 200
    
        },
        {
            headerName: 'Agent Id',
            field: 'AGENTID',
            width: 200
    
        },
        {
            headerName: 'Caller Number',
            field: 'CALLERNUMBER',
            width: 200
        },
        {
            headerName: 'Call Start Time',
            field: 'CALLSTARTTIME',
            width: 200
        },
    
        {
            headerName: 'Call Picked Time',
            field: 'CALLPICKEDTIME',
            width: 300
        },
        {
            headerName: 'Call Disconnected Time',
            field: 'CALLDICONNECTEDTIME',
            width: 200
        },
        {
            headerName: 'Call No Answer Tim',
            field: 'CALLNOANSWERTIME',
            width: 200
        },
        {
            headerName: 'Call Disposed Time',
            field: 'CALLDISPOSEDTIME',
            width: 200
        },
        {
            headerName: 'Total Call Duration',
            field: 'TOTALCALLDURATION',
            width: 200
        },
        {
            headerName: 'Call Connected Duration',
            field: 'CALLCONNECTEDDURATION',
            width: 200
        },
        {
            headerName: 'Call Disconnected Duration',
            field: 'CALLDISCONECTEDDURATION',
            width: 200
        },
        {
            headerName: 'Call Ring Duration',
            field: 'CALLRINGDURATION',
            width: 200
        },
        {
            headerName: 'Caller Name',
            field: 'CallerName',
            width: 300
        },
        {
            headerName: 'Queue',
            field: 'Queue',
            width: 200
        },
        {
            headerName: 'Location',
            field: 'Location',
            width: 200
        },
        {
            headerName: 'Partner Name',
            field: 'partnername',
            width: 200
        },
        {
            headerName: 'Disposition',
            field: 'Disposition',
            width: 300
    
        },
        
        {
            headerName: 'Reason',
            field: 'Reason',
            width: 300
        },
        {
            headerName: 'Response',
            field: 'response',
            width: 200
        },
        {
            headerName: 'Sip ID',
            field: 'sip_id',
            width: 200
        },
        {
            headerName: 'Agent Type',
            field: 'agent_type',
            width: 200
        },
        {
            headerName: 'Agent ID',
            field: 'agent_id',
            width: 200
        },
        
        {
            headerName: 'Agent Name',
            field: 'agentName',
            width: 200
        },
        {
            headerName: 'Callback Date Time',
            field: 'CallbackDate',
            width: 200
        },
        {
            headerName: 'Remarks',
            field: 'Remarks',
            width: 200
        },
        {
            headerName: 'Record Date Time',
            field: 'createdAt',
            width: 300
        },
        {
            headerName: 'Last DTMF Option',
            field: 'optionsselct',
            width: 200
        },
    ]
    const handleClose = () => {
        setShow(false);
    };

    const getDataof1 = (data) => {
        console.log("data", data.row._id)
      
        axios.get(`${AGENT_SERVICE}/interactions/${data.row._id}`)
            .then((res) => {
                console.log(res.data)
                setCdr(res.data)
                setShow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    console.log(loader)
    const getData = (date, enddate) => {
        setLoader(true)
        console.log(date, enddate)
        let value = moment(date).format().slice(0, 10)
        let value2 = moment(enddate).format().slice(0, 10)
        const data = {
            "startDate": value,
            "endDate": value2
        }
        axios.post(`${AGENT_SERVICE}/interactions/bydaterange`, data)
            .then((res) => {
                setLoader(false)
                console.log(res.data.records, "records")
                res.data.records = res.data.records.reverse()
                var i = 0
                res.data.records.map((ele) => {
                    i = i + 1
                    return ele.id = i
                })
                res.data.records.map((ele) => {
                    if (ele.CALLSTARTTIME.length > 1) {
                        ele.CALLSTARTTIME = parseInt(ele.CALLSTARTTIME);
                        var formatted = moment.unix(ele.CALLSTARTTIME / 1000).format('DD-MM-yyyy HH:mm:ss');
                        return ele.CALLSTARTTIME = formatted
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.CALLPICKEDTIME.length > 1) {
                        ele.CALLPICKEDTIME = parseInt(ele.CALLPICKEDTIME);
                        var formatted = moment.unix(ele.CALLPICKEDTIME / 1000).format('DD-MM-yyyy HH:mm:ss');
                        return ele.CALLPICKEDTIME = formatted
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.CALLDICONNECTEDTIME.length > 1) {
                        ele.CALLDICONNECTEDTIME = parseInt(ele.CALLDICONNECTEDTIME);
                        var formatted = moment.unix(ele.CALLDICONNECTEDTIME / 1000).format('DD-MM-yyyy HH:mm:ss');
                        return ele.CALLDICONNECTEDTIME = formatted
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.CALLNOANSWERTIME.length > 1) {
                        ele.CALLNOANSWERTIME = parseInt(ele.CALLNOANSWERTIME);
                        var formatted = moment.unix(ele.CALLNOANSWERTIME / 1000).format('DD-MM-yyyy HH:mm:ss');
                        return ele.CALLNOANSWERTIME = formatted
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.CALLDISPOSEDTIME.length > 1) {
                        ele.CALLDISPOSEDTIME = parseInt(ele.CALLDISPOSEDTIME);
                        var formatted = moment.unix(ele.CALLDISPOSEDTIME / 1000).format('DD-MM-yyyy HH:mm:ss');
                        return ele.CALLDISPOSEDTIME = formatted
                    }
                })
                res.data.records.map((ele) => {
                    var formatted = moment.utc(ele.TOTALCALLDURATION * 1000).format('HH:mm:ss');
                    return ele.TOTALCALLDURATION = formatted
                })
                res.data.records.map((ele) => {
                    var formatted = moment.utc(ele.CALLCONNECTEDDURATION * 1000).format('HH:mm:ss');
                    return ele.CALLCONNECTEDDURATION = formatted
                })
                res.data.records.map((ele) => {
                    var formatted = moment.utc(ele.CALLDISCONECTEDDURATION * 1000).format('HH:mm:ss');
                    return ele.CALLDISCONECTEDDURATION = formatted
                })
                res.data.records.map((ele) => {
                    var formatted = moment.utc(ele.CALLRINGDURATION * 1000).format('HH:mm:ss');
                    return ele.CALLRINGDURATION = formatted
                })
                res.data.records.map((ele) => {
                    const value = ele.LASTDTMFOPTION.toString()
                    return ele.optionsselct = value
                })
                res.data.records.map((ele) => {
                    const value = moment(ele.createdAt).format('MMMM Do YYYY, h:mm:ss a')
                    return ele.createdAt = value
                })
                res.data.records.map((ele) => {
                    console.log("crm", ele.CRMDISPOSITION);
                    if (ele.hasOwnProperty("CRMDISPOSITION")) {
                        return (
                            ele.partnername = ele.CRMDISPOSITION["Partner Name"],
                            ele.Disposition = ele.CRMDISPOSITION.Disposition,
                            ele.Reason = ele.CRMDISPOSITION.Reason
                        )
                    } else {
                        return (ele.mainDisposition = '',
                            ele.subDisposition = '',
                            ele.sip_id = '',
                            ele.agent_type = '',
                            ele.agent_id = '',
                            ele.agentName = '',
                            ele.response = '')
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.hasOwnProperty("CRD")) {
                        return (
                            ele.CRD_AMAFlags = ele.CRD.AMAFlags,
                            ele.CRD_AccountCode = ele.CRD_AccountCode,
                            ele.CRD_AnswerTime = ele.CRD_AnswerTime,
                            ele.CRD_CallerID = ele.CRD_CallerID,
                            ele.CRD_Channel = ele.CRD_Channel,
                            ele.CRD_Destination = ele.CRD_Destination,
                            ele.CRD_DestinationChannel = ele.CRD_DestinationChannel,
                            ele.CRD_DestinationContext = ele.CRD_DestinationContext,
                            ele.CRD_Disposition = ele.CRD_Disposition,
                            ele.CRD_Duration = ele.CRD_Duration,
                            ele.CRD_EndTime = ele.CRD_EndTime,
                            ele.CRD_Event = ele.CRD_Event,
                            ele.CRD_LastApplication = ele.CRD_LastApplication,
                            ele.CRD_LastData = ele.CRD_LastData,
                            ele.CRD_Privilege = ele.CRD_Privilege,
                            ele.CRD_Source = ele.CRD_Source,
                            ele.CRD_StartTime = ele.CRD_StartTime,
                            ele.CRD_UniqueID = ele.CRD_UniqueID,
                            ele.CRD_UserField = ele.CRD_UserField
                        )
                    } else {
                        return (ele.CRD_AMAFlags = "",
                            ele.CRD_AccountCode = "",
                            ele.CRD_AnswerTime = "",
                            ele.CRD_CallerID = "",
                            ele.CRD_Channel = "",
                            ele.CRD_Destination = "",
                            ele.CRD_DestinationChannel = "",
                            ele.CRD_DestinationContext = "",
                            ele.CRD_Disposition = "",
                            ele.CRD_Duration = "",
                            ele.CRD_EndTime = "",
                            ele.CRD_Event = "",
                            ele.CRD_LastApplication = "",
                            ele.CRD_LastData = "",
                            ele.CRD_Privilege = "",
                            ele.CRD_Source = "",
                            ele.CRD_StartTime = "",
                            ele.CRD_UniqueID = "",
                            ele.CRD_UserField = ""
                        )
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.hasOwnProperty("DIALENDEVENT")) {
                        return (
                            ele.DIALENDEVENT_Channel = ele.DIALENDEVENT.Channel,
                            ele.DIALENDEVENT_DialStatus = ele.DIALENDEVENT.DialStatus,
                            ele.DIALENDEVENT_Event = ele.DIALENDEVENT.Event,
                            ele.DIALENDEVENT_Privilege = ele.DIALENDEVENT.Privilege,
                            ele.DIALENDEVENT_SubEvent = ele.DIALENDEVENT.SubEvent,
                            ele.DIALENDEVENT_UniqueID = ele.DIALENDEVENT.UniqueID
                        )
                    } else {
                        return (ele.DIALENDEVENT_Channel = "",
                            ele.DIALENDEVENT_DialStatus = "",
                            ele.DIALENDEVENT_Event = "",
                            ele.DIALENDEVENT_Privilege = "",
                            ele.DIALENDEVENT_SubEvent = "",
                            ele.DIALENDEVENT_UniqueID = ""
                        )
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.hasOwnProperty("DIALSTARTEVENT")) {
                        return (
                            ele.DIALSTARTEVENT_CallerIDName = ele.DIALSTARTEVENT.CallerIDName,
                            ele.DIALSTARTEVENT_CallerIDNum = ele.DIALSTARTEVENT.CallerIDNum,
                            ele.DIALSTARTEVENT_Channel = ele.DIALSTARTEVENT.Channel,
                            ele.DIALSTARTEVENT_ConnectedLineName = ele.DIALSTARTEVENT.ConnectedLineName,
                            ele.DIALSTARTEVENT_ConnectedLineNum = ele.DIALSTARTEVENT.ConnectedLineNum,
                            ele.DIALSTARTEVENT_DestUniqueID = ele.DIALSTARTEVENT.DestUniqueID,
                            ele.DIALSTARTEVENT_Destination = ele.DIALSTARTEVENT.Destination,
                            ele.DIALSTARTEVENT_Dialstring = ele.DIALSTARTEVENT.Dialstring,
                            ele.DIALSTARTEVENT_Event = ele.DIALSTARTEVENT.Event,
                            ele.DIALSTARTEVENT_Privilege = ele.DIALSTARTEVENT.Privilege,
                            ele.DIALSTARTEVENT_SubEvent = ele.DIALSTARTEVENT.SubEvent,
                            ele.DIALSTARTEVENT_UniqueID = ele.DIALSTARTEVENT.UniqueID
                        )
                    } else {
                        return (ele.DIALSTARTEVENT_CallerIDName = "",
                            ele.DIALSTARTEVENT_CallerIDNum = "",
                            ele.DIALSTARTEVENT_Channel = "",
                            ele.DIALSTARTEVENT_ConnectedLineName = "",
                            ele.DIALSTARTEVENT_ConnectedLineNum = "",
                            ele.DIALSTARTEVENT_DestUniqueID = "",
                            ele.DIALSTARTEVENT_Destination = "",
                            ele.DIALSTARTEVENT_Dialstring = "",
                            ele.DIALSTARTEVENT_Event = "",
                            ele.DIALSTARTEVENT_Privilege = "",
                            ele.DIALSTARTEVENT_SubEvent = "",
                            ele.DIALSTARTEVENT_UniqueID = ""
                        )
                    }
                })
                res.data.records.map((ele) => {
                    if (ele.hasOwnProperty("ORIGINATEEVENT")) {
                        return (
                            ele.ORIGINATEEVENT_ActionID = ele.ORIGINATEEVENT.ActionID,
                            ele.ORIGINATEEVENT_CallerIDNam = ele.ORIGINATEEVENT.CallerIDNam,
                            ele.ORIGINATEEVENT_CallerIDNum = ele.ORIGINATEEVENT.CallerIDNum,
                            ele.ORIGINATEEVENT_Channel = ele.ORIGINATEEVENT.Channel,
                            ele.ORIGINATEEVENT_Context = ele.ORIGINATEEVENT.Context,
                            ele.ORIGINATEEVENT_Event = ele.ORIGINATEEVENT.Event,
                            ele.ORIGINATEEVENT_Exten = ele.ORIGINATEEVENT.Exten,
                            ele.ORIGINATEEVENT_Privilege = ele.ORIGINATEEVENT.Privilege,
                            ele.ORIGINATEEVENT_Reason = ele.ORIGINATEEVENT.Reason,
                            ele.ORIGINATEEVENT_Response = ele.ORIGINATEEVENT.Response,
                            ele.ORIGINATEEVENT_Uniqueid = ele.ORIGINATEEVENT.Uniqueid
                        )
                    } else {
                        return (ele.ORIGINATEEVENT_ActionID = "",
                            ele.ORIGINATEEVENT_CallerIDNam = "",
                            ele.ORIGINATEEVENT_CallerIDNum = "",
                            ele.ORIGINATEEVENT_Channel = "",
                            ele.ORIGINATEEVENT_Context = "",
                            ele.ORIGINATEEVENT_Event = "",
                            ele.ORIGINATEEVENT_Exten = "",
                            ele.ORIGINATEEVENT_Response = "",
                            ele.ORIGINATEEVENT_Reason = "",
                            ele.ORIGINATEEVENT_Uniqueid = ""
                        )
                    }
                })
                setRecords(res.data.records)
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
            <Grid item xs={6} sm={6} lg={4}><h3>Interaction Performance Report</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} setLoader={setLoader} /><DownloadReport DownloadData={records} /></Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={4} sm={4} lg={2}>
                {
                    loader ? (<div>

                        <CircularProgress />

                    </div>
                    ) : (null)
                }
            </Grid>
            <Grid item xs={6} sm={6} lg={5}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">

        </Grid>
        <Grid container spacing={3} direction="row">
            {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                         <Card >
                            <CardContent style={{ 'height': '500px' }}>
                                <DataGrid components={{
                                    Toolbar: GridToolbar,
                                }} rows={records} columns={interactionColumns} pageSize={5}
                                onRowClick={getDataof1}
                                    pagination />
                            </CardContent>
                        </Card>
                     {show === true ? <Popup record={cdr} show={show} handleClose={handleClose} />: <></>}
                    </Grid>
                ) : (null)
            }
        </Grid>
    </div>)
}

export default InteractionReport