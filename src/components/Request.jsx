import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET, axiosPOST } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";

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
    let cancelBooking = () => {
      axiosPOST(`/api/requests/${this.state.request._id}/Cancelled/`).then(
        res => {
          console.log(res.data.msg);
          this.setState({ request: null });
        }
      );
    };

    let isAdmin = getDecodedToken().role === "notAdmin";
    if (!isAdmin) return <div />;
    if (!this.state.request) return <div />;
    return (
      <Container>
        <Row>
          <Card style={{ width: "72rem" }}>
            <Card>
              <Row className="m-1" style={{ fontSize: "20px" }}>
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
              <Row className="m-1">
                status: {this.state && this.state.request.status}
              </Row>
            </Card>
            <Button className="m-1" onClick={cancelBooking}>
              Cancel Booking
            </Button>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default Request;
