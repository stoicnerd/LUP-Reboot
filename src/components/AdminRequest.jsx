import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET, axiosPOST } from "../utils/axiosClient";
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
    let approveRequest = () => {
      axiosPOST(`/api/requests/${this.state.request._id}/Approved/`).then(
        res => {
          console.log(res.data.msg);
          this.setState({ request: null });
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      );
    };
    let rejectRequest = () => {
      axiosPOST(`/api/requests/${this.state.request._id}/Rejected/`).then(
        res => {
          console.log(res.data.msg);
          this.setState({ request: null });
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      );
    };
    return (
      <Container>
        <Card style={{ width: "72rem" }}>
          <Row>
            <Col>
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
            </Col>
            <Col>
              <Button
                variant="success"
                className="m-1"
                onClick={approveRequest}
                block
              >
                Approve
              </Button>
            </Col>
            <Col>
              <Button
                block
                variant="danger"
                className="m-1"
                onClick={rejectRequest}
              >
                Reject
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default AdminRequest;
