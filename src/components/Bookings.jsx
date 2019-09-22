import React, { Component, useState } from "react";
import { axiosGET, axiosDELETE } from "../utils/axiosClient";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingPicker from "./BookingPicker";

class Bookings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Bookings REACHED");
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
          <Col>
            <iframe
              title="Current CSIS Lab Bookings"
              src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FKolkata&amp;src=amNmb3UwbTN2dnNzNWh1bW12a25lNzBkNzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%233F51B5&amp;showTitle=0"
              style={{ "border-width": 0 }}
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
