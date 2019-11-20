import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
//const axios = require('axios');

class AdminRequest extends Component {
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
        <Card style={{ width: "72rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              <Row className="m-1">
                Name: {this.state && this.state.request.name}
              </Row>
              <Row className="m-1">
                Email: {this.state && this.state.request.email}
              </Row>
              <Row className="m-1">
                startTime: {this.state && this.state.request.startTime}
              </Row>
              <Row className="m-1">
                endTime: {this.state && this.state.request.endTime}
              </Row>
              <Row className="m-1">
                description: {this.state && this.state.request.description}
              </Row>
            </Card.Text>
            <Button className="m-1">Accept</Button>
            <Button className="m-1">Reject</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default AdminRequest;
