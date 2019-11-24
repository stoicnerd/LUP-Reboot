import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET, axiosPOST } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
import moment from "moment";

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
    let stime = new moment(this.state.request.startTime);
    let etime = new moment(this.state.request.endTime);
    return (
      <Container>
        <Row style={{ padding: "5px" }}>
          <Card style={{ width: "72rem" }}>
            {/* <Row className="m-1">Date: {stime.format('Do MMM YYYY')}</Row>
              <Row className="m-1">
                startTime: {stime.format('h:mm A')}
              </Row>
              <Row className="m-1">
                endTime: {etime.format('h:mm A')}
              </Row>
              <Row className="m-1">
                description: {this.state && this.state.request.description}
              </Row>
              <Row className="m-1">
                status: {this.state && this.state.request.status}
              </Row> */}
            <Row>
              <Col>
                <Row className="m-1">Date: {stime.format("Do MMM YYYY")}</Row>
                <Row>
                  <Col className="m-1">From: {stime.format("h:mm A")}</Col>
                  <Col className="m-1">To: {etime.format("h:mm A")}</Col>
                </Row>
              </Col>
              <Col className="m-1">
                status: {this.state && this.state.request.status}
              </Col>
            </Row>
            <Row>
              <Col className="m-1 col-9">
                description: {this.state && this.state.request.description}
              </Col>
              <Col style={{ marginRight: "1rem", marginBottom: "0.5rem" }}>
                {this.state.request.status === "Approved" ? (
                  <Button variant="danger" className="m-1" onClick={cancelBooking}>
                    Cancel Booking
                  </Button>
                ) : this.state.request.status === "Requested" ? (
                  <Button variant="danger" className="m-1" onClick={cancelBooking} block>
                    Cancel Request
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Card>
          {/* {this.state.request.status === "Approved" ? (
              <Button className="m-1" onClick={cancelBooking}>
                Cancel Booking
              </Button>
            ) : this.state.request.status === "Requested" ? (
              <Button className="m-1" onClick={cancelBooking}>
                Cancel Request
              </Button>
            ) : null} */}
          {/* <Button className="m-1" onClick={cancelBooking}>
              Cancel Booking
            </Button> */}
        </Row>
      </Container>
    );
  }
}

export default Request;
