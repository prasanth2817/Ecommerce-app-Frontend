import React from 'react'
import { createContext,useState,useEffect } from 'react'

export const CartDataContext = createContext({ cartItem: [], setCartItem: () => {} });
function CartContext({children}){

let[cartItem,setCartItem]=useState([]);

useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCartItem(JSON.parse(existingCartItem));
  }, []);

  return <CartDataContext.Provider value={{cartItem,setCartItem}}>
    {children}
 </CartDataContext.Provider>
}
export default CartContext