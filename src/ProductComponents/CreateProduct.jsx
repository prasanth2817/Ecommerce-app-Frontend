import React from 'react'
import { Formik} from 'formik'
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { useState } from 'react';
import axios from 'axios';
import {FormCheck } from "react-bootstrap";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    style: '',
    color: '',
    size: '',
    quantity: '',
    shipping: false,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/create`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success
      toast.success('Product created successfully');
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      toast.error('Error creating product');
    }
  };
  

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleUpload}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />
        <input type="text" name="style" placeholder="Style" value={formData.style} onChange={handleInputChange} />
        <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleInputChange} />
        <input type="text" name="size" placeholder="Size" value={formData.size} onChange={handleInputChange} />
        <input type="text" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} />
        <input type="checkbox" name="shipping" checked={formData.shipping} onChange={() => setFormData({ ...formData, shipping: !formData.shipping })} />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProduct;