import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET, axiosPOST } from "../utils/axiosClient";
import Button from "react-bootstrap/Button";
import moment from "moment";

import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";

class Software extends Component {
  constructor(props) {
    super(props);
    this.state = {
      software: null
    };
  }

  componentDidMount() {
    this.setState({ software: this.props.software });
  }

  render() {
    return (
      <Container>
        <Collapse>
          <Collapse.Panel
            header={this.state.software && this.state.software.name}
          >
            <Row style={{ margin: "1rem" }}>
              System Numbers:{" "}
              {this.state.software &&
                this.state.software.systemNo.sort().join(", ")}
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Container>
    );
  }
}

export default Software;
