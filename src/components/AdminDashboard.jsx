import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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
        <Card bg="secondary">
          <Row>
            <Col>
              {" "}
              <Link to={`/admin/booking`}>
                <Button>Lab Bookings</Button>
              </Link>
            </Col>
            <Col>
              {" "}
              <Link to={`/admin/installrequest`}>
                <Button>Software Installation Requests</Button>
              </Link>
            </Col>
            <Col>
              {" "}
              <Link to={`/admin/servermon`}>
                <Button>Server Monitor</Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default AdminDashboard;
