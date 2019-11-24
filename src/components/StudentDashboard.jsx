import React, { Component } from "react";
import { Link } from "react-router-dom";
import "rc-collapse/assets/index.css";
import Container from "react-bootstrap/Container";
import LazyHero from "react-lazy-hero";
import { axiosGET } from "../utils/axiosClient";
import { getDecodedToken } from "../utils/jwt";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import cal from "../assets/calendar.png";
import install from "../assets/install.png";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    console.log(this.user);
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
            <h1>What would you like to do?</h1>
          </div>
          {/* <Card bg="secondary"> */}
          <Row style={{ alignItems: "center" }}>
            <ButtonGroup>
              <Col md={6}>
                <Button variant="light" size="lg" href="/booking">
                  <Col xs={6} md={6} style={{ marginLeft: "25%" }}>
                    <Image src={cal} roundedCircle fluid />
                  </Col>
                  <h2>Lab Bookings</h2>
                  <h6>Book lab for a certain period of time</h6>
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="light" size="lg" href="/installrequest">
                  <Col xs={6} md={6} style={{ marginLeft: "25%" }}>
                    <Image src={install} roundedCircle fluid />
                  </Col>
                  <h2>Software Installation Requests</h2>
                  <h6>Request new/updated software</h6>
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

export default StudentDashboard;
