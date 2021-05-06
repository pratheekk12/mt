import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setNewCrumb } from 'src/redux/action';
import { connect } from 'react-redux';
import RouteWithSubRoutes from './RouteItem';

function RouteSwitch({ routes, redirectPath, isRoot, setCrumb }) {
  const location = useLocation();

  useEffect(() => {
    routes.map(route => setCrumb({ key: route.path, value: route.crumb }));
  }, []);

  return (
    <Switch>
      {isRoot && (
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
      )}
      {routes.map(route => {
        return <RouteWithSubRoutes {...route} key={route} />;
      })}
      {redirectPath && (
        <Route path="*">
          <Redirect to={redirectPath} />
        </Route>
      )}
    </Switch>
  );
}

RouteSwitch.propTypes = {
  routes: PropTypes.any,
  redirectPath: PropTypes.string,
  isRoot: PropTypes.bool,
  setCrumb: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setCrumb: route => dispatch(setNewCrumb(route))
});

export default connect(null, mapDispatchToProps)(RouteSwitch);
