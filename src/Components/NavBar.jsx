// import React, { useContext, useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from "react-router-dom";
// import { CartDataContext } from "../Context/CartContext";
// import Dropdown from "react-bootstrap/Dropdown";

// function NavBar() {
//   const { cartItem } = useContext(CartDataContext);
//   const navigate = useNavigate();

//   // Function to navigate to the cart page
//   const openCart = () => {
//     navigate("/CartPage");
//   };

//   const homepage = () => {
//     navigate("/");
//   };
//   // State to store the total number of items in the cart
//   const [totalItemsInCart, setTotalItemsInCart] = useState(cartItem.length);

//   // useEffect to update totalItemsInCart when cartItem changes
//   useEffect(() => {
//     setTotalItemsInCart(cartItem.length);
//   }, [cartItem]);
//   // const totalItemsInCart = cartItem.reduce((total, item) => total + item.quantity, 0);

//    // State to track user authentication status
//    const [isLoggedIn, setIsLoggedIn] = useState(false);

//    // Function to handle user authentication status change
//    const handleAuthenticationChange = () => {
//      setIsLoggedIn(!isLoggedIn); // Toggle user authentication status
//    };
//   return (
//     <Navbar expand="lg" className="container-fluid bg-body-tertiary aligner">
//       <Container fluid>
//         <Navbar.Brand onClick={homepage}>EagleCart</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Mens</Nav.Link>
//             <Nav.Link href="#action2">Womens</Nav.Link>
//             <Nav.Link href="#" disabled>
//               Kids
//             </Nav.Link>
//           </Nav>
          
//           <span className="d-flex gap:3rem">
//             <Dropdown>
//               <Dropdown.Toggle variant="light" id="dropdown-basic">
//                 <Button variant="light">
//                 <i className={`fa-solid fa-circle-user fa-2xl ${isLoggedIn ? 'logged-in' : ''}`}></i>
//                 </Button>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item href="#/action-1">
//                   <i className="fa-solid fa-user"></i> Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item href="/login" onClick={handleAuthenticationChange}>
//                   <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
//                   {isLoggedIn ? 'Logout' : 'Login'}
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             <Button
//               variant="light"
//               onClick={openCart}
//             >
//               <i className="fa-solid fa-bag-shopping fa-xl"></i>
//               {totalItemsInCart > 0 && (
//                 <span className="badge bg-secondary">{totalItemsInCart}</span>
//               )}
//             </Button>
//           </span>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;

// import React, { useContext, useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from "react-router-dom";
// import { CartDataContext } from "../Context/CartContext";
// import Dropdown from "react-bootstrap/Dropdown";

// function NavBar() {
//   const { cartItem } = useContext(CartDataContext);
//   const navigate = useNavigate();

//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state

//   useEffect(() => {
//     // Check if the user is logged in (e.g., by checking sessionStorage or localStorage)
//     const token = sessionStorage.getItem("token");
//     setIsLoggedIn(!!token); // Update authentication state
//   }, []);

//   // Function to navigate to the cart page
//   const openCart = () => {
//     navigate("/CartPage");
//   };

//   const homepage = () => {
//     navigate("/");
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("token"); // Clear authentication token
//     setIsLoggedIn(false); // Update authentication state
//   };

//   return (
//     <Navbar expand="lg" className="container-fluid bg-body-tertiary aligner">
//       <Container fluid>
//         <Navbar.Brand onClick={homepage}>EagleCart</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Mens</Nav.Link>
//             <Nav.Link href="#action2">Womens</Nav.Link>
//             <Nav.Link href="#" disabled>
//               Kids
//             </Nav.Link>
//           </Nav>
//           <span className="d-flex gap:3rem">
//             {isLoggedIn ? ( // Render profile dropdown if logged in
//               <Dropdown>
//                 <Dropdown.Toggle variant="light" id="dropdown-basic">
//                   <Button variant="light">
//                     <i className="fa-solid fa-circle-user fa-2xl"></i>
//                   </Button>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item href="#/action-1">
//                     <i className="fa-solid fa-user"></i> Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item href="#/action-2" onClick={handleLogout}>
//                     <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             ) : (
//               // Render login button if not logged in
//               <Button variant="light" onClick={navigate("/login")}>
//                 Login
//               </Button>
//             )}

//             <Button
//               className="rounded-button"
//               variant="light"
//               onClick={openCart}
//             >
//               <i className="fa-solid fa-bag-shopping fa-xl"></i>
//               {cartItem.length > 0 && (
//                 <span className="badge bg-secondary">{cartItem.length}</span>
//               )}
//             </Button>
//           </span>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBar;

{/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { CartDataContext } from "../Context/CartContext";
import Dropdown from "react-bootstrap/Dropdown";

function NavBar() {
  const { cartItem } = useContext(CartDataContext);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state

  useEffect(() => {
    // Check if the user is logged in 
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Update authentication state
  }, []);

  const openCart = () => {
    navigate("/CartPage");
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
        <Navbar.Brand onClick={homepage}>EagleCart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Mens</Nav.Link>
            <Nav.Link href="#action2">Womens</Nav.Link>
            <Nav.Link href="#" disabled>
              Kids
            </Nav.Link>
          </Nav>
          <span className="d-flex gap:3rem">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <Button variant="light">
                  <i className="fa-solid fa-circle-user fa-2xl"></i>
                </Button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="/login"
                  onClick={handleAuthenticationChange}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  {isLoggedIn ? 'Logout' : 'Login'}
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  <i className="fa-solid fa-user"></i> Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              className="rounded-button"
              variant="light"
              onClick={openCart}
            >
              <i className="fa-solid fa-bag-shopping fa-xl"></i>
              {cartItem.length > 0 && (
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
