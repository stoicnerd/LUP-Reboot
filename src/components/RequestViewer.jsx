import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AdminBookings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(" Requestviewer REACHED");
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">THIS IS THE RequestViewer Component</h1>
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