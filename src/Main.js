import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainLoader from './components/MainLoader';
import RouteSwitch from './components/RouteSwitch';
import TopBar from './components/TopBar';
import NavBar from './modules/dashboard-360/layouts/DashboardLayout/NavBar';
import { setAccountType, setLoggedIn, setUserDetails } from './redux/action';
import { ADMIN, USER } from './redux/constants';
import routes from './routes';


function Main({
  isLoggedIn,
  classes,
  setUserDetailsMain,
  setAccountTypeMain,
  setLoggedInMain
}) {
  const [loading, setLoading] = useState(true);
  const [filteredRoutes, setfilteredRoutes] = useState(
    routes.filter(route => route.requiresAuth === false)
  );

  const [localLoggedInState, setLocalLoggedIn] = useState(false);
  const [routeAccess, setRouteAccess] = useState(false);
  useEffect(() => {
    (async function checkLoggedInState() {
      try {
        if (localStorage.getItem('jwtToken')) {
          setLoggedInMain(true);
         var test = await Axios.post('http://164.52.205.10:4000/auth/apiM/verifyClient',{},{ headers: { Authorization:`Bearer ${localStorage.getItem('jwtToken')}` } })
          .then(response=> {
            console.log('respose', response) 
            var result= response.data.userDetails
            var obj = {
              UserID:result.UserID,
              AllowPublic: result.AllowPublic,
              UserName:result.UserName,
              EmployeeName: result.EmployeeName,
              EmailID: result.EmailID,
              OTP: result.OTP,
              tenetID: result.tenetID,
              tenentId:result.tenentId,
              tenentName: result.tenentName,
              roleids: result.roleids,
              role: result.role,
              modules: result.modules,
              External_num:result.External_num
            }
             setUserDetailsMain(obj)
             localStorage.setItem('AgentSIPID', obj.External_num);
             setAccountTypeMain(obj.role === 'Agent'||obj.role === 'Admin' ||obj.role === 'Group admin'? ADMIN : USER);
          // setAccountTypeMain(obj.role === 'Agent' ? ADMIN : USER);
          if(obj.role === 'Agent'){
            setRouteAccess(true)
          }
          })
          .catch(error => console.log(error));
        } else {
          setLoggedInMain(false);
        }
      } catch (error) {
        setLoggedInMain(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setfilteredRoutes(
      routes.filter(route => route.requiresAuth === isLoggedIn)
    );
    setLocalLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  return loading ? (
    <MainLoader />
  ) : localLoggedInState ? (
    <>
      <TopBar />
      <NavBar openMobile={false} onMobileClose={() => null} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <RouteSwitch
              routes={filteredRoutes}
              isRoot
              redirectPath="/dash360"
            />
             {/* <RouteSwitch
              routes={filteredRoutes}
              isRoot
              redirectPath="/telephony"
            /> */}

          </div>
        </div>
      </div>
    </>
  ) : (
        <RouteSwitch routes={filteredRoutes} isRoot redirectPath="/auth/login" />
      );
}

const mapStateToProps = state => ({
  isLoggedIn: state.logInState
});
const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
