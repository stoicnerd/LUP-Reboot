import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingPicker from "./BookingPicker";
import { axiosGET } from "../utils/axiosClient";
import { getDecodedToken } from "../utils/jwt";
import Request from "./Request";
import SeeAll from "./SeeAll";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, width: 900 }}
      events={[]}
    />
  </div>
);

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }
  componentDidMount() {
    console.log("Bookings REACHED");
    this.getRequests();
  }
  async getRequests() {
    let allRequests = [];
    let decoded = getDecodedToken();
    console.log(decoded);
    await axiosGET(`/api/requests/${decoded.email}`).then(res => {
      // console.log(res);
      // console.log("Hi");
      allRequests = res.data;
    });
    this.setState({ requests: allRequests });
  }

  generateRequestsList() {
    let allrequests = [];
    let temp = [];
    temp = this.state.requests;
    console.log(this.state.requests);
    temp.forEach(request => {
      allrequests.push(
        <div key={request._id}>
          <Request request={request} />
        </div>
      );
    });
    return <SeeAll items={allrequests} count={50} name="requests" />;
  }
  render() {
    const events = [
      {
        title: "All Day Event very long title",
        start: new Date(2019, 11, 12, 10, 33, 30, 0),
        end: new Date(2019, 11, 12, 11, 33, 30, 0)
      }
    ];
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">THIS IS THE Bookings Component</h1>
          </Col>
        </Row>
        <Row>
          <h3>Current Lab Booking Requests</h3>
        </Row>
        <div className="m:2">{this.generateRequestsList()}</div>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col>
            <MyCalendar
              events={events}
              startAccessor="start"
              endAccessor="end"
            />
          </Col>
          <Col>
            <h1>New Booking</h1>
            <BookingPicker />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bookings;
