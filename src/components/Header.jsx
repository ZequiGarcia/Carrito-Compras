import { Filters } from "./Filters.jsx";

export function Header (){
    return(
        <header className="header">
            <h1>Space Store</h1>
            <Filters />
        </header>
    )
}