import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
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
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import axios from 'axios'


const Popup = (props) => {
    const { show, handleClose, record } = props

    console.log(record)
    return (<div>
        <Dialog
            open={show}
            onClose={() => handleClose()}
            style={{ padding: 2 }}
        >
            <DialogTitle>Cdr Report</DialogTitle>
            < DialogContent>
                <Grid container spacing={3} direction="row">
                    <Grid item xs={6} sm={6} lg={6}>
                        {
                            record.CRD ? (<div>
                                <p><b>CDR</b></p>
                                <p>AccountCode : {record.CRD.AccountCode}</p>
                                <p>AnswerTime:{record.CRD.AnswerTime}</p>
                                <p>UniqueID:{record.CRD.UniqueID}</p>
                                <p>CallerID:{record.CRD.CallerID}</p>
                                <p>Channel:{record.CRD.Channel}</p>
                                <p>Destination:{record.CRD.Destination}</p>
                                <p>DestinationChannel:{record.CRD.DestinationChannel}</p>
                                <p>DestinationContext:{record.CRD.DestinationContext}</p>
                                <p>Disposition:{record.CRD.Disposition}</p>
                                <p>Duration:{record.CRD.Duration}</p>
                                <p>EndTime:{record.CRD.EndTime}</p>
                                <p>Event:{record.CRD.Event}</p>
                                <p>LastApplication:{record.CRD.LastApplication}</p>
                                <p>LastData:{record.CRD.LastData}</p>
                                <p>Privilege:{record.CRD.Privilege}</p>
                                <p>Source:{record.CRD.Source}</p>
                                <p>StartTime:{record.CRD.StartTime}</p>

                            </div>

                            ) : (<div></div>)
                        }
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        {
                            record.DIALSTARTEVENT ? (
                                <div>
                                    <p><b>DIALSTARTEVENT</b></p>
                                    <p>CallerIDName : {record.DIALSTARTEVENT.CallerIDName}</p>
                                    <p>CallerIDNum : {record.DIALSTARTEVENT.CallerIDNum}</p>
                                    <p>Channel : {record.DIALSTARTEVENT.Channel}</p>
                                    <p>ConnectedLineName : {record.DIALSTARTEVENT.ConnectedLineName}</p>
                                    <p>ConnectedLineNum : {record.DIALSTARTEVENT.ConnectedLineNum}</p>
                                    <p>DestUniqueID : {record.DIALSTARTEVENT.DestUniqueID}</p>
                                    <p>Dialstring : {record.DIALSTARTEVENT.Dialstring}</p>
                                    <p>Event : {record.DIALSTARTEVENT.Event}</p>
                                    <p>Privilege : {record.DIALSTARTEVENT.Privilege}</p>
                                    <p>SubEvent : {record.DIALSTARTEVENT.SubEvent}</p>
                                    <p>UniqueID : {record.DIALSTARTEVENT.UniqueID}</p>
                                </div>
                            ) : (<div></div>)
                        }

                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        {
                            record.ORIGINATEEVENT ? (
                                <div>
                                    <p><b>ORIGINATEEVENT</b></p>
                                    <p>ActionID : {record.ORIGINATEEVENT.ActionID}</p>
                                    <p>CallerIDName : {record.ORIGINATEEVENT.CallerIDName}</p>
                                    <p>CallerIDNum : {record.ORIGINATEEVENT.CallerIDNum}</p>
                                    <p>Channel : {record.ORIGINATEEVENT.Channel}</p>
                                    <p>Context : {record.ORIGINATEEVENT.Context}</p>
                                    <p>Event : {record.ORIGINATEEVENT.Event}</p>
                                    <p>Exten : {record.ORIGINATEEVENT.Exten}</p>
                                    <p>Event : {record.ORIGINATEEVENT.Event}</p>
                                    <p>Privilege : {record.ORIGINATEEVENT.Privilege}</p>
                                    <p>Reason : {record.ORIGINATEEVENT.Reason}</p>
                                    <p>Response : {record.ORIGINATEEVENT.Response}</p>
                                    <p>Uniqueid : {record.ORIGINATEEVENT.Uniqueid}</p>
                                </div>
                            ) : (<div></div>)
                        }
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        {
                            record.AGENTCALLEDEVENT ? (
                                <div>
                                    <p><b>AGENTCALLEDEVENT</b></p>
                                    <p>AgentName : {record.AGENTCALLEDEVENT.AgentName}</p>
                                    <p>AgentName : {record.AGENTCALLEDEVENT.AgentName}</p>
                                    <p>CallerIDName : {record.AGENTCALLEDEVENT.CallerIDName}</p>
                                    <p>CallerIDNum : {record.AGENTCALLEDEVENT.CallerIDNum}</p>
                                    <p>ChannelCalling : {record.AGENTCALLEDEVENT.ChannelCalling}</p>
                                    <p>ConnectedLineName : {record.AGENTCALLEDEVENT.ConnectedLineName}</p>
                                    <p>ConnectedLineNum : {record.AGENTCALLEDEVENT.ConnectedLineNum}</p>
                                    <p>Context : {record.AGENTCALLEDEVENT.Context}</p>
                                    <p>DestinationChannel : {record.AGENTCALLEDEVENT.DestinationChannel}</p>
                                    <p>Event : {record.AGENTCALLEDEVENT.Event}</p>
                                    <p>Extension : {record.AGENTCALLEDEVENT.Extension}</p>
                                    <p>Priority : {record.AGENTCALLEDEVENT.Priority}</p>
                                    <p>Privilege : {record.AGENTCALLEDEVENT.Privilege}</p>
                                    <p>Queue : {record.AGENTCALLEDEVENT.Queue}</p>
                                    <p>Uniqueid : {record.AGENTCALLEDEVENT.Uniqueid}</p>
                                </div>
                            ) : (<div></div>)
                        }
                    </Grid>

                    <Grid item xs={6} sm={6} lg={6}>
                        {
                            record.DIALENDEVENT ? (
                                <div>
                                    <p><b>DIALENDEVENT</b></p>
                                    <p>Channel : {record.DIALENDEVENT.Channel}</p>
                                    <p>DialStatus : {record.DIALENDEVENT.DialStatus}</p>
                                    <p>Event : {record.DIALENDEVENT.Event}</p>
                                    <p>Privilege : {record.DIALENDEVENT.Privilege}</p>
                                    <p>SubEvent : {record.DIALENDEVENT.SubEvent}</p>
                                    <p>UniqueID : {record.DIALENDEVENT.UniqueID}</p>
                                </div>
                            ) : (<div></div>)

                        }
                    </Grid>

                    <p><Button variant="contained" onClick={() => { handleClose() }}>Close</Button></p>
                </Grid>
            </DialogContent>
        </Dialog>
    </div>)
}

export default Popup