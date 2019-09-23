import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LazyHero from "react-lazy-hero";
class WIP extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("WIP REACHED");
  }
  render() {
    return (
      <Container>
        <LazyHero>
          <Row>
            <Col>
              <h1 className="text-center">Coming Soon</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h4 className="text-center">
                This is a Work-In-Progress Feature.
              </h4>
            </Col>
          </Row>
        </LazyHero>
      </Container>
    );
  }
}

export default WIP;
