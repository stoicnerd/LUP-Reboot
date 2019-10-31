import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
//const axios = require('axios');

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: null
    };
  }

  componentDidMount() {
    this.setState({ request: this.props.request });
  }

  render() {
    let isAdmin = getDecodedToken().role === "admin";
    if (!isAdmin) return <div />;
    if (!this.state.request) return <div />;
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">THIS IS THE Request Component</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row>{this.state && this.state.request.name}</Row>
            <Row>{this.state && this.state.request.email}</Row>
            <Row>{this.state && this.state.request.startTime}</Row>
            <Row>{this.state && this.state.request.endTime}</Row>
            <Row>{this.state && this.state.request.description}</Row>
            <Row>{this.state && this.state.request.status}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Request;
