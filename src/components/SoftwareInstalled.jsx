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
import Software from "./Software";
import SeeAll from "./SeeAll";

class SoftwareInstalled extends Component {
  constructor(props) {
    super(props);
    this.state = { softwares: [] };
  }

  componentDidMount() {
    this.getSoftwares();
  }
  async getSoftwares() {
    let allSoftwares = [];
    await axiosGET(`/api/software/`).then(res => {
      allSoftwares = res.data;
      console.log(allSoftwares);
    });
    this.setState({ softwares: allSoftwares });
  }
  generateSoftwaresList() {
    let allsoftwares = [];
    let temp = [];
    temp = this.state.softwares;
    temp.sort((a, b) => {
      // Use toUpperCase() to ignore character casing
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    });
    console.log(this.state && this.state.softwares);
    temp.forEach(software => {
      allsoftwares.push(
        <div key={software._id}>
          <Software software={software} />
        </div>
      );
    });
    return <SeeAll items={allsoftwares} count={5} name="softwares" />;
  }
  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col>
            <h1 className="text-center">Softwares Installed</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <div className="m:2">{this.generateSoftwaresList()}</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h6 style={{ color: "grey" }}>
              Click on the Software Name to see the System Numbers on which they
              are installed.
            </h6>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SoftwareInstalled;
