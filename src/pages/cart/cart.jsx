import React, {useContext} from "react";
import { PRODUCTS } from "../../products";
import {Product} from "../shop/product";
import { CartItem } from "./cart-item";
import './cart.css'

import { ShopContext } from '../../context/shop-context';
import { useNavigate } from "react-router-dom"


export const Cart = () =>
{
    const {cartItems, getTotal} = useContext(ShopContext);
    const navigate = useNavigate();
    return (
    <div className="cart">
        <div>
            <h1>Your cart items</h1>
        </div>
        <div className="cartItems">
        {PRODUCTS.map((product)=> 
            {
                if(cartItems[product.id] !== 0)
                {
                    return <CartItem data={product}></CartItem>
                }
            }
        )}
        </div>
        {getTotal() > 0 ?

        (

        <div className="checkout">
            <p>Subtotal: ${getTotal()}</p>
            <button onClick={()=> navigate('/')}> Continue Shopping </button>
            <button> Checkout </button>
        </div>)

        : (<h2>Your cart is empty</h2>)}
    </div>
    )
}