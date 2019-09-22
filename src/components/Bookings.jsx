import React, { Component } from "react";
import { axiosGET, axiosDELETE } from "../utils/axiosClient";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
            <div />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bookings;
