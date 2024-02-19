import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { CartDataContext } from "../Context/CartContext";
import Dropdown from "react-bootstrap/Dropdown";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

function NavBar() {
  const { cartItem } = useContext(CartDataContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const userDataFromToken = jwtDecode(token);
        setUserData(userDataFromToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please login again.");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, [isLoggedIn]);

  const openCart = () => {
    if (!isLoggedIn) {
      toast.error("Please Login to Continue");
      navigate("/login");
    } else {
      navigate("/CartPage");
    }
  };

  const homepage = () => {
    navigate("/");
  };

  // Function to handle authentication change (login/logout)
  const handleAuthenticationChange = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar expand="lg" className="container-fluid bg-body-tertiary aligner">
      <Container fluid>
        <Navbar.Brand className="logo" onClick={homepage}>
          EagleCart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="footer-text" href="/allproducts?category=Mens">
              Mens
            </Nav.Link>
            <Nav.Link
              className="footer-text"
              href="/allproducts?category=Womens"
            >
              Womens
            </Nav.Link>
            <Nav.Link className="footer-text" href="#" disabled>
              Kids
            </Nav.Link>
          </Nav>
          {isLoggedIn && (
            <div className="products-text">
              {userData?.firstName} {userData?.lastName}
            </div>
          )}
          <span className="d-flex gap:3rem">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i className="fa-solid fa-circle-user fa-2xl"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleAuthenticationChange}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  {isLoggedIn ? "Logout" : "Login"}
                </Dropdown.Item>
                <Dropdown.Item href="/profile">
                  <i className="fa-solid fa-user"></i> Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="light" onClick={openCart}>
              <i className="fa-solid fa-bag-shopping fa-xl"></i>
              {cartItem.length && isLoggedIn > 0 && (
                <span className="badge bg-secondary">{cartItem.length}</span>
              )}
            </Button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
