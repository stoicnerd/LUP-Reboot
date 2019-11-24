import React, { Component } from "react";
import MomentUtils from "@date-io/moment"; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { sendBookingRequest } from "../utils/bookingRequester";
import { axiosPOST } from "../utils/axiosClient";
import { getDecodedToken } from "../utils/jwt";
import moment from "moment";

class BookingPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      status: null,
      description: "",
      showModal: false,
      modalMsg: ""
    };
  }
  componentDidMount() {
    console.log("BookingPicker Rendered");
    console.log(this.props.all);
  }

  render() {
    let checkValidBooking = () => {
      let ids = [];
      var requeststart = new Date(this.state.startTime);
      var requestend = new Date(this.state.endTime);
      var requestdate = new Date(this.state.date);
      requestend.setFullYear(
        requestdate.getFullYear(),
        requestdate.getMonth(),
        requestdate.getDate()
      );
      requeststart.setFullYear(
        requestdate.getFullYear(),
        requestdate.getMonth(),
        requestdate.getDate()
      );
      if (requeststart.getTime() >= requestend.getTime()) {
        alert("Start Time should be before End Time");
        return;
      }
      var now = new Date();
      if (requeststart.getTime() < now.getTime()) {
        alert("The time has already passed, my child.");
        return;
      }
      for (var i = 0; i < this.props.all.length; i++) {
        var requestsstartDate = new Date(this.props.all[i].start);
        var requestsendDate = new Date(this.props.all[i].end);
        if (
          (requestsstartDate.getTime() >= requeststart.getTime() &&
            requestsstartDate.getTime() < requestend.getTime()) ||
          (requestsendDate.getTime() > requeststart.getTime() &&
            requestsendDate.getTime() <= requestend.getTime())
        ) {
          ids.push(this.props.all[i]._id);
        }
      }
      if (ids.length === 0) {
        {
          let data = getDecodedToken();
          let reqData = {
            name: data.name,
            email: data.email,
            status: "Requested",
            startTime: requeststart,
            endTime: requestend,
            description: this.state.description
          };
          console.log(reqData);
          axiosPOST("/api/requests/", reqData).then(res => {
            console.log(res);
            console.log(res.data);
          });
          return;
        }
      } else {
        alert("This slot is not available. Please try some other time.");
      }
    };
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <h2>Date</h2>
        <DatePicker
          value={this.state ? this.state.date : new Date()}
          onChange={date => {}}
          onAccept={date => {
            this.setState({ date: date });
          }}
          disablePast={true}
        />
        <h2>Start Time</h2>
        <TimePicker
          value={this.state ? this.state.startTime : new Date()}
          onChange={date => {}}
          onAccept={date => {
            this.setState({ startTime: date });
          }}
          minutesStep={5}
        />
        <h2>End Time</h2>
        <TimePicker
          value={this.state ? this.state.endTime : new Date()}
          onChange={date => {}}
          onAccept={date => {
            this.setState({ endTime: date });
          }}
          minutesStep={5}
        />
        <br />
        <Form>
          <Form.Label>
            <h5>Lab booking purpose</h5>
          </Form.Label>
          <Form.Control
            onChange={event => {
              this.setState({ description: event.target.value });
            }}
            as="textarea"
            rows="3"
          />
        </Form>
        <Button
          style={{ margin: "15px" }}
          variant="secondary"
          onClick={checkValidBooking}
        >
          Request Booking
        </Button>
      </MuiPickersUtilsProvider>
    );
  }
}
export default BookingPicker;
