import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET, axiosPOST } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
//const axios = require('axios');
import moment from "moment";

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
              <Row>
                <Col>
                  <Row className="m-1">
                    Date:{" "}
                    {moment(this.state.request.startTime).format("Do MMM YYYY")}
                  </Row>
                  <Row>
                    <Col className="m-1">
                      From:{" "}
                      {moment(this.state.request.startTime).format("h:mm A")}
                    </Col>
                    <Col className="m-1">
                      ToTo: {moment(this.state.request.endTime).format("h:mm A")}
                    </Col>
                  </Row>
                </Col>
                <Col className="m-1">
                  status: {this.state && this.state.request.status}
                </Col>
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
