import React, { createContext, useState } from 'react';
import { PRODUCTS } from '../products';


export const ShopContext = createContext(null);

const getDefaultCart = () =>
{
    let cart = {}
    for (let i = 1; i< PRODUCTS.length + 1;i++)
    {
        cart[i]=0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const getTotal = () => 
    {
        let total = 0;
        for(let item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = PRODUCTS.find((product) => product.id ===Number(item));
                total+= cartItems[item] * itemInfo.price;
            }
        }
        return total.toFixed(2);
         
    }
    const addToCart = (itemid) => 
    {
        setCartItems((prev) => ({...prev, [itemid]: prev[itemid] + 1}));
    }

    const removeFromCart = (itemid) =>
    {
        setCartItems((prev) => ({...prev, [itemid]: prev[itemid] - 1}));
    }

    const updateCart = (nuevo, itemid) =>
    {
        setCartItems((prev) => ({...prev, [itemid]: nuevo}));
    }
    const contextValue = {cartItems, addToCart, removeFromCart, updateCart, getTotal};

    //console.log(cartItems);
    return (
      <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
  )
}

export default ShopContextProvider