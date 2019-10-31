import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { AsyncTypeahead, Menu } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "../assets/logo.png";
import "../styles/header.css";
import { axiosGET } from "../utils/axiosClient";

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
        {/* {this.getSearchBarJSX()} */}
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
  // getAdminJSX() {
  //   return (
  //     <LinkContainer to="/upload">
  //       <Nav.Link>Import Data</Nav.Link>
  //     </LinkContainer>
  //   );
  // }
  // getSearchBarJSX() {
  //   return (
  //     <AsyncTypeahead
  //       isLoading={this.state.isSearchLoading}
  //       id="searchTypeahead"
  //       align="left"
  //       placeholder="Search Courses"
  //       selected={this.state.selectedCourse}
  //       onSearch={query => {
  //         if (query.length >= 2) {
  //           this.setState({ isSearchLoading: true });
  //           axiosGET(`/api/courses/name/${query}`).then(res => {
  //             let courses = res.data.map(({ name, id, ...rest }) => {
  //               let label = id + " " + name;
  //               if (this.state.role === "admin") {
  //                 label = rest.campus + ": " + label;
  //               }
  //               return { label, ...rest, id };
  //             });
  //             this.setState({ isSearchLoading: false, courses });
  //           });
  //         }
  //       }}
  //       renderMenu={(results, menuProps) => (
  //         <Menu {...menuProps}>
  //           {results.map((result, index) => (
  //             <LinkContainer
  //               to={
  //                 this.state.role === "admin"
  //                   ? `/courses/${result.id}/${result.campus}`
  //                   : `/courses/${result.id}`
  //               }
  //               key={result.id + " " + result.campus}
  //             >
  //               <Nav.Link>
  //                 <div className="searchItem">{result.label}</div>
  //               </Nav.Link>
  //             </LinkContainer>
  //           ))}
  //         </Menu>
  //       )}
  //       options={this.state.courses}
  //     />
  //   );
  // }
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
