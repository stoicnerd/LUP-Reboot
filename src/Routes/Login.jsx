import React, { Component } from "react";
import { Redirect } from "react-router";
import { GoogleLogin } from "react-google-login";
import { getToken, checkToken } from "../utils/jwt";

import LazyHero from "react-lazy-hero";
import logo from "../assets/logo.png";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: checkToken(),
      failed: false
    };
  }

  render() {
    let googleSuccess = data => {
      getToken(data.tokenObj.access_token, (err, token) => {
        if (err) {
          return this.setState({
            failed: true
          });
        }
        this.props.setRouterToken(token);
        this.setState({ authenticated: true });
      });
    };
    let googleFailure = data => {
      console.log(data);
      this.setState({
        failed: true
      });
    };
    if (this.state.authenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
          <LazyHero
            color="#000000"
            opacity={0.6}
            imageSrc={back1}
            minHeight="100vh"
            parallaxOffset={100}
          >
            <div
              className="home"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
                color: "white"
              }}
            >
              <img
                src={logo}
                height="auto"
                width="100%"
                alt="Lab Utility Portal"
              />
              {/* <h1>Lab Utility Portal</h1> */}
              <br />
              <br />
              <h4>Lab Bookings and Software Install Requests for CSIS Labs</h4>
              <br />

              <h5
                style={{
                  margin: "10px"
                }}
              >
                Let's Get Started
              </h5>
              <p>
                <GoogleLogin
                  clientId="55918411552-o87q5jvqa0dgg2von99oggoomuvn68eb.apps.googleusercontent.com"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  prompt="consent"
                  theme="dark"
                  icon={false}
                  buttonText="Login with BITSMail"
                />
              </p>
              <font color="red">
                {this.state.failed
                  ? "Account not found. Make sure you are using your BITS mail to login"
                  : ""}
              </font>
            </div>
          </LazyHero>
          <LazyHero
            minHeight="75vh"
            opacity={0.8}
            imageSrc={back2}
            style={{ textAlign: "center", color: "Black" }}
          >
            <h2>
              <b>
                <u>About LUP</u>
              </b>
            </h2>
            <h4 style={{ marginLeft: "10%", marginRight: "10%" }}>
              This Portal is for efficient management of the newly constructed
              CSIS Labs. These labs have high-end computers which can be of
              great use to the students who want to divulge into the area of
              ML/AI or other resource intensive fields.
            </h4>
            <br />
            <br />
            <div
              style={{
                color: "rgb(66, 133, 244)"
              }}
            >
              <br />
              Made with <span style={{ color: "#e25555" }}>❤</span> in BPHC
            </div>
          </LazyHero>
        </div>
      );
    }
  }
}

export default Login;
