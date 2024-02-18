import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { useAuth } from "./Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CarouselImage from "./Components/CarouselImage";
import ProductPlaceholder from "./Images/product-placeholder.jpeg";

function ProductInformation() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const carouselInterval = 3000;

  const handleCart = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Please Login to Continue");
        navigate("/login"); // Navigate to login page if not logged in
        return; // Return to prevent further execution
      }
      // Fetch the existing cart items from local storage
      let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const isProductInCart = existingCart.some(
        (item) => item._id === product._id
      );

      // If the product is already in the cart, show a message and return
      if (isProductInCart) {
        alert("This product is already in your cart.");
        return;
      }
      // Add the product to the cart
      existingCart.push(product);

      // Update the cart in local storage
      localStorage.setItem("cart", JSON.stringify(existingCart));

      // Optionally, you can show a success message to the user
      alert("Product added to cart successfully.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Optionally, you can show an error message to the user
      alert("Error adding product to cart. Please try again later.");
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-app-qlsz.onrender.com/products/${id}`
        );
        setProduct(response.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error || !product) {
    return <div>Error: {error ? error.message : "Product not found"}</div>;
  }
  return (
    <div className="container products-text">
      <h1>{product.name}</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Carousel className="Container carosel" interval={carouselInterval}>
              <Carousel.Item>
                <CarouselImage
                  text="First slide"
                  imageUrl={
                    product.images?.[0]
                      ? `http://localhost:8000/Images/${product.images[0]}`
                      : ProductPlaceholder
                  }
                />
                <Carousel.Caption>
                  <h3></h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <CarouselImage
                  text="Second slide"
                  imageUrl={
                    product.images?.[1]
                      ? `http://localhost:8000/Images/${product.images[1]}`
                      : ProductPlaceholder
                  }
                />
                <Carousel.Caption>
                  <h3></h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <CarouselImage
                  text="Third slide"
                  imageUrl={
                    product.images?.[2]
                      ? `http://localhost:8000/Images/${product.images[2]}`
                      : ProductPlaceholder
                  }
                />
                <Carousel.Caption>
                  <h3></h3>
                  <p></p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6">
            <h2>Brand:</h2>
            <p>{product.brand}</p>
            <h2>Description:</h2>
            <p>{product.description}</p>
            <h2>Price:</h2>
            <p>Rs.{product.price}</p>
            <Button variant="dark" onClick={handleCart}>
              Add To Bag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
