import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { useCart } from '../hooks/useCart.jsx'
 
export function Products({products}) {

    const { addToCart, cart, removeFromCart } = useCart();

    const checkProductInCart = product => {
        return cart.some((item) => item.id === product.id);
    }

    return(
        <main className="products">
            <ul>
            {
                products.slice(0, 21).map((product)=> {

                    const isProductInCart = checkProductInCart(product);

                    return(
                        <li key={product.id}>
                            <img src={product.thumbnail} alt={product.title} />
                            <div className='center'>
                                <strong>{product.title} <hr /> ${product.price}</strong>
                            </div>
                            <div className='button'>
                                <button 
                                style={{backgroundColor: isProductInCart ? '#fc4646' : '#3e8107'}}
                                onClick={ () => { isProductInCart ? removeFromCart(product) : addToCart(product)} }>
                                    {
                                        isProductInCart ? <RemoveFromCartIcon/> : <AddToCartIcon />
                                    }
                                </button>
                            </div>
                        </li>
                    );//fin retorno
                } )//Fin mapeo
            }
            </ul>
        </main>
    )
}