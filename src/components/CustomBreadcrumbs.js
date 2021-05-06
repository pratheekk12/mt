import { Box, Breadcrumbs, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

function CustomBreadcrumbs({ activatedRoute, crumbs, urlMatchFound }) {
  const [breadCrumbLinks, setbreadCrumbLinks] = useState([]);
  useEffect(() => {
    if (urlMatchFound) {
      setbreadCrumbLinks(crumbs.get(activatedRoute));
    }
  }, [urlMatchFound, activatedRoute]);
  let newLink = '/';
  return (
    <Grid container>
      {breadCrumbLinks?.length ? (
        <Box style={{ margin: '1.5rem 2rem 0 1.5rem' }}>
          <Breadcrumbs>
            <Link to="/">
              <HomeIcon />
            </Link>
            {activatedRoute
              .split('/')
              .slice(1)
              .map((route, index) => {
                newLink += route + '/';
                return breadCrumbLinks[index] ? (
                  <Link
                    to={
                      index === breadCrumbLinks.length - 1
                        ? '/' +
                          window.location.href
                            .split('/')
                            .splice(3)
                            .join('/')
                        : newLink
                    }
                    key={newLink}
                  >
                    {breadCrumbLinks[index]}
                  </Link>
                ) : (
                  ''
                );
              })}
          </Breadcrumbs>
        </Box>
      ) : (
        ''
      )}
    </Grid>
  );
}

const mapSTP = state => ({
  activatedRoute: state.activatedRoute,
  crumbs: state.crumbs,
  urlMatchFound: state.urlMatchFound
});

export default connect(mapSTP)(CustomBreadcrumbs);
