import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import ProductPlaceholder from "./Images/product-placeholder.jpeg";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const style = queryParams.get("style");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-app-qlsz.onrender.com/products?category=${category}&style=${style}`
        );
        setProducts(response.data.product);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, style]);

  if (loading) {
    return (
      <div>
        <h4>Please wait, it takes some time</h4>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    let errorMessage;
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMessage = `${error.response.data.message}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "Error: No response from server";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = `Error: ${error.message}`;
    }
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <div className="container products-text">
        Products({products.length} Items Found)
      </div>
      {products.length > 0 ? (
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <Card className="card-contents " style={{ width: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={
                      product.images?.[0]
                        ? `http://localhost:8000/Images/${product.images[0]}`
                        : ProductPlaceholder
                    }
                  />
                  <Card.Body className="products-text">
                  <Card.Title>{product.brand}</Card.Title>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Title>Rs. {product.price}</Card.Title>
                    <Link to={`/productInformation/${product._id}`}>
                      <Button variant="primary">Shop Now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
}

export default ProductPage;
