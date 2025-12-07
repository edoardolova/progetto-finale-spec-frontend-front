import { useContext, useState, useEffect, useMemo } from "react";
import Filters from "../components/Filters";
import Jumbotron from "../components/Jumbotron";
import { GlobalContext } from "../context/GlobalContext";
import CompareList from "../components/CompareList";
import ProductCard from "../components/ProductCard";
import OffcanvasFilters from "../components/OffcanvasFilters";

export default function ProductsPage() {
    const { products, getProductDetails } = useContext(GlobalContext);

    const [sort, setSort] = useState("name-asc");
    const [priceRange, setPriceRange] = useState([0, 2000]); 
    const [detailedProducts, setDetailedProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // state for desktop/mobile render
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

    // Listener resize
    useEffect(() => {
        function handleResize() {
            setIsDesktop(window.innerWidth >= 992);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Price parser
    function parsePrice(priceString) {
        if (!priceString) return 0;
        return Number(priceString.replace("€", "").replace(",", ".").replace(/\s/g, ""));
    }

    // Load products details
    useEffect(() => {
        async function loadDetails() {
            const details = await Promise.all(
                products.map(p => getProductDetails(p.id))
            );
            setDetailedProducts(details);
        }

        if (products.length > 0) loadDetails();
    }, [products, getProductDetails]);


    // Filtering & sorting
    const filteredProducts = useMemo(() => {
        if (detailedProducts.length === 0) return [];

        let result = detailedProducts.filter(p => {
            const price = parsePrice(p.price);
            const priceOK = price >= priceRange[0] && price <= priceRange[1];
            const categoryOK = selectedCategory ? p.category === selectedCategory : true;

            return priceOK && categoryOK;
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
    }, [sort, priceRange, detailedProducts, selectedCategory]);


    return (
        <>
            <Jumbotron />

            <div className="container">
                <div className="row">

                    {/* desktop filters */}
                    {isDesktop && (
                        <div className="col-lg-3 filters-sticky">
                            <Filters
                                sort={sort}
                                onSortChange={setSort}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>
                    )}

                    {/* products */}
                    <div className={isDesktop ? "col-lg-9" : "col-12"}>
                        {filteredProducts.length === 0 && (
                            <p className="fs-3 fw-semibold">Nessun prodotto trovato...</p>
                        )}

                        <div className="row">
                            {filteredProducts.map(product => (
                                <ProductCard product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CompareList />

            {/* mobile filters offcanvas */}
            {!isDesktop && (
                <OffcanvasFilters
                    sort={sort}
                    onSortChange={setSort}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            )}
        </>
    );
}
