import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
  TextField

} from '@material-ui/core';
import {
  PUT_BREAK_AGENT,
  GET_INTERACTION_BY_DISTRIBUTOR_ID,
  GET_INTERACTION_BY_AGENT_SIP_ID,
  UPDATE_CURRENT_STATUS,
  GET_CURRENT_STATUS_BY_AGENT_SIP_ID
} from 'src/modules/dashboard-360/utils/endpoints';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import MainLoader from 'src/components/MainLoader';
import {
  CallerInteractioncolumns, lastFiveCallData,
} from 'src/modules/dashboard-360/utils/columns-config';
import CommonAlert from 'src/components/CommonAlert';
import { connect, useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import CallIcon from '@material-ui/icons/Call';
import socketIOClient from 'socket.io-client';
import { setAgentCurrentStatus } from 'src/redux/action';
import Switch from './switch';
import { setDistributorOrders } from '../../redux/action';
import DispositionForm from './DispositionForm';


const SOCKETENDPOINT = 'http://192.168.3.36:62002';
const APIENDPOINT = 'http://192.168.3.36:62002';
const axios = require('axios');

const socket = socketIOClient(SOCKETENDPOINT, { transports: ['websocket'] });
const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    panelBody: {
      padding: 0
    },
    dialogActions: {
      padding: '0 1.5rem 1rem'
    },
    modal: {
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    timerComp: {
      position: 'absolute',
      top: 0,
      left: '55%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      backgroundColor: theme.palette.secondary.light,
      padding: '8px 10px',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    callWrapper: {
      left: 'calc(55% + 90px)'
    },
    callInbound: {
      backgroundColor: theme.palette.success.light
    },
    callOutbound: {
      backgroundColor: theme.palette.secondary.light
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1, 1)
    }
  };
});


