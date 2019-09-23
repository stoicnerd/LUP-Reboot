import React, { Component } from "react";
import { Link } from "react-router-dom";
import "rc-collapse/assets/index.css";
import Container from "react-bootstrap/Container";
import LazyHero from "react-lazy-hero";
import { getDecodedToken } from "../utils/jwt";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
  }
  render() {
    return (
      <Container>
        <LazyHero>
          <div>
            <h1>Welcome, {this.user.name}!</h1>
          </div>
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <Link to={`/booking`}>
                <Button>Lab Bookings</Button>
              </Link>
            </Col>
            <Col>
              <Link to={`/installrequest`}>
                <Button>Software Installation Requests</Button>
              </Link>
            </Col>
          </Row>
        </LazyHero>
      </Container>
    );
  }
}

export default StudentDashboard;
