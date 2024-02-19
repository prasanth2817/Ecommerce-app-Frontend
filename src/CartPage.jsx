import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CartDataContext } from "./Context/CartContext";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import MyVerticallyCenteredModal from "./Components/CheckoutModal";

function CartPage() {
  const { cartItem, setCartItem } = useContext(CartDataContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  let navigate = useNavigate();

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItem.filter((item) => item._id !== productId);
    setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItem.reduce((total, item) => total + (item.price), 0);
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
                      src={`http://localhost:8000/Images/${item.images[0]}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <Card.Header>{item.brand}</Card.Header>
                    <div className="container d-flex">
    <Dropdown>
    <Dropdown.Toggle variant="light" id="dropdown-basic">
        {`QTY  ${1}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >1</Dropdown.Item>
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
                  label="UPI payments(comming soon)"
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
                  onClick={() => setModalShow(true)}
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

