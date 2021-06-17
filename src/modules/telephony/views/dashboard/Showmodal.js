import React, { useEffect } from 'react'

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
    DialogTitle,
    DialogActions
} from '@material-ui/core';

import axios from 'axios'



const Popup = (props) => {
    const { candidate, handleClose, show, link, resume,modaldata } = props
 




 



    useEffect(() => {
console.log("props",props)
    }, [])


    return (<div>
        <Dialog
            open={show}
            onClose={() => handleClose()}
            style={{ padding: 2 }}
            fullWidth={true}
        >
            <DialogTitle>Campaign details uploaded</DialogTitle>
            < DialogContent>
                <Grid container spacing={3} direction="row">
                <Grid item xs={12} sm={6}>
                <p><b>Campaign Name: </b>{modaldata[0].ivrCampaignName}</p>
                <p><b>Total Records Uploaded: </b>{modaldata[0].totalRecords}</p>
                <p><b>Dailed records Count: </b>{modaldata[0].DailedCountrecordsCount}</p>
                <p><b>NotDailed records Count: </b>{modaldata[0].NotDailedrecordsCount}</p>
                <p><b>Answered records Count: </b>{modaldata[0].AnsweredrecordCount}</p>
                <p><b>Not Answered records Count: </b>{modaldata[0].NoAnsweredrecordCount}</p>
                <p><b>Failed calls records Count: </b>{modaldata[0].FailerrecordCount}</p>
                <p><b>Busy calls records Count: </b>{modaldata[0].BusyrecordCount}</p>
              
                <p><b>Congestion calls records Count: </b>{modaldata[0].CongestionrecordCount}</p>
                <p><b>Job complete records Count: </b>{modaldata[0].jobcompleterecordcount}</p>
                <p><b>Job not complete records Count: </b>{modaldata[0].jobnotcompleterecordcount}</p>
           
                   <h1></h1>
                   </Grid>
                   <br></br>
                </Grid>

              
            </DialogContent>
            <DialogActions>
            <p><Button variant="contained" onClick={handleClose}>Close</Button></p>
            </DialogActions>
        </Dialog>
    </div >)
}

export default Popup