import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import {
  Navbar,
  Button,
  NavDropdown,
  Form,
  FormCheck,
  Dropdown,
  Nav,
  ButtonGroup,
  FormControl,
} from "react-bootstrap";
import logo from "../../../img/logo.png";
import { Avatar } from "@material-ui/core";
import { useAuth } from "../../AuthContext";
import {
  Link,
  useHistory,
  useLocation,
  withRouter,
  useRouteMatch,
} from "react-router-dom";

export const NavbarExport = () => {
  const { currentUser, logout } = useAuth();
  const ref = useRef(0);
  const history = useHistory();
  const [isAuth, setAuth] = useState(false);
  React.useEffect(() => {
    if (currentUser) {
      setAuth(true);
    }
  }, [currentUser, isAuth]);
  const location = useLocation();
  const match = useRouteMatch("/login");
  console.log(window.location.href);
  if (
    window.location.href === "http://localhost:3000/" ||
    window.location.href === "http://localhost:3000/login" ||
    window.location.href === "http://localhost:3000/forgot-password" ||
    window.location.href === "http://localhost:3000/developers"
  ) {
    return null;
  }
  if (currentUser) {
    return (
      <Navbar
        bg="dark"
        className="hide-nav"
        variant="dark"
        sticky="top"
        fixed="top"
        expand="lg"
      >
        {/* <Navbar.Brand as={Link} to="/home"> */}
        <Link to="/home" className="nav-brand">
          <img
            src={logo}
            alt=""
            className="d-inline-block align-top logo-img"
          />
          {/* </Navbar.Brand> */}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto justify-content-center ">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            {/* <Nav.Link as={Link} to="/home" active="true">
              Home
            </Nav.Link> */}
            <Nav.Link as={Link} to="/allvendors">
              Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="/recommendedproducts">
              Recommended Products
            </Nav.Link>

            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/registernewvendor">
                Register a Vendor
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/allvendors">
                Post a Review
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/userreviews">
                My Reviews
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
            <Dropdown menuAlign="right" as={ButtonGroup}>
              <Button className="text-css" menuAlign="right" variant="info">
                {" "}
                <Navbar.Text className="text-css">
                  Signed in as: {currentUser.displayName}
                </Navbar.Text>
              </Button>

              <Dropdown.Toggle
                split
                menuAlign="right"
                variant="info"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/user/${currentUser.uid}`}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    setAuth(false);
                    logout();
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" className="btn-new">
            Search
          </Button>
        </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        className="hide-nav"
        fixed="top"
        expand="lg"
      >
        <Navbar.Brand href="/home">
          <img
            src={logo}
            alt=""
            className="d-inline-block align-top logo-img"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto justify-content-center ">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            {/* <Nav.Link as={Link} to="/home" active="true">
              Home
            </Nav.Link> */}
            <Nav.Link as={Link} to="/allvendors">
              Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="/recommendedproducts">
              Recommended Products
            </Nav.Link>

            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item disabled as={Link} to="/registernewvendor">
                Register a Vendor
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} disabled to="/allvendors">
                Post a Review
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} disabled to="/userreviews">
                My Reviews
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-info" className="btn-new">
                User OnBoarding
              </Button>
            </Nav.Link>
          </Nav>
          {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" className="btn-new">
            Search
          </Button>
        </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
};
