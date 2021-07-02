import React, { useEffect, useState } from 'react';
import axios from 'axios'
import DownloadReport from '../DownloadReport'
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './dialog'
import AddIcon from '@material-ui/icons/Add';
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
import {
    MenuItem, InputLabel, Select,
    FormControl
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import moment from 'moment';
import { propTypes } from 'react-bootstrap/esm/Image';
import Dialog1 from './updatedialog'
import Popup from './PopUp'
import { date } from 'yup';
import {AGENT_SERVICE} from 'src/modules/dashboard-360/utils/endpoints'


const Inbound = (props) => {

    const [profiles1, setProfiles1] = useState([]);
    const [agents, setAgents] = useState([])
    const [liveCalls, setLivecalls] = useState([])
    const [breakdetails, setBreakdetails] = useState([])
    const [agentsFree, setAgentsFree] = useState([])
    const [idle, setIdle] = useState([])
    const [update, setUpdate] = useState({})
    const [show, setShow] = useState(false)
    const [ManageAgent, setManageAgent] = useState([])
 

    const profilesColumns = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 0.5

        },
        {
            headerName: 'Actions',
            field: 'id',

            renderCell: rowData => (
                <>
                    <Tooltip title="update">
                        <IconButton
                            onClick={() => <Dialog1 update={rowData.row} />}
                        ><Typography>{rowData.row.id}</Typography>
                        </IconButton>
                    </Tooltip>
                </>
            ),
            flex: 0.5
        },

        {
            headerName: 'Email',
            field: 'UserName',
            flex: 0.5
        },
        {
            headerName: 'Queue',
            field: 'Queue',
            flex: 0.5
        },
    ]
    const agentStatusColumn = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Status',
            field: 'Event',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const liveCallsColumn = [

        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Customer Number',
            field: 'CallerIDNum',
            flex: 1
        },
        {
            headerName: 'Queue',
            field: 'Queue',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const callsNotDisposed = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Customer Number',
            field: 'CallerIDNum',
            flex: 1
        },
        {
            headerName: 'Queue Name',
            field: 'Queue',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const agentsFreeColumn = [
        {
            headerName: 'Name',
            field: 'name',
            flex: 1

        },
        {
            headerName: 'Customer Number',
            field: 'CallerIDNum',
            flex: 1
        },
        {
            headerName: 'Queue ',
            field: 'Queue',
            flex: 1
        },
        {
            headerName: 'Duration',
            field: 'Mduration',
            flex: 1
        }
    ]
    const showProfile = (data) => {
        console.log(data.row)
        // const record = profiles1.filter((ele) => {
        //     return ele._id === data.row._id
        // })
        // console.log(record)
        
        var value=JSON.stringify(data.row)
        localStorage.setItem("Formdata",value)
        setUpdate(data.row)
        setShow(true)
    }


    const handleRejectPopup = (id) => {
        // console.log(id)

        // setOpen(true)
    }

    const getAgents = () => {
        axios.get(`${AGENT_SERVICE}/agents`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    res.data.map((ele) => {
                        if (ele.Event === 'AgentComplete') {
                            return ele.Event = 'Call Disconnected Not Disposed'
                        } else if (ele.Event === 'LoggedOut') {
                            return ele.Event = 'Logged Out'
                        } else if (ele.Event === 'BREAKIN') {
                            return ele.Event = 'On Break'
                        } else if (ele.Event === 'LoggedIn') {
                            return ele.Event = 'Logged In'
                        } else if (ele.Event === 'BREAKOUT') {
                            return ele.Event = 'Free for Next Call'
                        } else if (ele.Event === 'AgentCalled') {
                            return ele.Event = 'Ringing'
                        } else if (ele.Event === 'AgentRingNoAnswer') {
                            return ele.Event = 'Missed Last Call, Ready for Next Call'
                        } else if (ele.Event === 'AgentConnect') {
                            return ele.Event = 'On Call'
                        } else if (ele.Event === 'AgentDisposed') {
                            return ele.Event = 'Free for Next Call'
                        }
                    })


                    let value;
                    res.data.map((ele) => {
                      
                        value = new Date(ele.updatedAt).toUTCString()
                        //console.log(value)
                        // value = new date() - new Date(value)
                        value = new Date() - new Date(value)
                        console.log(value)
                        value = new Date(value).toUTCString().slice(17, 25)
                        //value = moment(value).format().slice(11, 18)
                        //value = moment(value).format()
                        return (
                            ele.Mduration = value
                        )
                    })
                  
                    setAgents(res.data)
                    const magagent = res.data.filter((ele) => {
                        var formattted1= parseInt(ele.updatedAt);
                        var formatte = moment.unix(formattted1/ 1000).format('DD-MM-yyyy');
                        var currentdate= moment(new Date()).format('DD-MM-yyyy')
                    
                        if(currentdate == formatte) {
                            // Date equals today's date
                            console.log("sub",formatte)
                            return ele;
                        }
                       
                    })
                    setManageAgent(magagent)
                    const idle1 = res.data.filter((ele) => {
                        return ele.Event === 'Call Disconnected Not Disposed'
                    })
                    setIdle(idle1)
                    const break1 = res.data.filter((ele) => {
                        return ele.Event === 'On Break'
                    })
                    setBreakdetails(break1)
                    const agentsFree1 = res.data.filter((ele) => {
                        return ele.Event === 'Free for Next Call'
                    })
                    setAgentsFree(agentsFree1)
                    const live = res.data.filter((ele) => {
                        return ele.Event === 'On Call'
                    })
                    setLivecalls(live)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {

        const interval = setInterval(async () => {
            getAgents()

        }, 3000);


    }, [])

    console.log(agents, "agents")

    const handleClose = () => {
        setShow(false);
        setUpdate({})
    };


    return (
        <>
            <Grid container spacing={3} direction="row">
                <Grid item xs={6} sm={6} lg={6}>
                    <Card>
                        <CardContent style={{ 'height': '500px' }}>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Manage Agents</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={1}>
                                    <Dialog />
                                </Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={agents} columns={profilesColumns} pageSize={5}
                                        // rowsPerPageOptions={[10, 20, 50]}
                                        onRowClick={showProfile}
                                        autoHeight="true"
                                        pagination />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                    <Card style={{ 'height': '500px' }}>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Agents Status</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={ManageAgent} columns={agentStatusColumn} pageSize={5}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination  />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                    <Card style={{ 'height': '500px' }}>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Break Details</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={breakdetails} columns={agentStatusColumn} pageSize={5}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination  />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                    <Card style={{ 'height': '500px' }}>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Live Calls</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={liveCalls} columns={liveCallsColumn} pageSize={5}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination  />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                    <Card style={{ 'height': '500px' }}>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Agents Free</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={agentsFree} columns={agentsFreeColumn} pageSize={5}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination  />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                    <Card style={{ 'height': '500px' }}>
                        <CardContent>
                            <Grid container spacing={3} direction="row">
                                <Grid item xs={6} sm={6} lg={5}></Grid>
                                <Grid item xs={6} sm={6} lg={5}> <b>Call Completed Not Disposed</b></Grid>
                                <Grid item xs={6} sm={6} lg={1}></Grid>
                                <Grid item xs={6} sm={6} lg={12}>
                                    <DataGrid rows={idle} columns={callsNotDisposed} pageSize={5}
                                        //rowsPerPageOptions={[5, 20, 50]}
                                        autoHeight="true"
                                        pagination  />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Popup record={update} show={show} handleClose={handleClose} />
        </>
    );


  
}

export default Inbound
