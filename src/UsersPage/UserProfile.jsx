import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { CartDataContext } from '../Context/CartContext';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const { cartItem } = useContext(CartDataContext);
  let navigate= useNavigate();

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

  return (
    <div className='container'>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.firstName} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <h2>My Orders</h2>
      {cartItem ? (
        <div>
          {cartItem.map((order, index) => (
            <div key={index}>
              <p>Order {index + 1}: {order.name} - Rs. {order.price}</p>
             <p>Size : {order.size}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Fetching Order details...</p>
      )}
    </div>
  );
}

export default UserProfile;
