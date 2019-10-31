import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RequestViewer from "./RequestViewer.jsx";


class AdminBookings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(" Admin's Bookings REACHED");
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">THIS IS THE Admin's Bookings Component</h1>
          </Col>
        </Row>
        <Row>
          <RequestViewer />
        </Row>
      </Container>
    );
  }
}

export default AdminBookings;
