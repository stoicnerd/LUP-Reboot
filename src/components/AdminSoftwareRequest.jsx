import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
//const axios = require('axios');

class AdminSoftwareRequest extends Component {
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
          <Card style={{ width: "72rem" }}>
            <Card>
              <Card>Card Title</Card>
              <Card>
                <Row className="m-1" style={{ fontSize: "55px" }}>
                  Name: {this.state && this.state.request.requesterName}
                </Row>
                <Row className="m-1">
                  Email: {this.state && this.state.request.requesterEmail}
                </Row>
                <Row className="m-1">
                  Software Name: {this.state && this.state.request.softwareName}
                </Row>
                <Row className="m-1">
                  Software Link: {this.state && this.state.request.softwareLink}
                </Row>
                <Row className="m-1">
                  description: {this.state && this.state.request.description}
                </Row>
              </Card>
              <Button className="m-1">Approve</Button>
              <Button className="m-1">Reject</Button>
            </Card>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default AdminSoftwareRequest;
