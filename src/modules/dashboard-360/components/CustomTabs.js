import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(() => ({
  textTransformNone: {
    textTransform: 'none',
    minWidth: 'fit-content'
  }
}));

export default function CustomTabs({
  tabNames,
  setCurrent,
  children,
  ...props
}) {
  const [value, setValue] = React.useState(0);

  const styles = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (setCurrent) {
      setCurrent(newValue);
    }
  };

  function getTabs() {
    return tabNames.map((tab, index) => (
      <Tab
        label={tab}
        key={`tab-${index}`}
        {...a11yProps(0)}
        className={`${styles.textTransformNone} `}
      />
    ));
  }

  return (
    <Paper square>
      <Tabs value={value} onChange={handleChange} {...props}>
        {getTabs()}
      </Tabs>
    </Paper>
  );
}

CustomTabs.propTypes = {
  tabNames: PropTypes.array,
  setCurrent: PropTypes.func,
  children: PropTypes.node
};
