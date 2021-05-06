import { useLoading, Grid } from '@agney/react-loading';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyle = makeStyles((dtheme) => ({
    root: {
      height: '100%',
      width: '100%',
      backgroundColor: dtheme.palette.primary.light,
      color: 'white'
    }
}));

export default function MainLoader() {
    const classes = useStyle();
    const { containerProps, indicatorEl } = useLoading({
      loading: true,
      indicator: <Grid width="50" height="50" />,
    });

    return (
      <Box
        {...containerProps}
        justifyContent="center"
        alignItems="center"
        display="flex"
        className={classes.root}
      >
        {indicatorEl}
      </Box>
    );
  }
