import React, { Component } from "react";
import { Link } from "react-router-dom";

import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";

import ButtonToolbar from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import { axiosGET } from "../utils/axiosClient";
import getDecodedToken from "../utils/jwt";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
  }
  decode = () => {
    let mail = getDecodedToken().email;
    console.log(mail);
  };
  render() {
    return (
      <Container>
        <div>
          <h1>THIS IS THE STUDENT DASHBOARD!</h1>
          <p />
        </div>
      </Container>
    );
  }
}

export default StudentDashboard;
