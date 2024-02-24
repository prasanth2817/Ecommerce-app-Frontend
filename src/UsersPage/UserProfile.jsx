import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CartDataContext } from '../Context/CartContext';
import AdminDashboard from '../Components/AdminDashboard';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { cartItem } = useContext(CartDataContext);
  const navigate = useNavigate();

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
      toast.error('Please login to view profile');
      navigate('/login');
    }
  }, [navigate]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const email = userData.email.replace(/"/g, '');
  //       const response = await axios.get(`https://e-commerce-app-qlsz.onrender.com/orders/getorders?email=${encodeURIComponent(email)}`);
  //       setOrders(response.data.orders);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };
  //   if (userData && userData.email) {
  //     fetchOrders();
  //   }
  // }, [userData]);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.firstName} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          {userData.role === 'admin' && <AdminDashboard />} {/* Render AdminDashboard if user role is admin */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {/* <h2>My Orders</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={index}>
              <p>Order {index + 1}: {order.name} - Rs. {order.price}</p>
              <p>Size : {order.size}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
      {error && <p>Error fetching orders: {error.message}</p>} */}
    </div>
  );
}

export default UserProfile;





