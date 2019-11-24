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
          </Col>
        </Row>
        <Row style={{ textAlign: "center", padding: "10px" }}>
          <Col>
            <h3>Current Lab Booking Requests</h3>
          </Col>
        </Row>
        <div className="m:2">{this.generateRequestsList()}</div>
        <br />
        <br />
        <hr style={{ border: "1.5px black solid" }} />
        {/* <br />
        <br /> */}
        <Row style={{ textAlign: "center", padding: "10px" }}>
          <Col>
            <h3>New Lab Booking Request</h3>
            <hr />
          </Col>
        </Row>
        <Row style={{ padding: "15px" }}>
          <Col>
            <div className="">{this.getCalender()}</div>
          </Col>
          <Col>
            {this.state.events.length === 0 ? (
              <BookingPicker all={[]} />
            ) : (
              <BookingPicker all={this.state && this.state.events} />
            )}
          </Col>
        </Row>
        <br />
        <hr style={{ border: "1.5px black solid" }} />
        <div
          style={{
            left: "0",
            bottom: "10px",
            width: "100%",
            textAlign: "center"
          }}
        >
          <span class="glyphicon glyphicon-calendar" />
          <span style={{ color: "darkgrey" }}>
            CSIS Labs, BITS Pilani Hyderabad Campus
          </span>
        </div>
      </Container>
    );
  }
}

export default Bookings;
