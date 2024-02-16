import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

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
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
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
                    src={`https://e-commerce-app-qlsz.onrender.com/Images/${product.image}`}
                  />
                  <Card.Body>
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
