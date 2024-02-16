import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CartDataContext } from "./Context/CartContext";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from "./Components/CheckoutModal";

function CartPage() {
  const { cartItem, setCartItem } = useContext(CartDataContext);
  const [modalShow, setModalShow] = React.useState(false);
  let navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };
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

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCartItem(JSON.parse(existingCart));
    }
  }, [setCartItem]);

  return (
    <>
      <div className="container cart-page">
        {cartItem.length === 0 ? (
          <h3>Cart is empty</h3>
        ) : (
          <div className="container cart-style">
            <div className="cart-items">
              <span>My Bag</span>({cartItem.length} Items)
            </div>
            {cartItem.map((item) => (
              <div key={item._id}>
                <Card
                  className="d-flex"
                  border="secondary"
                  style={{ width: "100%" }}
                >
                  <div>
                    <Card.Img
                      variant="top"
                      src={`https://e-commerce-app-qlsz.onrender.com/Images/${item.image}`}
                      style={{ width: "40%" }}
                    />
                  </div>
                  <div>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Body>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>Rs.{item.price}</Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
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
            <Card border="secondary" style={{ width: "18rem" }}>
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
                <Form.Check type="radio" label="Cash On Delivery" />
                <Form.Check
                  disabled
                  type="radio"
                  label="UPI payments(comming soon)"
                />
                <br />
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <Button variant="success" onClick={() => setModalShow(true)}>
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
