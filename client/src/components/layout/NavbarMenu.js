import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnCourseLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => {
    logoutUser();
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#2D9596" }}
      variant="dark"
      className="shadow"
    >
      <Link to="/dashboard">
        <Navbar.Brand className="fw-bold text-white ms-4">
          <img
            src={learnCourseLogo}
            alt="learnCourseLogo"
            width="32"
            height="32"
            className="me-2"
          />
          LearnCourse
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="fw-bold text-white" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="fw-bold text-white"
            to="/about"
            as={Link}
            style={{ borderLeft: "2px solid #B6BBC4" }}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="fw-bold text-white" disabled>
            Welcome {username}
          </Nav.Link>

          <Button
            variant="secondary"
            className="fw-bold text-white me-4 ms-2"
            style={{ backgroundColor: "#9BCF53", border: "none" }}
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="me-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
