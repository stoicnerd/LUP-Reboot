import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SoftwareRequestPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("WIP REACHED");
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">
              This is the Software Request Page for notAdmin.
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Coming Soon</h4>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SoftwareRequestPage;
