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
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import axios from 'axios';
import moment from 'moment'
import { DataGrid } from '@material-ui/data-grid';
import { MDBDataTable } from 'mdbreact';
import Popup from './cdrPopup'

const CdrReports = (props) => {
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
                //     let value = new Date(ele.CALLSTARTTIME)
                //     value = new Date(value)
                //     return ele.CALLSTARTTIME = value
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
        {/* <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}><h3>CDR  Reports</h3></Grid>
            <Grid item xs={6} sm={6} lg={3}></Grid>
        </Grid> */}
        {/* <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} lg={5}></Grid>
            <Grid item xs={6} sm={6} lg={4}> <InteractionDate getData={getData} /><DownloadReport DownloadData={records} /></Grid>
            <Grid item xs={6} sm={6} lg={1}></Grid>
            <Grid item xs={6} sm={6} lg={2}></Grid>
        </Grid> */}
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
                        <div id="dtHorizontalVerticalExample" class="table table-striped table-bordered table-sm " cellspacing="0"
                            width="100%">

                            <table class="table table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Record ID</th>
                                        <th scope="col" >AGENTNAME</th>
                                        <th scope="col">AGENTID</th>
                                        <th scope="col">CALLERNUMBER</th>
                                        <th scope="col">CRD_AMAFlags</th>
                                        <th scope="col">CRD_AccountCode</th>
                                        <th scope="col">CRD_AnswerTime</th>
                                        <th scope="col">CRD_CallerID</th>

                                        <th scope="col"> CRD_Destination</th>
                                        <th scope="col">CRD_DestinationChannel</th>
                                        <th scope="col">CRD_Duration</th>
                                        <th scope="col">CRD_AnswerTime</th>
                                        <th scope="col">CRD_EndTime</th>
                                        <th scope="col">CRD_Event</th>
                                        <th scope="col">CRD_LastApplication</th>
                                        <th scope="col">CRD_StartTime</th>

                                        <th scope="col">CRD_LastData</th>
                                        <th scope="col">CRD_Privilege</th>
                                        <th scope="col">CRD_Source</th>
                                        <th scope="col">CRD_UniqueID</th>
                                        <th scope="col">CRD_UserField</th>


                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        records.map((ele) => {
                                            return (
                                                <tr onClick={() => { getDataof1(ele._id) }}>
                                                    <td>{ele.id}</td>
                                                    <td>{ele._id}</td>
                                                    <td >{ele.AGENTNAME}</td>
                                                    <td>{ele.AGENTID}</td>
                                                    <td>{ele.CALLERNUMBER}</td>
                                                    <td>{ele.CRD_AMAFlags}</td>
                                                    <td>{ele.CRD_AccountCode}</td>
                                                    <td>{ele.CRD_AnswerTime}</td>
                                                    <td>{ele.CRD_CallerID}</td>
                                                    <td>{ele.CRD_Destination}</td>
                                                    <td>{ele.CRD_DestinationChannel}</td>
                                                    <td>{ele.CRD_DestinationContext}</td>
                                                    <td>{ele.CRD_Duration}</td>
                                                    <td>{ele.CRD_AnswerTime}</td>
                                                    <td>{ele.CRD_EndTime}</td>
                                                    <td>{ele.CRD_Event}</td>
                                                    <td>{ele.CRD_LastApplication}</td>
                                                    <td>{ele.CRD_StartTime}</td>
                                                    <td>{ele.CRD_LastData}</td>
                                                    <td>{ele.CRD_Privilege}</td>
                                                    <td>{ele.CRD_Source}</td>
                                                    <td>{ele.CRD_UniqueID}</td>
                                                    <td>{ele.CRD_UserField}</td>



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

export default CdrReports