import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SeeAll from "./SeeAll";
import AdminSoftwareRequest from "./AdminSoftwareRequest";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET } from "../utils/axiosClient";
import SoftwareInstalled from "./SoftwareInstalled";

class AdminSoftwareRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }
  componentDidMount() {
    console.log("AdminSoftwareRequestPage REACHED");
    this.getSoftwareRequests();
  }
  async getSoftwareRequests() {
    let allRequests = [];
    let decoded = getDecodedToken();
    console.log(decoded);
    await axiosGET(`/api/softwareRequests/`).then(res => {
      // console.log(res);
      // console.log("Hi");
      allRequests = res.data;
    });
    this.setState({ requests: allRequests });
  }
  generateSoftwareRequestsList() {
    let allrequests = [];
    let temp = [];
    temp = this.state.requests;
    console.log(this.state && this.state.requests);
    temp.forEach(request => {
      allrequests.push(
        <div key={request._id}>
          <AdminSoftwareRequest request={request} />
        </div>
      );
    });
    return <SeeAll items={allrequests} count={50} name="software requests" />;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="m:2">{this.generateSoftwareRequestsList()}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <SoftwareInstalled />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminSoftwareRequestPage;
