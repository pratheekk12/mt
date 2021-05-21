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
  IconButton
} from '@material-ui/core';
import axios from 'axios'


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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProfiles = () => {
    axios.get(`http://192.168.3.36:62007/channel/getfile`)
      .then((response) => {
        // console.log(response.data.updateRecord)
        if (response.data.updateRecord.length > 0) {
          setProfiles(response.data.updateRecord)
        }

      })
      .catch((err) => {
        console.log(err)
      })
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
      flex: 0.5
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
      headerName: 'Link',
      field: 'link',
      flex: 1
    }

  ];

  const showProfile = (data) => {
    // console.log(data)
  }

  useEffect(() => {
    localStorage.setItem('callStatus', 'AgentDisposed')
    getProfiles()

    const interval = setInterval(async () => {
      getProfiles()

    }, 5000);



  }, [])

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

      {
        profiles.length > 1 ? (

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
