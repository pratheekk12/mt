import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {
    Grid, TextField
} from '@material-ui/core';
import axios from 'axios';
import {AUTH} from 'src/modules/dashboard-360/utils/endpoints'
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
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

    const handleName = (e) => setname(e.target.value)
    const handleprocesstype = (e) => setProcessType(e.target.value)
    const handleprocessName = (e) => setProcessname(e.target.value)
    const handlephone = (e) => setPhone(e.target.value)
    const handlesip = (e) => setSip(e.target.value)
    const handleprocesslocation = (e) => setProcessLocation(e.target.value)
    const handlequeue = (e) => setQueue(e.target.value)
    const handleemail = (e) => setEmail(e.target.value)
    const handleprocessGroup = (e) => setProcessGroup(e.target.value)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
    }

    const Addagent = () => {

        if (name.length !== 0 && processtype.length !== 0 && processName.length !== 0 && phone.length !== 0 && processlocation.length !== 0 && queue.length !== 0 && email.length !== 0 && processGroup.length !== 0) {
            // if (sip.length === 0) {
            //     setSip(phone)
            // }

            if (sip.length === 0) {
                //setSip(phone)
                const data = {
                    "username": email,
                    "password": phone,
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

                axios.post(`${AUTH}/register`, data)
                    .then((res) => {
                        console.log(res.data)
                        alert(`Agent Added Successfully`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })


                console.log("if",data)

            } else {
                const id = `SIP/${sip}`
                const data = {
                    "username": email,
                    "password": phone,
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
                console.log("else",data)
                axios.post(`${AUTH}/register`, data)
                    .then((res) => {
                        console.log(res.data)
                        alert(`Agent Added Successfully`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }



            //console.log(data)
            handleReset()

            handleClose()
        }



    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <AddIcon />
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Agent
        </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3} direction="row">
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleName} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Email-ID" variant="outlined" value={email} onChange={handleemail} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Number" variant="outlined" value={phone} onChange={handlephone} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Name" variant="outlined" value={processName} onChange={handleprocessName} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Location" variant="outlined" value={processlocation} onChange={handleprocesslocation} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Group" variant="outlined" value={processGroup} onChange={handleprocessGroup} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="SIP ID" variant="outlined" value={sip} onChange={handlesip} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Process Type" variant="outlined" value={processtype} onChange={handleprocesstype} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><TextField id="outlined-basic" label="Queue" variant="outlined" value={queue} onChange={handlequeue} /></Grid>
                        <Grid item xs={6} sm={6} lg={6}><Button variant="contained" color="primary" onClick={Addagent}>Add Agent</Button></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}