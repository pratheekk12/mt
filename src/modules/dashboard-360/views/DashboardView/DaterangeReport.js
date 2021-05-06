import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleSubmit = (e) => {
      console.log("startDate",startDate)
      console.log("endDate",endDate)
    // setStartDate(date);
    // setEndDate(date)
  };

  return (
      
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
         {/* <form onSubmit = {(e)=>handleSubmit(e)} > */}
      {/* <Grid container justify="space-around"> */}
      {/* <Grid container item xs={12} spacing={1}> */}
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          value={startDate}
          onChange={date => setStartDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End Date"
          value={endDate}
          onChange={date => setEndDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <Button onClick={handleSubmit}>Submit</Button>
       
       {/* </form> */}
    </MuiPickersUtilsProvider>
  );
}
