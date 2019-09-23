import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import "react-bootstrap-typeahead/css/Typeahead-bs4.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "../assets/logo.png";
import "../styles/header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    let decodedToken = this.props.decodedToken;
    this.state = {
      role: decodedToken ? decodedToken.role : null,
      decodedToken
    };
  }

  componentWillReceiveProps(nextProps) {
    let nextDecoded = nextProps.decodedToken;
    if (nextDecoded !== this.state.decodedToken) {
      this.setState({
        role: nextDecoded ? nextDecoded.role : null,
        decodedToken: nextProps.decodedToken
      });
    }
  }
  getCommonJSX() {
    return (
      <Nav>
        <NavDropdown
          title={this.state.decodedToken.name}
          id="collasible-nav-dropdown"
        >
          <LinkContainer to="/logout">
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <Navbar.Brand>
          <Image
            src={this.state && this.state.decodedToken.picture}
            width="35"
            height="35"
            roundedCircle
          />
        </Navbar.Brand>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              height="30"
              className="d-inline-block align-top"
              alt="My Course Guide"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {this.state.role ? this.getCommonJSX() : null}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
