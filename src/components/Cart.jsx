import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import './Cart.css'
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, title, price, quantity, addToCart, removeToCart}) {
    return(
        <li>
            <img src={ thumbnail } alt={title} />
            <div>
               <strong>{title} <hr /> ${price}</strong>
            </div>
            <footer>
                <button onClick={removeToCart} style={{background: "#fc4646"}}>-</button>
               <small>Qty : {quantity}</small>
               <button onClick={addToCart} style={{background: "#3e8107"}}>+</button>
            </footer>
        </li>
        
    )
}

export function Cart (){
    const cartCheckboxId = useId();

    const {cart, clearCart, addToCart, removeToCart } = useCart();
    
    const productosTotal = cart.reduce((total, product) => total + product.quantity
    , 0);

    const totalPagar = cart.reduce((total, product) => total +  product.price * product.quantity, 0)

    return(
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden/>

            <aside className="cart">
                <ul>
                    {
                        cart.map(product => (
                            <CartItem
                                key={product.id}
                                removeToCart={() => removeToCart(product)}
                                addToCart={() => addToCart(product)}
                                { ...product}
                            />
                        ))
                    }
                </ul>

                <p>Productos: {productosTotal}</p>
                <p>Total a pagar: ${totalPagar}</p>
                <button style={{backgroundColor: "#E36414"}} onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}