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
import { AGENT_PERFORMANCE } from 'src/modules/dashboard-360/utils/endpoints'


const Popup = (props) => {
    const { show, handleClose, record } = props
    const [open, setOpen] = React.useState(false);
    const [name, setname] = useState("")
    const [processtype, setProcessType] = useState("")
    const [processName, setProcessname] = useState("")
    const [phone, setPhone] = useState("")
    const [sip, setSip] = useState("")
    const [processlocation, setProcessLocation] = useState("")
    const [queue, setQueue] = useState("")
    const [email, setEmail] = useState("")
    const [processGroup, setProcessGroup] = useState("")
    const [password, setPassword] = useState("")

    const handleName = (e) => setname(e.target.value)
    const handleprocesstype = (e) => setProcessType(e.target.value)
    const handleprocessName = (e) => setProcessname(e.target.value)
    const handlephone = (e) => setPhone(e.target.value)
    const handlesip = (e) => setSip(e.target.value)
    const handleprocesslocation = (e) => setProcessLocation(e.target.value)
    const handlequeue = (e) => setQueue(e.target.value)
    const handleemail = (e) => setEmail(e.target.value)
    const handleprocessGroup = (e) => setProcessGroup(e.target.value)
    const handlepassword = (e) => setPassword(e.target.value)

    //console.log(record)

    useEffect(() => {
        setname(record.name)
        setProcessType(record.ProcessType)
        setProcessname(record.ProcessName)
        if (show && record.id.length > 9) {
            setPhone(record.id)
        } else {
            setSip(record.id)
        }

        setProcessLocation(record.ProcessLocation)
        setQueue(record.Queue)
        setEmail(record.UserName)
        setProcessGroup(record.ProcessGroup)
    }, [props])

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleReset = () => {
        setname("")
        setProcessType("")
        setProcessname("")
        setPhone("")
        setSip("")
        setProcessLocation("")
        setQueue("")
        setEmail("")
        setProcessGroup("")
        setPassword("")
    }

    const Addagent = () => {
        // console.log("i am here")
        // console.log(sip, "sip")
        if (!sip) {
            //setSip(phone)
            const data = {
                "username": email,
                // "password": phone,
                "role": "agent",
                "id": phone,
                "Name": name,
                "agentAvailability": "Mobile",
                "queuePrefix": "",
                "ProcessName": processName,
                "ProcessLocation": processlocation,
                "Queue": queue,
                "enabled": "true",
                "queueLocation": `Local/5${phone}@from-internal`,
                "ProcessGroup": processGroup,
                "ProcessType": processtype,
                "Location": `Local/5${phone}@from-internal`,
                "MemberName": `Local/5${phone}@from-internal`,
                "StateInterface": `Local/5${phone}@from-internal`
            }
            console.log(data)

            axios.put(`${AGENT_PERFORMANCE}/agents/${record._id}`, data)
                .then((res) => {
                    // console.log(res.data)
                    alert(`Agent Updated Successfully`)
                })
                .catch((err) => {
                    console.log(err)
                })

            if (password) {
                const data1 = {
                    "token": localStorage.getItem('jwt'),
                    "newpassword": password,
                    "_id": record._id
                }


                axios.post(`http://192.168.4.44:62003/api/reset-password`, data1)
                    .then((res) => {
                        if (res.data.status === 'ok') {
                            alert(`Password Changed Successfully`)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

            //console.log(data)

        } else {
            const id = `SIP/${sip}`
            const data = {
                "username": email,
                //"password": phone,
                "role": "agent",
                "id": sip,
                "Name": name,
                "agentAvailability": "Sip",
                "queuePrefix": "",
                "ProcessName": processName,
                "ProcessLocation": processlocation,
                "Queue": queue,
                "enabled": "true",
                "queueLocation": id,
                "ProcessGroup": processGroup,
                "ProcessType": processtype,
                "Location": id,
                "MemberName": id,
                "StateInterface": id
            }
            console.log("i am here")
            console.log(data)
            axios.put(`${AGENT_PERFORMANCE}/agents/${record._id}`, data)
                .then((res) => {
                    // console.log(res.data)
                    alert(`Agent updated Successfully`)
                })
                .catch((err) => {
                    console.log(err)
                })

            if (password) {
                const data1 = {
                    "token": localStorage.getItem('jwt'),
                    "newpassword": password,
                    "_id": record._id
                }
                axios.post(`http://192.168.4.44:62003/api/reset-password`, data1)
                    .then((res) => {
                        //console.log(res.data)
                        if (res.data.status === 'ok') {
                            alert(`Password Changed Successfully`)
                        }

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
        //console.log(data)
        handleReset()

        handleClose()

    }


    return (<div>
        <Dialog
            open={show}
            onClose={() => handleClose()}
            style={{ padding: 2 }}
        >
            <DialogTitle>Update Agent</DialogTitle>
            < DialogContent>
                <Grid container spacing={3} direction="row">
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleName} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Email-ID" variant="outlined" value={email} onChange={handleemail} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Number" variant="outlined" value={phone} onChange={handlephone} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Name" variant="outlined" value={processName} onChange={handleprocessName} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Location" variant="outlined" value={processlocation} onChange={handleprocesslocation} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Group" variant="outlined" value={processGroup} onChange={handleprocessGroup} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="SIP ID" variant="outlined" value={sip} onChange={handlesip} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlepassword} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Type" variant="outlined" value={processtype} onChange={handleprocesstype} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Queue" variant="outlined" value={queue} onChange={handlequeue} /></Grid>
                    <Grid item xs={6} sm={6} lg={6}><Button variant="contained" color="primary" onClick={Addagent}>Update Agent</Button></Grid>
                    <p><Button variant="contained" onClick={() => { handleClose(); handleReset() }}>Close</Button></p>
                </Grid>
            </DialogContent>
        </Dialog>
    </div>)
}

export default Popup