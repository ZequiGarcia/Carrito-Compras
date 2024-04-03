import { createContext, useReducer } from "react";


//1. Crear el contexto
export const CartContext = createContext();

//Modificar el estado inicial para guardar el del localstorage, o sea, lo que hy en el carrito
const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

//actualizar el LocalStorag con el state para el carrito
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action) => {
    const { type: actionType, payload: actionPayLoad } = action;

   switch (actionType) {
    case 'ADD_TO_CART':{
        const { id } = actionPayLoad
        //Varificar si el producto esta en el carrito
        const productInCartIndex = state.findIndex(item => item.id === id);

        // si si esta en el carrito
        if (productInCartIndex >= 0) {
            const newState = structuredClone(state);

            newState[productInCartIndex].quantity += 1;
            updateLocalStorage(newState);
            return newState;
        }  

        //si el producto no esta en el carrito
        const newState = [
            ...state,
            {
                ...actionPayLoad,
                quantity: 1
            }
        ]

        updateLocalStorage(newState);
        return newState;
    }
        case 'REMOVE_FROM_CART':{
            const {id} = actionPayLoad;
            const newState = state.filter(item => item.id != id);
            updateLocalStorage(newState);
            return newState;
        }

        case 'CLEAR_CART':{
            const newState = [];
            updateLocalStorage(newState)
            return newState;//se hace un reset
        }

        case 'REMOVE_TO_CART': {
            const { id } = actionPayLoad;
            // Verificar si el producto está en el carrito
            const productInCartIndex = state.findIndex(item => item.id === id);
        
            // Si el producto está en el carrito
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state);
        
                // Si la cantidad es mayor que 1, decrementarla
                if (newState[productInCartIndex].quantity > 1) {
                    newState[productInCartIndex].quantity -= 1;
                } else {
                    // Si la cantidad es 1, eliminar el producto del carrito
                    newState.splice(productInCartIndex, 1);
                }
        
                updateLocalStorage(newState);
                return newState;
            }
        }
        
   } 

   return state;
}

//2. Creamos el proveedor 
export function CartProvider ({ children }){

    const [state, dispatch ] = useReducer(reducer, initialState ); // indica que lo manejaremos como un array

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAR_CART'})

    const removeToCart = product => dispatch({
        type: 'REMOVE_TO_CART',
        payload: product
    })

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart,
            removeToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}