import React, { Component } from "react";
import { axiosGET, axiosDELETE } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.setState({ role: "admin" });
  }
  componentDidMount() {
    console.log("ADMIN DASHBOARD REACHED");
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">THIS IS THE GREAT ADMIN'S DASHBOARD</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
