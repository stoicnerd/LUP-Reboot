import React, { useState } from "react";
import MomentUtils from "@date-io/moment"; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

function BookingPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  var maxD = new Date();
  maxD.setMonth(maxD.getMonth() + 3);
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <h2>Date</h2>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        disablePast={true}
        maxDate={maxD}
      />
      <h2>Start Time</h2>
      <TimePicker value={selectedDate} onChange={handleDateChange} />
      <h2>End Time</h2>
      <TimePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

export default BookingPicker;
