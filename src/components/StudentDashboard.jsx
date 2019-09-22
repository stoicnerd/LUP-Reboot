import React, { Component } from "react";
import "rc-collapse/assets/index.css";
import Container from "react-bootstrap/Container";

import { axiosGET } from "../utils/axiosClient";
import { getDecodedToken } from "../utils/jwt";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    console.log(this.user);
  }
  render() {
    return (
      <Container>
        <div>
          <h1>THIS IS THE STUDENT DASHBOARD!</h1>
          {this.user.role === "notAdmin" ? (
            <button>notAdmin</button>
          ) : (
            <button>Admin</button>
          )}
          {this.user.email}
          <p />
        </div>
      </Container>
    );
  }
}

export default StudentDashboard;
