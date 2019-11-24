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

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      events: []
    };
  }
  componentDidMount() {
    console.log("Bookings REACHED");
    this.getRequests();
    this.getEvents();
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

  async getEvents() {
    let allEvents = [];
    await axiosGET(`/api/events/`).then(res => {
      // console.log(res);
      // console.log("Hi");
      allEvents = res.data;
    });
    let finalEvent = [];
    allEvents.forEach(event => {
      finalEvent.push({
        title: event.description,
        start: new Date(event.startTime),
        end: new Date(event.endTime)
      });
    });
    this.setState({ events: finalEvent });
  }

  generateRequestsList() {
    let allrequests = [];
    let temp = [];
    temp = this.state.requests;
    console.log(this.state && this.state.requests);
    temp.forEach(request => {
      allrequests.push(
        <div key={request._id}>
          <Request request={request} />
        </div>
      );
    });
    return <SeeAll items={allrequests} count={5} name="requests" />;
  }

  getCalender() {
    const MyCalendar = props => (
      <div>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: 900 }}
          events={this.state && this.state.events}
        />
      </div>
    );
    return <MyCalendar />;
  }
  render() {
    console.log(this.state.events);
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
            <div className="m:2">{this.getCalender()}</div>
          </Col>
          <Col>
            <h1>New Booking</h1>
            {this.state.events.length === 0 ? (
              <div />
            ) : (
              <BookingPicker all={this.state && this.state.events} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bookings;
