import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import cal from "../assets/calendar.png";
import install from "../assets/install.png";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LazyHero from "react-lazy-hero";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.setState({ role: "admin" });
  }
  componentDidMount() {
    console.log("ADMIN DASHBOARD REACHED");
  }
  render() {
    return (
      <Container>
        <LazyHero>
          <div
            style={{
              color: "#404040",
              marginTop: "9rem",
              marginBottom: "4rem"
            }}
          >
            <h1>Hello, Admin!</h1>
          </div>
          {/* <Card bg="secondary"> */}
          <Row style={{ alignItems: "center" }}>
            <ButtonGroup>
              <Col md={6}>
                <Button variant="light" size="lg" href="/admin/booking">
                  <Col xs={6} md={6} style={{ marginLeft: "25%" }}>
                    <Image src={cal} roundedCircle fluid />
                  </Col>
                  <h2>Lab Bookings Requests</h2>
                  <h6>Approve/Reject Lab Booking Requests</h6>
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="light" size="lg" href="/admin/installrequest">
                  <Col xs={6} md={6} style={{ marginLeft: "25%" }}>
                    <Image src={install} roundedCircle fluid />
                  </Col>
                  <h2>Software Installation Requests</h2>
                  <h6>Approve/Reject Installation Requests</h6>
                </Button>
              </Col>
            </ButtonGroup>
          </Row>
          {/* </Card> */}
        </LazyHero>
        <div
          style={{
            position: "fixed",
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

export default AdminDashboard;
