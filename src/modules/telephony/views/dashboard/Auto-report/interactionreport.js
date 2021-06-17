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
import { DataGrid } from '@material-ui/data-grid';
import Popup from './cdrPopup'
import ExcelReport from '../ExcelReport'
import { AGENT_PERFORMANCE } from 'src/modules/dashboard-360/utils/endpoints'

const InteractionReport = (props) => {
    const [records, setRecords] = useState([])
    const [show, setShow] = useState(false)
    const [cdr, setCdr] = useState([])

    const handleClose = () => {
        setShow(false);

    };

    const getDataof1 = (id) => {
        console.log(id)
        axios.get(`${AGENT_PERFORMANCE}/interactions/${id}`)
            .then((res) => {
                console.log(res.data)
                setCdr(res.data)
                setShow(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }




    const getData = (date, enddate) => {
        console.log(date, enddate)
        let value = moment(date).format().slice(0, 10)
        let value2 = moment(enddate).format().slice(0, 10)
        const data = {
            "startDate": value,
            "endDate": value2
        }

        axios.post(`${AGENT_PERFORMANCE}/interactions/bydaterange`, data)
            .then((res) => {
                console.log(res.data.records)
                res.data.records = res.data.records.reverse()
                var i = 0
                res.data.records.map((ele) => {
                    i = i + 1
                    return ele.id = i
                })

                // res.data.records.map((ele) => {
                //     if (ele.CALLSTARTTIME.length > 1) {
                //         value = new Date(ele.CALLSTARTTIME).toLocaleString()
                //         return ele.CALLSTARTTIME = value
                //     }

                // })
                // res.data.records.map((ele) => {
                //     if (ele.CALLPICKEDTIME.length > 1) {
                //         return ele.CALLPICKEDTIME = new Date(ele.CALLPICKEDTIME / 1000).toUTCString()
                //     }

                // })
                res.data.records.map((ele) => {
                    const value = ele.LASTDTMFOPTION.toString()
                    return ele.optionsselct = value
                })
                res.data.records.map((ele) => {
                    const value = moment(ele.createdAt).format('MMMM Do YYYY, h:mm:ss a')
                    return ele.createdAt = value
                })

                res.data.records.map((ele) => {

                    if (ele.hasOwnProperty("CRMDISPOSITION")) {
                        return (
                            ele.mainDisposition = ele.CRMDISPOSITION.mainDisposition,
                            ele.subDisposition = ele.CRMDISPOSITION.subDisposition,
                            ele.sip_id = ele.CRMDISPOSITION.sip_id,
                            ele.agent_type = ele.CRMDISPOSITION.agent_type,
                            ele.agent_id = ele.CRMDISPOSITION.agent_id,
                            ele.agentName = ele.CRMDISPOSITION.agentName,
                            ele.response = ele.CRMDISPOSITION.response
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

    // if (records.length > 0) {
    //     const records1 = records.map((ele) => {
    //         return ele.CALLSTARTTIME === new Date(ele.CALLSTARTTIME)
    //     })
    //     setRecords(records1)
    // }


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
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /><DownloadReport DownloadData={records} /></Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid>
        <Grid container spacing={3} direction="row">
            {/* {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                        <DataGrid rows={records} columns={profilesColumns} pageSize={10}
                            //rowsPerPageOptions={[10, 20, 50]}
                            autoHeight="true"
                            pagination />
                    </Grid>
                ) : (null)
            } */}
        </Grid>
        <Grid container spacing={3} direction="row">
            {
                records.length > 0 ? (
                    <Grid item xs={6} sm={6} lg={12}>
                        <div id="dtHorizontalVerticalExample" class="table table-striped table-bordered table-sm " cellspacing="2"
                            width="100%">

                            <table class="table table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Call Id</th>
                                        <th scope="col" >Agent Name</th>
                                        <th scope="col">Agent Id</th>
                                        <th scope="col">Caller Number</th>
                                        <th scope="col">Call Start Time</th>
                                        <th scope="col">Call Picked Time</th>
                                        <th scope="col">Call Disconnected Time</th>
                                        <th scope="col">Call No Answer Time</th>
                                        <th scope="col">Call Disposed Time</th>
                                        <th scope="col">Total Call Duration</th>
                                        <th scope="col">Call Connected Duration</th>
                                        <th scope="col">Call Disconnected Duration</th>
                                        <th scope="col">Call Ring Duration</th>
                                        <th scope="col">Caller Name</th>
                                        <th scope="col">Queue</th>
                                        <th scope="col">Location </th>
                                        <th scope="col">Main Disposition</th>
                                        <th scope="col">SUB Disposition </th>
                                        <th scope="col">Sip ID</th>
                                        <th scope="col">Agent Type</th>
                                        <th scope="col">Agent ID</th>
                                        <th scope="col">Agent Name</th>
                                        <th scope="col">Response</th>
                                        <th scope="col">Callback Date Time </th>
                                        <th scope="col">Remarks</th>
                                        <th scope="col">Record Date Time</th>
                                        <th scope="col">Last DTMF Option</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        records.map((ele) => {
                                            return (
                                                <tr onClick={() => { getDataof1(ele._id) }}>
                                                    <td>{ele.id}</td>
                                                    <td>{ele.CALLID}</td>
                                                    <td >{ele.AGENTNAME}</td>
                                                    <td>{ele.AGENTID}</td>
                                                    <td>{ele.CALLERNUMBER}</td>
                                                    <td>{ele.CALLSTARTTIME}</td>
                                                    <td>{ele.CALLPICKEDTIME}</td>

                                                    <td>{ele.CALLDICONNECTEDTIME}</td>
                                                    <td>{ele.CALLNOANSWERTIME}</td>
                                                    <td>{ele.CALLDISPOSEDTIME}</td>
                                                    <td>{ele.TOTALCALLDURATION}</td>

                                                    <td>{ele.CALLCONNECTEDDURATION}</td>
                                                    <td>{ele.CALLDISCONECTEDDURATION}</td>
                                                    <td>{ele.CALLRINGDURATION}</td>

                                                    <td>{ele.CallerName}</td>
                                                    <td>{ele.Queue}</td>
                                                    <td>{ele.Location}</td>


                                                    <td>{ele.mainDisposition}</td>
                                                    <td>{ele.subDisposition}</td>
                                                    <td>{ele.sip_id}</td>
                                                    <td>{ele.agent_type}</td>
                                                    <td>{ele.agent_id}</td>
                                                    <td>{ele.agentName}</td>

                                                    <td>{ele.response}</td>

                                                    <td>{ele.CallbackDate}</td>
                                                    <td>{ele.Remarks}</td>
                                                    <td>{ele.createdAt}</td>
                                                    {/* <td>{ele.Location}</td> */}
                                                    <td>{ele.optionsselct}</td>




                                                    {/* <td>{ele.Disposition}</td>
                                                    <td>{ele.SubDisposition}</td> */}

                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                        </div>
                        <Popup record={cdr} show={show} handleClose={handleClose} />
                    </Grid>
                ) : (null)
            }
        </Grid>

    </div>)
}

export default InteractionReport