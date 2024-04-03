import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";

// crear nuestro Custom Hook
export const useCart = () => {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error("useCart debe ser usado dentro de un CartProveedor");
    }

    return context;
}
