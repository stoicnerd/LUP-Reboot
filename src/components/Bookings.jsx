import React, { Component } from "react";
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
          <Col style={{ border: "1px black solid" }}>
            <br />
            <br />
            <h1>
              <u>New Booking</u>
            </h1>
            <br />
            <BookingPicker />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bookings;
