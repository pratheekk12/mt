import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import {
  setLoggedIn,
  setUserDetails,
  setAccountType
} from '../../../redux/action';
import Axios from 'axios';
import { ADMIN, USER } from 'src/redux/constants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Logo from '../../dashboard-360/components/loginlogo'
import axios from 'axios';
import data from 'src/modules/dashboard-360/views/customer/CustomerListView/data';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.grssl.com/">
        Grassroots
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/static/images/merittrack.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageWrapper: {
    background:
      'linear-gradient(45eg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15))',
    height: '100%',
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));


var APIENDPOINT = 'http://192.168.3.36:62002';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addToQueue(agentId, queue) {
  console.log(agentId, "agentid")
  var axios = require('axios');
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueAdd'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/addq?Interface=' + agentId + '&Queue=' +
      queue +
      '',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) { console.log(response) })
    .catch(function (error) {
      console.log(error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function removeFromQueue(agentId, queue) {
  var axios = require('axios');
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueRemove'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/rmq?Queue=' +
      queue +
      '&Interface=' + agentId + '',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) {

    })
    .catch(function (error) {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



function Login({ setLoggedInMain, setAccountTypeMain, setUserDetailsMain }) {
  const classes = useStyles();

  const dispatch = useDispatch()
  const [error, setError] = useState('');
  const [visibility, setVisibility] = useState(false)
  const [data1, setData1] = useState({})
  const [otp, setOtp] = useState("")


  const setotphandle = (e) => setOtp(e.target.value)
  async function authenticate(values) {
    setError('');
    try {
      // console.log(values)
      const url = 'http://192.168.3.36:5555/api/sendOtp'
      // // const url='http://192.168.3.45:42009/user/login'
      // console.log("values", values)
      const data = {}
      data.username = values.email
      data.password = values.password

      setData1(data)

      const res = await Axios.post(url, data);
      var myObj = res.data;
      console.log(myObj)

      if ('statusCode' in myObj) {
        setLoggedInMain(false);
        setError(true);
      } if ('status' in myObj) {
        setVisibility(true)

        // console.log("login api", res.data)

        // const obj = res.data;
        // dispatch(setUserDetails(res.data))
        // // console.log(obj)
        // const accessToken = res.data.data;

        // // console.log('data', res.data)
        // localStorage.setItem("jwtToken", accessToken);
        // localStorage.setItem('AgentSIPID', res.data.userData.id);
        // localStorage.setItem('role', myObj.user.role);
        // // localStorage.setItem('Agenttype', res.data.userDetails.AgentType);
        // localStorage.setItem('Agent_Object_ID', res.data.userData._id)
        // localStorage.setItem('AgentType', 'Inbound');

        // setUserDetailsMain(obj);
        // setAccountTypeMain(obj.user.role === 'agent' ? ADMIN : USER);

        // var axios = require('axios');
        // var data1 = '';

        // var config = {
        //   method: 'get',
        //   url: `http://192.168.3.36:62002/ami/actions/addq?Queue=5003&Interface=${res.data.userData.StateInterface}`,
        //   headers: {},
        //   data: data1
        // };

        // axios(config)
        //   .then(function (response) {
        //     console.log(response.data, "queue addedd");
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });


        // const AgentSIPID = res.data.userData.id
        // var axios = require('axios');
        // var config = {
        //   method: 'get',
        //   url: `http://192.168.3.36:62002/ami/actions/break?Queue=5003&Interface=SIP%2F${AgentSIPID}&Reason=BREAK_OUT&Break=false`,
        //   headers: {}
        // };

        // axios(config)
        //   .then(function (response) {
        //     console.log((response.data));

        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });


        // setLoggedInMain(true);
        // setError(false);

      } else {
        setLoggedInMain(false);
        console.log("i am in catch 1")
        setError(true);
      }

    } catch (err) {
      setLoggedInMain(false);
      console.log("here i am catch2")
      setError(true);
    }
  }
  const handlelogin = (e) => {

    const data2 = data1
    data2.OTP = otp
    console.log(data2)

    axios.post(`http://192.168.3.36:5555/api/login`, data2)
      .then((res) => {
        console.log(res)
        var myObj = res.data;
        console.log(myObj)
        if ('statusCode' in myObj) {
          setLoggedInMain(false);
          setError(true);
        } if ('status' in myObj) {
          setVisibility(true)

          console.log("login api", res.data)

          const obj = res.data;
          dispatch(setUserDetails(res.data))
          // console.log(obj)
          const accessToken = res.data.data;

          // console.log('data', res.data)
          localStorage.setItem("jwtToken", accessToken);
          // localStorage.setItem('AgentSIPID', res.data.userData.id);
          localStorage.setItem('role', myObj.user.role);
          // localStorage.setItem('Agenttype', res.data.userDetails.AgentType);
          if (myObj.user.role === 'agent') {
            localStorage.setItem('AgentSIPID', res.data.userData.id);
            localStorage.setItem('Agent_Object_ID', res.data.userData._id)
          }

          localStorage.setItem('AgentType', 'Inbound');

          setUserDetailsMain(obj);
          setAccountTypeMain(obj.user.role === 'agent' ? ADMIN : USER);


          // console.log(" i am inside")
          console.log("login api", res.data)
          var axios = require('axios');
          var data1 = '';

          var config = {
            method: 'get',
            url: `http://192.168.3.36:52005/ami/actions/addq?Queue=5001&Interface=${res.data.userData.Location}`,
            headers: {},
            data: data1
          };


          axios(config)
            .then(function (response) {
              console.log(response.data, "queue addedd");
            })
            .catch(function (error) {
              console.log(error, "error in adding queue");
            });

          var axios = require('axios');
          var data = JSON.stringify({ "Event": "LoggedIn" });

          var config = {
            method: 'put',
            url: `http://192.168.3.36:5000/api/agents/${res.data.userData._id}`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data), "status changed");
            })
            .catch(function (error) {
              console.log(error);
            });

          const AgentSIPID = res.data.userData.id
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


          setLoggedInMain(true);
          setError(false);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
        <div className={classes.imageWrapper} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        style={{ display: 'flex' }}
      >
        <div className={`${classes.paper}`}>
          <div>
            <div className={classes.avatarWrapper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(256)
                  .required('Email is required'),
                password: Yup.string()
                  .max(10)
                  .required('Password is required')
              })}
              onSubmit={values => {
                console.log('values', values);
                localStorage.setItem('AgentType', values.AgentType);
                localStorage.setItem('role', values.role);
                localStorage.setItem('AgentSIPID', values.AgentSIPID);

                // navigate('/app/dashboard', { replace: true });
                authenticate(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  { visibility ? (<div><TextField
                    fullWidth
                    label="otp"
                    margin="normal"
                    name="password"
                    value={otp}
                    onChange={setotphandle}
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    type="text"
                    variant="outlined"
                  />

                  </div>) : (null)
                  }

                  {!!error && (
                    <Box my={1}>
                      <Typography color="secondary">
                        Invalid Username/Password
                      </Typography>
                    </Box>
                  )}

                  {
                    visibility === false ? (<Box my={2} mt={5}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >Request OTP
                      </Button>
                    </Box>) : (null)
                  }

                </form>
              )}
            </Formik>
            <Box mt={5}>
              {
                visibility ? (<Button
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={handlelogin}
                >Sign In Now
                </Button>) : (null)
              }

              <Typography align="center">
                Tap Start
              </Typography>

            </Box>

            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});

export default connect(null, mapDispatchToProps)(Login);
