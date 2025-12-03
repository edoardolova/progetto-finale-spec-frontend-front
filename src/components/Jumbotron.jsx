import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import "../styles/Jumbotron.css";
import { useContext, useEffect, useState } from "react";

export default function Jumbotron() {
    const {getProductsByTitle, compareProducts, addCompareProduct} = useContext(GlobalContext)

    const [query, setQuery] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    useEffect(() => {
        async function fetchData() {
            if (!query) {
                setSearchedProducts([]);
                return;
            }

            const result = await getProductsByTitle(query);
            setSearchedProducts(result);
        }

        fetchData();
    }, [query]);

    function handleSuggestion(prod){
        addCompareProduct(prod)
        setQuery('')
    }

    return (
        <section className="jumbo">
            <div className="content">
                <h1 className="title">confronta <span className="underline">tutto</span></h1>
                <p className="subtitle">
                    Scegli tra la nostra gamma di prodotti
                </p>

                <form className="searchBox position-relative" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Digita qui per confrontare"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {compareProducts.length >0 && (

                        <Link style={{textDecoration:'none'}} to={compareProducts.length === 1 ? `/products/${compareProducts[0].id}` : `/products/${compareProducts[0].id}/${compareProducts[1].id}`}>
                            <button type="submit" className={compareProducts.length > 0 ? 'd-block' : 'd-none'} >Confronto</button>
                        
                        </Link>

                    )}
                    <div className="list-group position-absolute top-100" style={{width:'100%'}}>
                        {searchedProducts.map(product =>{
                            return(
                                <>
                                    <button onClick={()=> handleSuggestion(product)} type="button" className="list-group-item list-group-item-action" aria-current="true">
                                        {product.title}
                                    </button>
                                
                                </>
                            )
                        })}
                    </div>
                </form>

                
                
            </div>

            {/* --- waves SVG --- */}
            <svg
                className="wave opacity-low"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
            >
                <path d="M0 0 C50 0, 150 50, 200 50 S350 0, 400 10 L400 100 L0 100 Z" fill="white"></path>
            </svg>

            <svg
                className="wave opacity-low"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
            >
                <path d="M0 100 Q200 -50, 400 100 Z" fill="white"></path>
            </svg>

            <svg
                className="wave"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
            >
                <path d="M0 50 C50 110, 110 110, 200 50 S300 0, 400 90 L400 100 L0 100 Z" fill="white"></path>
            </svg>


        </section>
    );
}
