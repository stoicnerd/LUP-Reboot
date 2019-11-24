import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getDecodedToken } from "../utils/jwt";
import { Card } from "@material-ui/core";
import { axiosPOST } from "../utils/axiosClient";
import { format } from "path";

class SoftwareRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softName: "",
      softLink: "",
      desc: "",
      data: {}
    };
  }
  componentDidMount() {
    console.log("WIP REACHED");
    let da = getDecodedToken();
    this.setState({ data: da });
    console.log(da);
    console.log(this.state.data);
  }
  render() {
    let triall = () => {
      document.getElementById("formSoftwareDesc").reset();
    };
    let sendSoftReq = () => {
      let d = getDecodedToken();
      let reqData = {
        requesterName: d.name,
        requesterEmail: d.email,
        softwareName: this.state && this.state.softName,
        softwareLink: this.state && this.state.softLink,
        status: "Requested",
        description: this.state && this.state.desc
      };
      axiosPOST("/api/softwareRequests/", reqData).then(res => {
        console.log(res);
        console.log(res.data);
      });
    };
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">
              This is the Software Request Page for notAdmin.
            </h1>
          </Col>
        </Row>
        <Card>
          <Row>
            <Col>
              <Form
                onSubmit={async event => {
                  let d = getDecodedToken();
                  let reqData = {
                    requesterName: d.name,
                    requesterEmail: d.email,
                    softwareName: this.state && this.state.softName,
                    softwareLink: this.state && this.state.softLink,
                    status: "Requested",
                    description: this.state && this.state.desc
                  };
                  axiosPOST("/api/softwareRequests/", reqData).then(res => {
                    console.log(res);
                    console.log(res.data);
                    Form.reset();
                  });
                }}
              >
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="2">
                    Request from
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={this.state.data.name}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="formSoftwareName">
                  <Form.Label>Software Name</Form.Label>
                  <Form.Control
                    onChange={event => {
                      this.setState({ softName: event.target.value });
                    }}
                    placeholder="Enter Software Name"
                  />
                  <Form.Text className="text-muted">
                    Case-sensitive in case of clashes
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formSoftwareLink">
                  <Form.Label>Software Link/Homepage</Form.Label>
                  <Form.Control
                    onChange={event => {
                      this.setState({ softLink: event.target.value });
                    }}
                    placeholder="Enter Software Link"
                  />
                </Form.Group>
                <Form.Group controlId="formSoftwareDesc">
                  <Form.Label>Reason for Request</Form.Label>
                  <Form.Control
                    as="textarea"
                    onChange={event => {
                      this.setState({ desc: event.target.value });
                    }}
                    placeholder="For what purpose do you want this software?"
                  />
                </Form.Group>
                <Button
                  style={{ margin: "15px" }}
                  variant="secondary"
                  type="submit"
                >
                  Request
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default SoftwareRequestPage;
