import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET } from "../utils/axiosClient";
//const axios = require('axios');

class RequestViewer extends Component {
  constructor(props) {
    super(props);
  }
  getRequest() {
    //try {
      axiosGET(`/api/requests/`).then(res => {
        console.log(res);
        console.log("Hi");
      })
    //} catch (e) {
    //  console.log(e);
    //}
  }
  componentDidMount() {
    //let data = getDecodedToken();
    this.state && this.getRequest();
    // this.user.role !== "admin" &&
    //   axiosGET("/api/votes").then(res => {
    //     this.setState({ votes: { ...res.data } });
    //   });
  }
  // componentWillReceiveProps(nextProps) {
  //   let data = getDecodedToken();
  //   this.getRequest(data.email);
  // }
  render() {
    axiosGET(`/api/requests/`).then(res => {
      console.log(res);
      console.log("Hi");
    })
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">THIS IS THE RequestViewer Component</h1>
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
    );
  }
}

export default RequestViewer;
