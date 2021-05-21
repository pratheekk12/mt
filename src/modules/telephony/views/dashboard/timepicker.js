import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
    const { label, handleTime } = props
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState();

    const handleDateChange = (date) => {
        // console.log(date, label)
        setSelectedDate(date)
        handleTime(date, label)
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}