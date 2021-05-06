import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';

export default function MaterialUIPickers(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleSubmit = (e) => {
    props.getALF(startDate, endDate)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item lg={3} sm={6}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          value={startDate}
          onChange={date => {
            props.handleChange()
            setStartDate(date)
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item lg={3} sm={6}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End Date"
          value={endDate}
          onChange={date => {
            props.handleChange()
            setEndDate(date)
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item lg={3} sm={6}>
        <br />
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Grid>
      <Grid item lg={3} sm={6}>
        <br />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
