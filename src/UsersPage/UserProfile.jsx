// import React, { useEffect, useState, useContext } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from "jwt-decode";
// import { CartDataContext } from '../Context/CartContext';

// function UserProfile() {
//   const [userData, setUserData] = useState(null);
//   const [orders,setOrders] = useState(null);
//   const [error, setError] = useState(null);
//   const { cartItem } = useContext(CartDataContext);
//   let navigate= useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       try {
//         const userDataFromToken = jwtDecode(token);
//         setUserData(userDataFromToken);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         // Handle error, maybe clear sessionStorage or log out the user
//       }
//     } else {
//       toast.error("please login to view profile")
//       navigate("/login")
//     }
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(
//         `https://e-commerce-app-qlsz.onrender.com/orders/getorders`
//       );
//       setOrders(response.data.product);
//       console.log(response.data);
//     } catch (error) {
//       setError(error);
//     }
//   };
//   fetchOrders();

//   return (
//     <div className='container'>
//       <h2>User Profile</h2>
//       {userData ? (
//         <div>
//           <p>Name: {userData.firstName} {userData.lastName}</p>
//           <p>Email: {userData.email}</p>
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//       <h2>My Orders</h2>
//       {orders ? (
//         <div>
//           {orders.map((order, index) => (
//             <div key={index}>
//               <p>Order {index + 1}: {order.name} - Rs. {order.price}</p>
//              <p>Size : {order.size}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Fetching Order details...</p>
//       )}
//     </div>
//   );
// }

// export default UserProfile;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CartDataContext } from '../Context/CartContext';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState(null);
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://e-commerce-app-qlsz.onrender.com/orders/getorders');
        setOrders(response.data); // Assuming response.data is an array of orders
      } catch (error) {
        setError(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
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
      {orders ? (
        <div>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index}>
                <p>Order {index + 1}: {order.name} - Rs. {order.price}</p>
                <p>Size : {order.size}</p>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      ) : (
        <p>Fetching Order details...</p>
      )}
      {error && <p>Error fetching orders: {error.message}</p>}
    </div>
  );
}

export default UserProfile;


