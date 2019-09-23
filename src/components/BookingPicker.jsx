import React, { Component } from "react";
import MomentUtils from "@date-io/moment"; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Button from "react-bootstrap/Button";
import { sendBookingRequest } from "../utils/bookingRequester";

class BookingPicker extends Component {
  constructor(props) {
    super(props);
    this.setState({
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      status: null
    });
  }
  componentDidMount() {
    console.log("BookingPicker Rendered");
  }

  render() {
    let renderStatus = () => {};
    let checkValidBooking = () => {
      let bookingData = {
        date: this.state && this.state.date,
        start: this.state && this.state.startTime,
        end: this.state && this.state.endTime
      };
      sendBookingRequest(bookingData, (err, length) => {
        if (err) {
          console.log("Got an error bitch!");
          return;
        }
        console.log("This is the bloody length - ", length);
        return;
      });
    };
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <h2>Date</h2>
        <DatePicker
          value={this.state && this.state.date ? this.state.date : null}
          onChange={date => {}}
          onAccept={date => {
            this.setState({ date: date });
          }}
          disablePast={true}
        />
        <h2>Start Time</h2>
        <TimePicker
          value={
            this.state && this.state.startTime ? this.state.startTime : null
          }
          onChange={date => {}}
          onAccept={date => {
            this.setState({ startTime: date });
          }}
          minutesStep={5}
        />
        <h2>End Time</h2>
        <TimePicker
          value={this.state && this.state.endTime ? this.state.endTime : null}
          onChange={date => {}}
          onAccept={date => {
            this.setState({ endTime: date });
          }}
          minutesStep={5}
        />
        <Button variant="secondary" onClick={checkValidBooking}>
          Request Booking
        </Button>
        {this.state && this.state.status ? renderStatus : null}
      </MuiPickersUtilsProvider>
    );
  }
}
export default BookingPicker;
