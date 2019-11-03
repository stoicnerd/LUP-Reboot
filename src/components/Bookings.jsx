import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingPicker from "./BookingPicker";
import { axiosGET } from "../utils/axiosClient";
import { getDecodedToken } from "../utils/jwt";
import Request from "./Request";
import SeeAll from "./SeeAll";

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
            <iframe
              title="Current CSIS Lab Bookings"
              src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FKolkata&amp;src=amNmb3UwbTN2dnNzNWh1bW12a25lNzBkNzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%233F51B5&amp;showTitle=0"
              style={{ borderWidth: 0 }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
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
