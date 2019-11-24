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

function log(msg, color) {
  color = color || "black";
  var bgc = "White";
  switch (color) {
    case "success":
      color = "Green";
      bgc = "LimeGreen";
      break;
    case "info":
      color = "DodgerBlue";
      bgc = "Turquoise";
      break;
    case "error":
      color = "Red";
      bgc = "Black";
      break;
    case "start":
      color = "OliveDrab";
      bgc = "PaleGreen";
      break;
    case "warning":
      color = "Tomato";
      bgc = "Black";
      break;
    case "end":
      color = "Orchid";
      bgc = "MediumVioletRed";
      break;
    default:
      color = color;
  }

  if (typeof msg == "object") {
    console.log(msg);
  } else if (typeof color == "object") {
    console.log(
      "%c" + msg,
      "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;"
    );
    console.log(color);
  } else {
    console.log(
      "%c" + msg,
      "color:" + color + ";font-weight:bold; background-color: " + bgc + ";"
    );
  }
}

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
  }

  render() {
    let checkValidBooking = () => {
      let bookingData = {
        date: this.state && this.state.date,
        start: this.state && this.state.startTime,
        end: this.state && this.state.endTime
      };
      //   if (bookingData.start.valueOf() > bookingData.end.valueOf()) {
      //     console.log("Start Time is after End Time");
      //   }
      sendBookingRequest(bookingData, (err, length) => {
        if (err) {
          alert("Please provide a valid Date, Start Time and End Time");
          //this.setState({modalMsg:"Please provide a valid Date, Start Time and End Time"})
          log("Please provide a valid Date, Start Time and End Time", "error");
          return;
        } else {
          alert("The slot is available");
          let data = getDecodedToken();
          // console.log(bookingData);
          let date = moment(bookingData.date);
          let sTime = moment(bookingData.start);
          let eTime = moment(bookingData.end);
          sTime.date(date.date());
          eTime.date(date.date());
          sTime.month(date.month());
          eTime.month(date.month());
          sTime.year(date.year());
          eTime.year(date.year());
          let reqData = {
            name: data.name,
            email: data.email,
            status: "Requested",
            startTime: sTime.toDate(),
            endTime: eTime.toDate(),
            description: this.state.description
          };
          // bookingData.start().date(bookingData.date.date());
          // bookingData.end().date(bookingData.date.date());
          // let req = {
          // };
          console.log(reqData);
          axiosPOST("/api/requests/", reqData).then(res => {
            console.log(res);
            console.log(res.data);
          });
          return;
        }
      });
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
