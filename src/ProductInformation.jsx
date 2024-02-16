import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CarouselHome from './Components/CaroselHome';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

function ProductInformation() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCart = async () => {
    try {
      // Fetch the existing cart items from local storage
      let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the product is already in the cart
      const isProductInCart = existingCart.some(item => item._id === product._id);
  
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
      console.error('Error adding product to cart:', error);
      // Optionally, you can show an error message to the user
      alert("Error adding product to cart. Please try again later.");
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://e-commerce-app-qlsz.onrender.com/products/${id}`);
        setProduct(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
  }

  if (error || !product) {
    return <div>Error: {error ? error.message : 'Product not found'}</div>;
  }
  console.log(product.name);
  return (
    <div>
      <h1>{product.name}</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <CarouselHome images={product.images} />
          </div>
          <div className='col-md-6'>
            <h2>Description:</h2>
            <p>{product.description}</p>
            <h2>Price:</h2>
            <p>Rs.{product.price}</p>
            <Button variant='danger' onClick={handleCart}>Add To Bag</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
