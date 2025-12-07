import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "../styles/comparePage.css";




export default function ComparePage() {
    const { ids } = useParams();
    const idsList = ids.split("-");

    const { getProductDetails } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);

    const headerRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);



    function checkProductsCategories(products){
        const firstCat = products[0].category;
        return products.every(prod => prod.category === firstCat)
        
    }
    function getCommonProperties(products) {
        if (!products.length) return [];

        const firstProps = products[0].properties.filter(p => p.relevant);

        return firstProps.filter(prop =>products.every(prod =>
                prod.properties.some(p => p.key === prop.key && p.relevant)
            )
        );
    }

    function convertBoolProp(val) {
        return typeof val === "boolean" ? (val ? "SI" : "NO") : val;
    }

    useEffect(() => {
        function checkOverflow() {
            if (!headerRef.current) return;
            const hasOverflow = headerRef.current.scrollWidth > headerRef.current.clientWidth;
            setIsOverflowing(hasOverflow);
        }

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [products]);

    useEffect(() => {
        async function load() {
            const details = await Promise.all(idsList.map(id => getProductDetails(id)));
            setProducts(details);
        }
        load();
    }, [ids]);



    if (!products.length) {
        return <p>LNessun prodotto selezionato...</p>;
    }

    const commonProps = getCommonProperties(products);
    const sameCategory = checkProductsCategories(products);


    return (
        <div className="compare-page-bg">
            {!sameCategory && (
                <div className="container">
                    <div className="alert alert-warning text-center fw-semibold my-5">
                        Stai facendo un confronto tra categorie diverse, il che potrebbe dare risultati inaspettati.
                    </div>

                </div>
            )}
            {/*product image and name*/}
            <div
                className={`compare-header ${isOverflowing ? "overflowing" : "centered"}`}
                ref={headerRef}
            >
            {products.map((p) => (
                <div className="compare-header-card" key={p.id}>
                    <div className="image-wrapper">
                        <img src={`/${p.image}`} alt={p.title} />
                        <span className="price-tag">{p.price}</span>
                    </div>
                    <h3 className="product-title">{p.title}</h3>
                </div>
            ))}
            </div>


            {/* table with properties*/}
            <div className="table-wrapper">
                <table className="compare-table">
                <thead>
                    <tr>
                    <th className="prop-col">Caratteristiche</th>
                    {products.map(p => (
                        <th key={p.id}>{p.title}</th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                    {commonProps.map((prop) => (
                    <tr key={prop.key}>
                        <td className="prop-name">{prop.label}</td>

                        {products.map(p => {
                        const value = p.properties.find(pr => pr.key === prop.key)?.value;
                        return (
                            <td key={p.id} className="prop-value">
                            {convertBoolProp(value)}
                            </td>
                        );
                        })}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

    );
}

