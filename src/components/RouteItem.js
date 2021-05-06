import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  setNewCrumb,
  setUrlMatchFound,
  setActivatedRoute
} from 'src/redux/action';

/**
 * Render a route with potential sub routes
 */
function RouteWithSubRoutes(route) {
  useEffect(() => {
    if (route.activatedRoute === route.computedMatch.url) {
      if (route.computedMatch.path !== route.computedMatch.url) {
        route.setActivatedRoute(route.computedMatch.path);
      }
      route.setMatchFound();
    }
  }, [route.activatedRoute]);
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        <route.component
          {...props}
          routes={route.routes?.map(subRoute => ({
            ...subRoute,
            path: route.path + subRoute.path,
            crumb: (typeof route.crumb === 'string'
              ? [route.crumb]
              : route.crumb || []
            ).concat(subRoute.crumb || [''])
          }))}
        />
      )}
    />
  );
}
const mapStateToProps = state => ({
  activatedRoute: state.activatedRoute
});

const mapDispatchToProps = dispatch => ({
  setCrumb: route => dispatch(setNewCrumb(route)),
  setMatchFound: () => dispatch(setUrlMatchFound(true)),
  setActivatedRoute: route => dispatch(setActivatedRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteWithSubRoutes);
