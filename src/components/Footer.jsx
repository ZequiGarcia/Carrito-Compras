import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer(){
    const {filters} = useFilters();
    const {cart} = useCart();


    return(
        <footer className="footer">
            
            <h4><span>Wilmer Garcia</span></h4>
            <h5>©Tienda Espacial</h5>
        </footer>
    )
}

