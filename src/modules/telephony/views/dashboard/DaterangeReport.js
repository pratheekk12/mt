import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import moment from 'moment'

export default function MaterialUIPickers(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  const handleSubmit = (e) => {
    props.getALF(startDate)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item lg={12} sm={6}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          value={startDate}
          onChange={date => {
            setStartDate(date)
            let date1 = moment(date).format()
            date1 = date1.slice(0, 10)
            props.setdate(date1)
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
