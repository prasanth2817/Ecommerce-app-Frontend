import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CartDataContext } from "./Context/CartContext";
import AxiosService from "./Common/ApiService"
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import MyVerticallyCenteredModal from "./Components/CheckoutModal";
import {toast} from 'react-toastify';
import {jwtDecode} from "jwt-decode";

function CartPage() {
  const { cartItem, setCartItem } = useContext(CartDataContext);
  const [userData, setUserData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const userDataFromToken = jwtDecode(token);
        setUserData(userDataFromToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle error, maybe clear sessionStorage or log out the user
      }
    } else {
      toast.error("please login to view profile")
      navigate("/login")
    }
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItem.filter((item) => item._id !== productId);
    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItem.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setModalShow(true);
};



  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCartItem(JSON.parse(existingCart));
    }
  }, [setCartItem]);

  return (
    <>
      <div className="container products-text cart-page">
        {cartItem.length === 0 ? (
          <h3>Your Cart Is Empty Now!</h3>
        ) : (
          <div className="container cart-style">
            <div className="cart-items">
              <span>My Bag</span>({cartItem.length} Items)
            </div>
            {cartItem.map((item) => (
              <div key={item._id}>
                <Card className="container cart-card">
                  <div>
                    <Card.Img
                      variant="top"
                      src={`https://e-commerce-app-qlsz.onrender.com/Images/${item.images[0]}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <Card.Header>{item.brand}</Card.Header>
                    <p>Selected Size: {item.size}</p>
                    <div className="container d-flex">
                      <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                          {`QTY  ${1}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>1</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <Card.Body>
                      <Card.Text>{item.name}</Card.Text>
                      <Card.Text>Rs.{item.price}</Card.Text>
                      <Card.Text>7 Days Return Available</Card.Text>
                      <Button
                        variant="light"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="fa-solid fa-trash"></i>{" "}
                        <span>Remove from Bag</span>
                      </Button>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
        <div className="container cart-pricetag">
          {cartItem.length > 0 && (
            <Card className="container cart-card">
              <Card.Header>Price Details</Card.Header>
              <Card.Body>
                <Card.Title>No of Orders: {cartItem.length}</Card.Title>
                <Card.Title>
                  Bag Total : <i className="fa-solid fa-indian-rupee-sign"></i>
                  {calculateTotalPrice()}
                </Card.Title>
                <Card.Title>Discounts : 0</Card.Title>
                <Card.Title>Shipping Fee : Free </Card.Title>
                <Card.Title>
                  Order Total :{" "}
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {calculateTotalPrice()}
                </Card.Title>
                <br />
                <Form.Check
                  type="radio"
                  label="Cash On Delivery"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <Form.Check
                  disabled
                  type="radio"
                  label="UPI payments(Currently Unavailable)"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
                <br />
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <Button
                  variant="success"
                  onClick={handleCheckout}
                  disabled={!paymentMethod} // Disable checkout button if payment method is not selected
                >
                  Checkout
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;

// try {
//   // Ensure userData is not null before accessing its properties
//   if (!userData) {
//       throw new Error("User data not found. Please log in again.");
//   }
//   // Destructure email directly from userData
//   const email = userData.email;
//   // Ensure email is available
//   if (!email) {
//       throw new Error("User email not found. Please log in again.");
//   }
//   // Map cartItem to extract product IDs
//   const products = cartItem.map((item) => ({ productId: item._id }));

//   // Log products for debugging
//   console.log("Products:", products);
// console.log(email);
//   // Make the POST request to create order
//   const response = await AxiosService.post("/orders/createorder", {email, products });

//   // Check if the request was successful
//   if (response.status === 201) {
//       // Redirect to homepage
      
//       // Display success message
//       toast.success(res.data.message);
//   }
// } catch (error) {
//   // Log error for debugging
//   console.log(error);
//   // Display error message to the user
//   toast.error(error.response?.data?.error || "Error occurred! Please try again later.");
//   // Set error state for further handling
//   setError(error);
// }
