import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// import OneDirectApi from '../OneDirectApi';
import FileHistoryTable from './filehistorytable';
import FileUpload from './FileUpload'
import { DataGrid } from '@material-ui/data-grid';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import axios from 'axios'
import moment from 'moment';
import Date from './daterange1'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    margin: '1rem 2rem'
  }
}));


const Inbound = () => {
  const classes = useStyles();
  const [uploadFileStatus, setUploadFileStatus] = useState(null);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [profiles, setProfiles] = useState([])
  const [startDate, setStartDate] = useState("")
  const [enddate, setEnddate] = useState("")
  const [option, setOption] = useState("ALL")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProfiles = async () => {
    var dateFormat = 'DD-MM-YYYY';
    // let startDate = localStorage.getItem('startDate')
    // var testDateUtc1 = moment.utc(startDate);
    // var localDate1 = testDateUtc1.local()
    // startDate = localDate1.format(dateFormat);

    let startDate = moment(localStorage.getItem('startDate')).format().slice(0, 10);
    let EndDate = moment(localStorage.getItem('EndDate')).format().slice(0, 10);
    let option1 = localStorage.getItem('option')

    const data = {
      "startdate": startDate,
      "enddate": EndDate,
      "status": option1
    }

    console.log(data)

    console.log(startDate, EndDate)

    try {
      await axios.post(`http://192.168.3.36:62010/channel/getFilterExcel`, data)
        .then((response) => {
          console.log(response)

          if (response.data.Record.length > 0) {
            console.log(response.data.Record)
            response.data.Record.map((ele) => {
              var dateFormat = 'DD-MM-YYYY HH:mm:ss';
              var testDateUtc = moment.utc(ele.createdAt);
              var localDate = testDateUtc.local();
              ele.createdAt = localDate.format(dateFormat);
            })
            response.data.Record.map((ele) => {
              var dateFormat = 'DD-MM-YYYY HH:mm:ss';
              var testDateUtc = moment.utc(ele.updatedAt);
              var localDate = testDateUtc.local();
              ele.updatedAt = localDate.format(dateFormat);
            })
            setProfiles(response.data.Record)
          }

        })

    } catch (err) {
      console.log(err)
    }

  }



  const handleChangeIndex = index => {
    setValue(index);
  };

  const profilesColumns = [
    {
      headerName: 'Ref.Id',
      field: 'refId',
      flex: 0.5

    },
    {
      headerName: 'Bank Name',
      field: 'bankname',
      flex: 0.5
    },
    {
      headerName: 'Client',
      field: 'client',
      flex: 0.5
    },
    {
      headerName: 'Stage',
      field: 'stage',
      flex: 0.5
    },
    {
      headerName: 'Reason',
      field: 'reason',
      flex: 0.5
    },
    {
      headerName: 'City',
      field: 'city',
      flex: 0.5
    },
    {
      headerName: 'Loan Amount',
      field: 'loanamount',
      flex: 0.5
    },
    {
      headerName: 'cfCl',
      field: 'cfCl',
      flex: 0.2
    },
    {
      headerName: 'Id',
      field: 'id',
      flex: 0.5
    },
    {
      headerName: 'Phone Number',
      field: 'phone',
      flex: 0.5
    },
    {
      headerName: 'Status',
      field: '',

      renderCell: rowData => (
        <>
          {
            rowData.row.status === '1' && (<div>
              <Tooltip title="Not Dialed">
                <IconButton

                ><Typography>Not Dialed</Typography>
                </IconButton>
              </Tooltip>
            </div>)
          }
          {
            rowData.row.status === '0' && (<div>
              <Tooltip title="Dialed">
                <IconButton

                ><Typography>Dialed</Typography>
                </IconButton>
              </Tooltip>
            </div>)
          }
        </>
      ),
      flex: 0.5
    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      flex: 1
    },
    {
      headerName: 'Updated At',
      field: 'updatedAt',
      flex: 1
    },
    {
      headerName: 'Link',
      field: 'link',
      flex: 1
    }

  ];

  const handleStatus = (e) => {
    setOption(e.target.value)

  }
  // getProfiles()

  const showProfile = (data) => {
    // console.log(data)
  }

  const handlefetch = (e) => {
    localStorage.setItem('option', option)
  }

  useEffect(() => {
    localStorage.setItem('callStatus', 'AgentDisposed')
    getProfiles()

    const interval = setInterval(async () => {
      getProfiles()

    }, 5000);



  }, [])

  // var dateFormat = 'DD-MM-YYYY HH:mm:ss';
  // var testDateUtc = moment.utc('2021-05-18T10:04:54.792Z');
  // var localDate = testDateUtc.local();
  // console.log(localDate.format(dateFormat));
  // console.log(moment("2021 - 05 - 18T10: 04: 54.792Z"))

  // console.log(profiles)
  return (
    <>
      <Paper className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            style={{ backgroundColor: 'white' }}
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            centered
          >
            <Tab label="Upload" {...a11yProps(0)} />
            <Tab label="OneDirect" {...a11yProps(1)} />
            {/* <Tab label="Inresto" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          style={{ backgroundColor: '#f4f6f8' }}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        // style={{ display: 'flex', justifyContent: 'center' }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <FileUpload status={setUploadFileStatus} />
            {/* <FileHistoryTable status={uploadFileStatus} /> */}
          </TabPanel>
          {/* <TabPanel value={value} index={1} dir={theme.direction}>
          <OneDirectApi />
        </TabPanel> */}
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
          API Call
        </TabPanel> */}
        </SwipeableViews>
      </Paper>

      <Grid>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={2} md={6} xs={12}>
                <Date value="Start Date" />
              </Grid>
              <Grid item lg={2} md={6} xs={12}>
                <Date value="End Date" />
              </Grid>
              <Grid item lg={2} md={6} xs={12}>
                <FormControl variant="outlined" className={classes.formControl} required="true" fullWidth={true}  >
                  <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={option}
                    onChange={handleStatus}
                    label="Status"
                  // required="true"
                  >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="0">Dialed</MenuItem>
                    <MenuItem value="1">Not Dialed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={2} md={6} xs={12}>
                <Button variant="outlined" color="primary" onClick={handlefetch}>Fetch Data</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {
        profiles.length > 0 ? (

          <Grid>
            <Card>
              <CardContent>
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid rows={profiles} columns={profilesColumns} pageSize={20}
                    // rowsPerPageOptions={[10, 20, 50]}
                    onRowClick={showProfile}
                    pagination />
                </div>

              </CardContent>
            </Card>

          </Grid>
        ) : (null)}
    </>
  );
};

export default Inbound;
