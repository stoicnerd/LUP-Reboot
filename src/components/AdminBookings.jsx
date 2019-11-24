import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosGET } from "./../utils/axiosClient";
import AdminRequest from "./AdminRequest.jsx";
import SeeAll from "./SeeAll";

class AdminBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }
  componentDidMount() {
    console.log(" Admin's Bookings REACHED");
    this.getRequests();
  }
  async getRequests() {
    let allRequests = [];
    await axiosGET(`/api/requests/`).then(res => {
      // console.log(res);
      // console.log("Hi");
      allRequests = res.data;
      console.log(allRequests);
    });
    this.setState({ requests: allRequests });
  }

  generateRequestsList() {
    let allrequests = [];
    let temp = [];
    temp = this.state.requests;
    console.log(this.state.requests);
    temp.forEach(request => {
      allrequests.push(
        <div key={request._id}>
          <AdminRequest request={request} />
        </div>
      );
    });
    return <SeeAll items={allrequests} count={50} name="requests" />;
  }
  render() {
    return (
      <Container>
        <Row style={{ textAlign: "center", padding: "10px" }}>
          <Col>
            <h3>Lab Booking Requests</h3>
          </Col>
        </Row>
        <hr />
        <Row>
          <div>{this.generateRequestsList()}</div>
        </Row>
      </Container>
    );
  }
}

export default AdminBookings;
