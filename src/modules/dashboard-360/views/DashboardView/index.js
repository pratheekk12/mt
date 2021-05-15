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

  console.log(user1)

  function getDLF() {
    // const config = {
    //   method: 'get',
    //   url:
    //     GET_INTERACTION_BY_DISTRIBUTOR_ID + localStorage.getItem('callerNumber'),
    //   headers: {},
    // };

    // axios(config)
    //   .then(async response => {
    //     let DLFDATA = response.data;
    //     DLFDATA = DLFDATA.reverse();
    //     // console.log('DLF', DLFDATA)
    //     setDLF(DLFDATA);
    //   })

    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  function getALF() {
    // // console.log('getALF')
    // setTimeout(function () {
    //   const config = {
    //     method: 'get',
    //     url: GET_INTERACTION_BY_AGENT_SIP_ID + agent.AgentSipId,
    //     headers: {}
    //   };

    //   axios(config)
    //     .then(async response => {
    //       console.log('ALFDATA', response)
    //       let ALFDATA = response.data;
    //       ALFDATA = ALFDATA.reverse();
    //       setALF(ALFDATA);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });

    // }, 3000);

  }

  function getOpenTickets(agentType, status) {
    // const config = {
    //   method: 'get',
    //   url: 'http://164.52.205.10:42004/crm/interactions/getByAgentStatus?type=' + agentType + '&status=' + status,
    //   headers: {}
    // };

    // axios(config)
    //   .then((response) => {
    //     // console.log(JSON.stringify(response.data));
    //     const ALFDATA = response.data;
    //     setALF(ALFDATA);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

  }
  function selectedDataForObutbound(data) {
    // setSelectedData1(data)
    // // console.log(localStorage.getItem('AgentType'))
    // if (localStorage.getItem('AgentType') === 'Outbound' && localStorage.getItem('callDispositionStatus') === 'Disposed') {
    //   // console.log('selected', data)
    //   localStorage.setItem('L1ID', data.asterixUniqueID)
    //   setSelectedItem(data)

    //   setOpen(true);
    // } else {
    //   console.log('You can not make a call')
    // }

  }
  function selectedDataForInbound(data) {
    // console.log(localStorage.getItem('AgentType'))
    // if(localStorage.getItem('AgentType') === 'Outbound'){
    //   console.log('selected')
    // }else{
    //   console.log('You can not make a call')
    // }

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
    // const config = {
    //   method: 'get',
    //   url: `${APIENDPOINT}/ami/actions/addq?Interface=${agentId}&Queue=${queue}`,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    // axios(config)
    //   .then(() => { })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  function removeFromQueue(agentId, queue) {
    // // console.log('remove', agentId)
    // const config = {
    //   method: 'get',
    //   url: `${APIENDPOINT}/ami/actions/rmq?Queue=${queue}&Interface=${agentId}`,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    // axios(config)
    //   .then(() => {

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  function makeCall() {
    // setOpen(false);
    // var Number = selectedItem.callermobilenumber
    // // console.log('make call', Number)
    // Number = Number.substr(Number.length - 10);
    // if (Number.length === 10) {
    //   const axios = require('axios');

    //   // console.log('make call', SOCKETENDPOINT +'ami/actions/orginatecall?sipAgentID=local/5' +localStorage.getItem('AgentSIPID') +'@from-internal&NumbertobeCalled=5' + Number)
    //   const config = {
    //     method: 'get',
    //     // eslint-disable-next-line prefer-template
    //     url: `http://192.168.3.36:62002/ami/actions/orginatecall?sipAgentID=Local%2F5${localStorage.getItem('AgentSIPID')}%40from-internal&NumbertobeCalled=5${Number}`
    //     ,
    //     headers: {}
    //   };
    //   axios(config)
    //     .then(response => {
    //       // console.log(JSON.stringify(response.data));
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // } else {
    //   console.log('Invalide number');
    // }
  }

  function updateAgentCallStatus(updateData) {
    // console.log('updateData', updateData);
    // const data = {
    //   agentCallStatus: updateData.callStatus,
    //   agentCallEvent: updateData.callEvent,
    //   agentCallUniqueId: updateData.callUniqueId,
    //   agentCallType: updateData.callType,
    //   agentCallDispositionStatus: updateData.callDispositionStatus,
    //   callerNumber: updateData.callerNumber,
    //   breakStatus: updateData.breakStatus
    // };
    // const config = {
    //   method: 'put',
    //   url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data
    // };

    // axios(config)
    //   .then((response) => {
    //     console.log('update', JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  function getAgentCallStatus(agentSipID) {
    // console.log('calling the', agentSipID);

    var axios = require('axios');

    var config = {
      method: 'get',
      url: `http://192.168.3.36:5000/api/agents/${agentSipID}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
        setCurrentCallDetails(
          response.data.Event,
          localStorage.setItem('Interaction_id', response.data.InteractionID)
        )
        if (response.data.Paused === '1') {
          localStorage.setItem('Break_Status', 'IN')
        } else {
          localStorage.setItem('Break_Status', 'OUT')
        }
      })
      .catch(function (error) {
        console.log(error);
      });


    //       setCurrentCallDetails(
    //         // eslint-disable-next-line no-underscore-dangle
    //         response.data[0]._id,
    //         response.data[0].agentCallUniqueId,
    //         response.data[0].agentCallType,
    //         response.data[0].agentCallStatus,
    //         response.data[0].agentCallEvent,
    //         response.data[0].agentCallDispositionStatus,
    //         response.data[0].contactNumber,
    //         response.data[0].breakStatus
    //       );
    //       setAgentCurrentStatusAction({
    //         AgentType: agent.AgentType,
    //         role: user.userType,
    //         callUniqueId: response.data[0].agentCallUniqueId,
    //         distributer_id: '',
    //         // eslint-disable-next-line no-underscore-dangle
    //         callStatusId: response.data[0]._id,
    //         callDispositionStatus: response.data[0].agentCallDispositionStatus,
    //         callType: response.data[0].agentCallType,
    //         callEvent: response.data[0].agentCallEvent,
    //         callerNumber: response.data[0].contactNumber,
    //         callStatus: response.data[0].agentCallStatus,
    //         AgentSIPID: agent.AgentSipId,
    //         breakStatus: response.data[0].breakStatus
    //       });
    //       if (response.data[0].channel !== null || response.data[0].channel !== undefined) {
    //         // localStorage.setItem('channel', response.data[0].channel);
    //       }

    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  function breakService() {
    console.log("called from dispos")
    const AgentSIPID = localStorage.getItem('AgentSIPID')
    if (localStorage.getItem('Break_Status') === 'OUT') {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `http://192.168.3.36:52005/ami/actions/break?Queue=5001&Interface=SIP%2F${AgentSIPID}&Reason=BREAK_IN&Break=true`,
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
        url: `http://192.168.3.36:52005/ami/actions/break?Queue=5001&Interface=SIP%2F${AgentSIPID}&Reason=BREAK_OUT&Break=false`,
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
    // // getALF();
    // if (localStorage.getItem('Agenttype') === 'L1') {
    //   // getOpenTickets(localStorage.getItem('Agenttype'), 'open');
    // }
    // if (localStorage.getItem('Agenttype') === 'L2') {
    //   // getOpenTickets('L1', 'open');
    // }
    // if (localStorage.getItem('Agenttype') === 'L3') {
    //   // getOpenTickets('L2', 'open');
    // }

    async function getInitialData() {
      try {
        await getAgentCallStatus(localStorage.getItem('Agent_Object_ID'));
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setLoadingDetails(false);

    // socket.on('ringing1', data => {
    //   console.log(data, "socket data")
    //   const agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     console.log('ringing1', data);
    //     localStorage.setItem('channel', data.event.Channel)
    //   }
    // });

    // socket.on('ringing2', data => {
    //   const agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     console.log('ringing2', data)
    //     localStorage.setItem('callUniqueId', data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //   }
    // });
    // socket.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket.on('connected', data => {
    //   const agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '5000');
    //   }
    // });
    // socket.on('hangup', data => {
    //   const agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });
    // return () => {
    //   socket.off('ringing');
    //   socket.off('connected');
    //   socket.off('hangup');
    //   socket.off('transfercallnumber');
    // };


  }, []);


  useEffect(() => {
    const agentSipID = localStorage.getItem('Agent_Object_ID')
    const interval = setInterval(async () => {
      const GET_CURRENT_STATUS_BY_AGENT_SIP_ID = `http://192.168.3.36:5000/api/agents/${localStorage.getItem('Agent_Object_ID')}`;
      const getCurrentStatus = await axios.get(GET_CURRENT_STATUS_BY_AGENT_SIP_ID);
      //console.log('getCurrentStatus', getCurrentStatus)
      getAgentCallStatus(agentSipID)

      // if (localStorage.getItem('jwtToken')) {
      //   if (getCurrentStatus.data[0].jwtToken === localStorage.getItem('jwtToken')) {
      //     getAgentCallStatus(agentSipID)
      //   }
      //   else {
      //     localStorage.clear()
      //     // dispatch(setLoggedIn(false))
      //     window.location.reload()
      //   }
      // }

    }, 3000);





  }, [])



  useEffect(() => {
    getALF();
    // console.log('data second useEffect', currentCall);
    // console.log('currentCall.callerNumber', currentCall.callerNumber);


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

  // console.log(customerTable, "customertable details")

  // useEffect(() => {
  //   // console.log("currentCall", currentCall)
  //   if (reduxState.searchDistributor.length >= 4) {
  //     // get(reduxState.searchDistributor);
  //   } else {
  //     // get();
  //   }
  // }, [reduxState.searchDistributor]);


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
          Call in Progress
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'AgentComplete' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
          Call Disconnected
        </Typography>
                </div>) : null
              }
              {
                currentCall.callStatus === 'AgentDisposed' ? (<div>
                  <CallIcon />
            &nbsp;
                  <Typography display="inline">
                    {/* {localStorage.getItem('callerNumber')} */}
         Free for next call
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
                      {currentCall.callStatus === 'AgentDisposed' ?
                        <Switch
                          breakService={breakService}
                          callStatus={currentCall.callStatus}
                        /> : null}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>

                  <Grid item lg={12} md={12} xs={12}>

                    <Card>
                      <CardHeader title="Disposition Details" />
                      <Divider />
                      {currentCall.callStatus !== 'AgentDisposed' &&
                        user.userType === 'agent' && currentCall.callStatus !== 0 && currentCall.callStatus !== 'AgentRingNoAnswer' ? (<CardContent>
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


