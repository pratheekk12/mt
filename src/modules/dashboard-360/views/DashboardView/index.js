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

const SOCKETENDPOINT = 'http://164.52.205.10:42002';
const APIENDPOINT = 'http://164.52.205.10:42002';
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
    callUniqueId: '',
    callType: '',
    callStatus: '',
    callDetails: '',
    callDispositionStatus: '',
    callerNumber: '',
    breakStatus: ''
  });
  const [user, setUserDetails] = useState({
    userType: 'Agent'
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentType: localStorage.getItem('AgentType'),
    AgentSipId: localStorage.getItem('AgentSIPID')
  });
  const [ALF, setALF] = useState([]);
  const [DLF, setDLF] = useState([]);
  const [disForm, setdisForm] = useState({});

  function getDLF() {
    const config = {
      method: 'get',
      url:
        GET_INTERACTION_BY_DISTRIBUTOR_ID + localStorage.getItem('callerNumber'),
      headers: {},
    };

    axios(config)
      .then(async response => {
        let DLFDATA = response.data;
        DLFDATA = DLFDATA.reverse();
        // console.log('DLF', DLFDATA)
        setDLF(DLFDATA);
      })

      .catch(error => {
        console.log(error);
      });
  }

  function getALF() {
    console.log('getALF')
    setTimeout(function () {
      const config = {
        method: 'get',
        url: GET_INTERACTION_BY_AGENT_SIP_ID + agent.AgentSipId,
        headers: {}
      };

      axios(config)
        .then(async response => {
          console.log('ALFDATA', response)
          let ALFDATA = response.data;
          ALFDATA = ALFDATA.reverse();
          setALF(ALFDATA);
        })
        .catch(error => {
          console.log(error);
        });

    }, 3000);

  }

  function getOpenTickets(agentType, status) {
    const config = {
      method: 'get',
      url: 'http://164.52.205.10:42004/crm/interactions/getByAgentStatus?type=' + agentType + '&status=' + status,
      headers: {}
    };

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const ALFDATA = response.data;
        setALF(ALFDATA);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  function selectedDataForObutbound(data) {
    setSelectedData1(data)
    // console.log(localStorage.getItem('AgentType'))
    if (localStorage.getItem('AgentType') === 'Outbound' && localStorage.getItem('callDispositionStatus') === 'Disposed') {
      // console.log('selected', data)
      localStorage.setItem('L1ID', data.asterixUniqueID)
      setSelectedItem(data)

      setOpen(true);
    } else {
      console.log('You can not make a call')
    }

  }
  function selectedDataForInbound(data) {
    console.log(localStorage.getItem('AgentType'))
    // if(localStorage.getItem('AgentType') === 'Outbound'){
    //   console.log('selected')
    // }else{
    //   console.log('You can not make a call')
    // }

  }

  function setCurrentCallDetails(
    callStatusId,
    callUniqueId,
    callType,
    callStatus,
    callEvent,
    callDispositionStatus,
    callerNumber,
    breakStatus
  ) {
    setCurrentCall({
      callStatusId,
      callUniqueId,
      callType,
      callStatus,
      callEvent,
      callDispositionStatus,
      callerNumber,
      breakStatus
    });
    localStorage.setItem('callStatusId', callStatusId);
    localStorage.setItem('callUniqueId', callUniqueId);
    localStorage.setItem('callType', callType);
    localStorage.setItem('callStatus', callStatus);
    localStorage.setItem('callEvent', callEvent);
    localStorage.setItem('callDispositionStatus', callDispositionStatus);
    localStorage.setItem('callerNumber', callerNumber);
    localStorage.setItem('breakStatus', breakStatus);
  }

  function addToQueue(agentId, queue) {
    const config = {
      method: 'get',
      url: `${APIENDPOINT}/ami/actions/addq?Interface=${agentId}&Queue=${queue}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  }
  function removeFromQueue(agentId, queue) {
    // console.log('remove', agentId)
    const config = {
      method: 'get',
      url: `${APIENDPOINT}/ami/actions/rmq?Queue=${queue}&Interface=${agentId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(() => {

      })
      .catch((error) => {
        console.log(error);
      });
  }
  function makeCall() {
    setOpen(false);
    var Number = selectedItem.callermobilenumber
    // console.log('make call', Number)
    Number = Number.substr(Number.length - 10);
    if (Number.length === 10) {
      const axios = require('axios');

      // console.log('make call', SOCKETENDPOINT +'ami/actions/orginatecall?sipAgentID=local/5' +localStorage.getItem('AgentSIPID') +'@from-internal&NumbertobeCalled=5' + Number)
      const config = {
        method: 'get',
        // eslint-disable-next-line prefer-template
        url: `http://164.52.205.10:42002/ami/actions/orginatecall?sipAgentID=Local%2F5${localStorage.getItem('AgentSIPID')}%40from-internal&NumbertobeCalled=5${Number}`
        ,
        headers: {}
      };
      axios(config)
        .then(response => {
          // console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('Invalide number');
    }
  }

  function updateAgentCallStatus(updateData) {
    // console.log('updateData', updateData);
    const data = {
      agentCallStatus: updateData.callStatus,
      agentCallEvent: updateData.callEvent,
      agentCallUniqueId: updateData.callUniqueId,
      agentCallType: updateData.callType,
      agentCallDispositionStatus: updateData.callDispositionStatus,
      callerNumber: updateData.callerNumber,
      breakStatus: updateData.breakStatus
    };
    const config = {
      method: 'put',
      url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        // console.log('update', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAgentCallStatus(agentSipID) {
    // console.log('calling the', agentSipID);
    const config = {
      method: 'get',
      url: GET_CURRENT_STATUS_BY_AGENT_SIP_ID + agentSipID,
      headers: {}
    };

    axios(config)
      .then((response) => {

        if (response.data) {
          // console.log('getAgentCallStatus....................', response.data);

          setCurrentCallDetails(
            // eslint-disable-next-line no-underscore-dangle
            response.data[0]._id,
            response.data[0].agentCallUniqueId,
            response.data[0].agentCallType,
            response.data[0].agentCallStatus,
            response.data[0].agentCallEvent,
            response.data[0].agentCallDispositionStatus,
            response.data[0].contactNumber,
            response.data[0].breakStatus
          );
          setAgentCurrentStatusAction({
            AgentType: agent.AgentType,
            role: user.userType,
            callUniqueId: response.data[0].agentCallUniqueId,
            distributer_id: '',
            // eslint-disable-next-line no-underscore-dangle
            callStatusId: response.data[0]._id,
            callDispositionStatus: response.data[0].agentCallDispositionStatus,
            callType: response.data[0].agentCallType,
            callEvent: response.data[0].agentCallEvent,
            callerNumber: response.data[0].contactNumber,
            callStatus: response.data[0].agentCallStatus,
            AgentSIPID: agent.AgentSipId,
            breakStatus: response.data[0].breakStatus
          });
          if (response.data[0].channel !== null || response.data[0].channel !== undefined) {
            // localStorage.setItem('channel', response.data[0].channel);
          }

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function breakService() {
    const BreakStatus = localStorage.getItem('breakStatus');
    if (BreakStatus === 'NA') {
      localStorage.setItem('breakStatus', 'IN');

      if (localStorage.getItem('Agenttype') === 'L1') {
        addToQueue(`local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 5000);
      }
      if (localStorage.getItem('Agenttype') === 'L2') {
        addToQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 5001);
      }

    }
    if (BreakStatus === 'IN') {
      // console.log('Inside the IN');
      localStorage.setItem('breakStatus', 'OUT');

      if (localStorage.getItem('Agenttype') === 'L1') {
        removeFromQueue(`local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 5000);
        addToQueue(`local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 5000);
      }
      if (localStorage.getItem('Agenttype') === 'L2') {
        removeFromQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 5001);
        addToQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 5001);
      }

    }
    if (BreakStatus === 'OUT') {
      // console.log('Inside the OUT');
      localStorage.setItem('breakStatus', 'IN');

      if (localStorage.getItem('Agenttype') === 'L1') {
        removeFromQueue(`local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 5000);
      }
      if (localStorage.getItem('Agenttype') === 'L2') {
        removeFromQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 5001);
      }

    }

    updateAgentCallStatus({
      callStatusId: localStorage.getItem('callStatusId'),
      callUniqueId: localStorage.getItem('callUniqueId'),
      callType: localStorage.getItem('callType'),
      callStatus: localStorage.getItem('callStatus'),
      callEvent: localStorage.getItem('callEvent'),
      callDispositionStatus: localStorage.getItem('callDispositionStatus'),
      callerNumber: localStorage.getItem('callerNumber'),
      breakStatus: localStorage.getItem('breakStatus')
    });

    setCurrentCallDetails(
      localStorage.getItem('callStatusId'),
      localStorage.getItem('callUniqueId'),
      localStorage.getItem('callType'),
      localStorage.getItem('callStatus'),
      localStorage.getItem('callEvent'),
      localStorage.getItem('callDispositionStatus'),
      localStorage.getItem('callerNumber'),
      localStorage.getItem('breakStatus')
    );

    const data = JSON.stringify({
      agentID: agent.AgentId,
      agentSIPID: agent.AgentSipId,
      breakStatus: localStorage.getItem('breakStatus')
    });

    const config = {
      method: 'post',
      url: PUT_BREAK_AGENT,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // getALF();
    if (localStorage.getItem('Agenttype') === 'L1') {
      // getOpenTickets(localStorage.getItem('Agenttype'), 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      // getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L3') {
      // getOpenTickets('L2', 'open');
    }

    async function getInitialData() {
      try {
        await getAgentCallStatus(agent.AgentSipId);
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setLoadingDetails(false);

    socket.on('ringing1', data => {
      const agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {
        console.log('ringing1', data);
        localStorage.setItem('channel', data.event.Channel)
      }
    });

    socket.on('ringing2', data => {
      const agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {
        console.log('ringing2', data)
        localStorage.setItem('callUniqueId', data.event.Uniqueid)
        localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
      }
    });
    socket.on('transfercallnumber', data => {
      if (localStorage.getItem('Agenttype') === 'L2') {
        localStorage.setItem('callerNumber', data.contactnumber)
      }

    })
    socket.on('connected', data => {
      const agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {
        localStorage.setItem('distributer_id', agent.AgentSipId);
        setCurrentCallDetails(
          localStorage.getItem('callStatusId'),
          localStorage.getItem('callUniqueId'),
          agent.AgentType,
          'connected',
          'Bridge',
          'NotDisposed',
          localStorage.getItem('callerNumber'),
          localStorage.getItem('breakStatus')
        );
        // removeFromQueue(agent.AgentSipId, '5000');
      }
    });
    socket.on('hangup', data => {
      const agentExtension = data.agentNumber;
      if (agentExtension === agent.AgentSipId) {
        setCurrentCallDetails(
          localStorage.getItem('callStatusId'),
          localStorage.getItem('callUniqueId'),
          localStorage.getItem('callType'),
          'disconnected',
          'Hangup',
          localStorage.getItem('callDispositionStatus'),
          localStorage.getItem('callerNumber'),
          localStorage.getItem('breakStatus')
        );
      }
    });
    return () => {
      socket.off('ringing');
      socket.off('connected');
      socket.off('hangup');
      socket.off('transfercallnumber');
    };
  }, []);

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

  console.log(customerTable, "customertable details")

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
      {currentCall.callStatus === 'connected' ? (
        <div>

          <Box
            alignItems="center"
            display="flex"
            className={`${classes.timerComp} ${classes.callWrapper} ${classes.callInbound}`}
          >
            <CallIcon />
            &nbsp;
            <Typography display="inline">
              {localStorage.getItem('callerNumber')}
               Call In Progress
            </Typography>
          </Box>
          {' '}
        </div>
      ) : null}
      {currentCall.callDispositionStatus === 'NotDisposed' &&
        currentCall.callStatus === 'disconnected' ? (
          <div>

            <Box
              alignItems="center"
              display="flex"
              className={`${classes.timerComp} ${classes.callWrapper} ${classes.callOutbound}`}
            >
              <CallIcon />
            &nbsp;
            <Typography display="inline">
                {localStorage.getItem('callerNumber')}
                 Call Is Disconnected
            </Typography>
            </Box>
            {' '}
          </div>
        ) : null}
      <CustomBreadcrumbs />
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>

              <Grid item>
                {currentCall.callDispositionStatus === 'Disposed' && currentCall.callStatus != 'connected' ?
                  <Switch
                    breakService={breakService}
                    removeFromQueue={removeFromQueue}
                    addToQueue={addToQueue}

                  /> : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>

            <Grid item lg={12} md={12} xs={12}>

              <Card>
                <CardHeader title="Disposition Details" />
                <Divider />
                {currentCall.callDispositionStatus === 'NotDisposed' &&
                  user.userType === 'Agent' ? (<CardContent>
                    <DispositionForm
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
                    />
                  </CardContent>
                  ) : (<></>)}
              </Card>
            </Grid>
            {/* <Grid item lg={12} md={12} xs={12}>
              <Card >

                <CardContent>
                  <TextField id="outlined-basic" label="search" variant="outlined" value={searchItem} onChange={handleSearch} size ="small"/>&nbsp;
              <Button variant="contained" color="primary" onClick={searchaction}><SearchIcon /></Button>
                </CardContent>
              </Card>
            </Grid> */}

            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardHeader title={'Caller Interactions'} />
                <CardContent>
                  <TextField id="outlined-basic" label="search" variant="outlined" value={searchItem} onChange={handleSearch} size="small" />&nbsp;
              <Button variant="contained" color="primary" onClick={searchaction}><SearchIcon /></Button>
                  {customerTable.length ? (
                    <div>
                      <BasicTable
                        columns={CallerInteractioncolumns}
                        records={customerTable.slice(0, 3)}
                        redirectLink={"/dash360/admin/callerInteraction/" + searchItem}
                        redirectLabel="View All"
                        ALF={customerTable}
                        selectedData={selectedDataForInbound}
                      />
                    </div>
                  ) : (
                      <>
                        {/* <CommonAlert text="N/A" /> */}
                      </>
                    )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardHeader title={'Agent Open Ticket'} />
                {ALF.length ? (
                  <div>
                    <BasicTable
                      columns={lastFiveCallData}
                      records={ALF.filter((e) => e.type === 'open').slice(0, 3)}
                      redirectLink="/dash360/admin/agentopentickets"
                      redirectLabel="View All"
                      ALF={ALF.filter((e) => e.type === 'open')}
                      selectedData={selectedDataForObutbound}
                    />
                  </div>
                ) : (
                    <CommonAlert text="N/A" />
                  )}
              </Card>


            </Grid>


            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardHeader title={'Agent Interactions'} />
                {ALF.length ? (
                  <div>
                    <BasicTable
                      columns={lastFiveCallData}
                      records={ALF.slice(0, 3)}
                      redirectLink="/dash360/admin/agentlastfive"
                      redirectLabel="View All"
                      ALF={ALF}
                      selectedData={selectedDataForInbound}
                    />
                  </div>
                ) : (
                    <CommonAlert text="N/A" />
                  )}
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
