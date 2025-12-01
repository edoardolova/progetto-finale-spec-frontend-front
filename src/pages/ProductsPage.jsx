import { useContext, useState, useEffect, useMemo } from "react";
import Filters from "../components/Filters";
import Jumbotron from "../components/Jumbotron";
import { GlobalContext } from "../context/GlobalContext";
import EreaderCard from "../components/EreaderCard";

export default function ProductsPage() {
    const { products, getProductDetails } = useContext(GlobalContext);

    const [sort, setSort] = useState("name-asc");
    const [priceRange, setPriceRange] = useState([0, 2000]); 
    const [detailedProducts, setDetailedProducts] = useState([]);

    // price parser
    function parsePrice(priceString) {
        if (!priceString) return 0;
        return Number(priceString.replace("€", "").replace(",", ".").replace(/\s/g, ""));
    }

    // load detail
    useEffect(() => {
        async function loadDetails() {
            const details = await Promise.all(
                products.map(p => getProductDetails(p.id))
            );
            setDetailedProducts(details);
        }

        if (products.length > 0) loadDetails();
    }, [products, getProductDetails]);


    // filter e order
    const filteredProducts = useMemo(() => {
        if (detailedProducts.length === 0) return [];

        let result = detailedProducts.filter(p => {
            const price = parsePrice(p.price); 
            return price >= priceRange[0] && price <= priceRange[1];
        });

        result = [...result]; 

        switch (sort) {
            case "name-asc":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "name-desc":
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "cat-asc":
                result.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case "cat-desc":
                result.sort((a, b) => b.category.localeCompare(a.category));
                break;
            case "recent":
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "old":
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
        }

        return result;
    }, [sort, priceRange, detailedProducts]);


    return (
        <>
            <Jumbotron />

            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Filters
                            sort={sort}
                            onSortChange={setSort}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </div>

                    <div className="col-9">

                        {filteredProducts.length === 0 && (
                            <p className="fs-3 fw-semibold">Nessun prodotto trovato...</p>
                        )}

                        <div className="row">
                            {filteredProducts.map(product => (
                                <EreaderCard ereader={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