const Dashboard = ({
  setAgentCurrentStatusAction,
}) => {
  const classes = useStyles();
  const user1 = useSelector(state => state.userData)
  const reduxState = useSelector(state => state);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [ticketType, setTicketType] = useState({});
  const [category, setCategory] = useState({});
  const [selectedData1, setSelectedData1] = useState({})
  const [selectedItem, setSelectedItem] = useState({
    CallerName: "",
    agentExtension: "",
    agentID: "",
    asterixUniqueID: "",
    callerapplication: "",
    callermobilenumber: "",
    category: "",
    comments: "",
    contactedNumber: "",
    created: "",
    createdAt: "",
    issuetype: "",
    seccategory: "",
    secsubcategory: "",
    subcategory: "",
    type: "",
    updatedAt: "",
    _id: "",
  })
  const [open, setOpen] = React.useState(false);
  const [searchItem, setSearchItem] = useState("")
  const [customerTable, setCustomertable] = useState([])
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const [currentCall, setCurrentCall] = useState({
    callStatus: '',
    callUniqueId: '',
    // callType: '',

    // callDetails: '',
    // callDispositionStatus: '',
    // callerNumber: '',
    // breakStatus: ''
  });
  const [user, setUserDetails] = useState({
    userType: 'agent'
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentType: localStorage.getItem('AgentType'),
    AgentSipId: localStorage.getItem('AgentSIPID')
  });
  const [ALF, setALF] = useState([]);
  const [DLF, setDLF] = useState([]);
  const [disForm, setdisForm] = useState({});

  // console.log(user1)

  function getDLF() {

  }

  function getALF() {


  }

  function getOpenTickets(agentType, status) {

  }
  function selectedDataForObutbound(data) {


  }

  function setCurrentCallDetails(
    // callStatusId,
    // callUniqueId,
    // callType,
    callStatus,
    // callEvent,
    // callDispositionStatus,
    // callerNumber,
    // breakStatus
  ) {
    setCurrentCall({
      // callStatusId,
      // callUniqueId,
      // callType,
      callStatus,
      // callEvent,
      // callDispositionStatus,
      // callerNumber,
      // breakStatus
    });
    // localStorage.setItem('callStatusId', callStatusId);
    // localStorage.setItem('callUniqueId', callUniqueId);
    // localStorage.setItem('callType', callType);
    localStorage.setItem('callStatus', callStatus);
    // localStorage.setItem('Interaction_ID', callUniqueId)
    // localStorage.setItem('callEvent', callEvent);
    // localStorage.setItem('callDispositionStatus', callDispositionStatus);
    // localStorage.setItem('callerNumber', callerNumber);
    // localStorage.setItem('breakStatus', breakStatus);
  }

  function addToQueue(agentId, queue) {

  }
  function removeFromQueue(agentId, queue) {

  }
  function makeCall() {

  }

  function updateAgentCallStatus(updateData) {

  }

  function getAgentCallStatus(agentSipID) {
    // console.log('calling the', agentSipID);

    var axios = require('axios');

    var config = {
      method: 'get',
      url: `http://192.168.3.36:33002/api/agents/${agentSipID}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
        setCurrentCallDetails(
          response.data.Event,
          localStorage.setItem('Interaction_id', response.data.InteractionID),
          localStorage.setItem('CallerNumber', response.data.CallerIDNum)
        )
        if (response.data.Paused === '1') {
          localStorage.setItem('Break_Status', 'IN')
        } else {
          localStorage.setItem('Break_Status', 'OUT')
        }
        localStorage.setItem('Queue', response.data.Queue)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function breakService() {
    console.log("called from dispos")
    const AgentSIPID = localStorage.getItem('AgentSIPID')
    if (localStorage.getItem('Break_Status') === 'OUT') {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `http://192.168.3.36:33003/ami/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=BREAKIN&Break=true`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `http://192.168.3.36:33003/ami/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=BREAKOUT&Break=false`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  useEffect(() => {

    async function getInitialData() {
      try {
        await getAgentCallStatus(localStorage.getItem('Agent_Object_ID'));
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setLoadingDetails(false);



  }, []);



  useEffect(() => {
    const agentSipID = localStorage.getItem('Agent_Object_ID')
    const interval = setInterval(async () => {
      const GET_CURRENT_STATUS_BY_AGENT_SIP_ID = `http://192.168.3.36:33002/api/agents/${localStorage.getItem('Agent_Object_ID')}`;
      const getCurrentStatus = await axios.get(GET_CURRENT_STATUS_BY_AGENT_SIP_ID);
      //console.log('getCurrentStatus', getCurrentStatus)
      getAgentCallStatus(agentSipID)


    }, 3000);





  }, [])



  useEffect(() => {
    getALF();


    if (
      currentCall.callerNumber !== '' &&
      currentCall.callDispositionStatus === 'NotDisposed'
    ) {
      getDLF();

    }
    // getALF();
    if (localStorage.getItem('Agenttype') === 'L1') {
      // getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      // getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L3') {
      // getOpenTickets('L2', 'open');
    }

  }, [
    currentCall.callDispositionStatus,
    currentCall.callStatus,
    currentCall.breakStatus
  ]);

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const searchaction = (e) => {
    let config = {
      method: 'get',

      url: `http://164.52.205.10:42004/crm/callermobilenumber?callermobilenumber=${searchItem}`,
      headers: {
        'Content-Type': 'application/json'
      },

    };
    axios(config)
      .then(response => {
        console.log('Response data', JSON.stringify(response.data));
        setCustomertable(response.data)
        // props.getALF();
      })
      .catch(error => {
        console.log('dispostionFrom', error);
      });
  }



  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>
      {
        localStorage.getItem('role') === 'agent' ? (
          <div>
            <Box
              alignItems="center"
              display="flex"
              className={`${classes.timerComp} ${classes.callWrapper} ${classes.callInbound}`}
            >
              {
                currentCall.callStatus === 'AgentCalled' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
          Call Ringing
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'AgentConnect' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
                    {localStorage.getItem('CallerNumber')}-Call in Progress
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'AgentComplete' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
                    {localStorage.getItem('CallerNumber')}- Call Disconnected
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'AgentDisposed' || currentCall.callStatus === 'LoggedIn' || currentCall.callStatus === 'BREAKOUT' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
         Free for next call
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'BREAKIN' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
                  You are in Break
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'AgentRingNoAnswer' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
         Call Not Answered
        </Typography>
                </div>) : null
              }

            </Box>
            <CustomBreadcrumbs />
            <Page className={classes.root} title="Dashboard">
              <Container maxWidth={false}>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={6} xs={12}>

                    <Grid item>
                      {currentCall.callStatus === 'AgentDisposed' || currentCall.callStatus === 'LoggedIn' || currentCall.callStatus === 'BREAKOUT' || currentCall.callStatus === 'BREAKIN' ? (<Button variant="contained" color="primary" onClick={breakService}>{localStorage.getItem('Break_Status') === 'OUT' ? ('Take a Break') : ('You are in break')}</Button>) : (null)

                      }

                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>

                  <Grid item lg={12} md={12} xs={12}>

                    <Card>
                      <CardHeader title="Disposition Details" />
                      <Divider />
                      {currentCall.callStatus !== 'AgentDisposed' &&
                        user.userType === 'agent' && currentCall.callStatus !== 'LoggedIn' && currentCall.callStatus !== 'AgentRingNoAnswer' && currentCall.callStatus !== 'BREAKOUT' && currentCall.callStatus !== 'BREAKIN' && currentCall.callStatus !== 'LoggedOut' && currentCall.callStatus !== '0' ? (<CardContent>
                          <DispositionForm
                            breakService={breakService}
                            agentSipID={agent.AgentSipId}
                            DLF={DLF}
                            setCurrentCallDetails={setCurrentCallDetails}
                            addToQueue={addToQueue}
                            removeFromQueue={removeFromQueue}
                            selectedData1={selectedData1}
                            // getALF={getALF}
                            disForm={disForm}
                            setdisForm={form => {
                              setdisForm(form);
                            }}
                            category={category}
                            setCategory={cat => {
                              setCategory(cat);
                            }}
                            ticketType={ticketType}
                            setTicketType={tkstyp => {
                              setTicketType(tkstyp);
                            }}
                            subCategory={subCategory}
                            setSubCategory={subcat => {
                              setSubCategory(subcat);
                            }}
                            subCategoryItem={subCategoryItem}
                            setSubCategoryItem={subcatitem => {
                              setSubCategoryItem(subcatitem);
                            }}
                            remarks={remarks}
                            setRemarks={rks => {
                              setRemarks(rks);
                            }}
                            currentCall={currentCall.callStatus}
                          />
                        </CardContent>
                      ) : (<></>)}
                    </Card>
                  </Grid>

                </Grid>

              </Container>
            </Page>

            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Outbound Call"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are You sure, You Want to make a Outbound Call ?
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Close
          </Button>
                <Button onClick={makeCall} color="primary" autoFocus>
                  Make A Call
          </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (<div>

        </div>)
      }


    </div>
  ) : (
    <MainLoader />
  );
};
Dashboard.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  agentCurrentStatus: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func,
  setAgentCurrentStatusAction: PropTypes.func,
  searchDistributor: PropTypes.string
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders,
    agentCurrentStatus: state.currentCall,
    searchDistributor: state.searchDistributor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders =>
      dispatch(setDistributorOrders(orders)),
    setAgentCurrentStatusAction: currentCall =>
      dispatch(setAgentCurrentStatus(currentCall)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


