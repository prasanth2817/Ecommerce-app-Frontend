import React, { createContext, useState, useEffect } from 'react';

export const CartDataContext = createContext({ cartItem: [], setCartItem: () => {}});

function CartContext({ children }) {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    // Load cart data from local storage when the component mounts
    const existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      setCartItem(JSON.parse(existingCartItem));
    }
  }, []);

  return (
    <CartDataContext.Provider value={{ cartItem, setCartItem }}>
      {children}
    </CartDataContext.Provider>
  );
}

export default CartContext;

