import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Jumbotron from "../components/Jumbotron";
import CompareList from "../components/CompareList";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const { products, getProductDetails } = useContext(GlobalContext);

    const [randomProducts, setRandomProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (!products.length){
            return;
        }

        // 4 random products
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        const selectedRandom = shuffled.slice(0, 4);

        // 4 latest products
        const sortedByDate = [...products].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const selectedLatest = sortedByDate.slice(0, 4);

        // one array with both 
        const selectedIds = [...new Set([...selectedRandom, ...selectedLatest].map(p => p.id))];

        Promise.all(selectedIds.map(id => getProductDetails(id)))
            .then(fetchedDetails => {

                // get full product detail
                const detailsMap = {};
                fetchedDetails.forEach(detail => {
                    detailsMap[detail.id] = detail;
                });

                // split rando and latest
                setRandomProducts(selectedRandom.map(p => detailsMap[p.id]));
                setLatestProducts(selectedLatest.map(p => detailsMap[p.id]));
            });

    }, [products]);

    // chose card based on product category
    const renderProductCard = (product) => {
        if (!product){
            return null
        };

        return <ProductCard product={product} key={product.id} />;
    };

    return (
        <>
            <Jumbotron />

            {/* section intro*/}
            <section className="container mb-5">
                <div className="row text-center">
                    <div className="col-12 col-md-4 border-top border-bottom py-3">
                        <h3 className="text-primary mb-2">
                            <i className="fa-solid fa-magnifying-glass me-1"></i>Cerca
                        </h3>
                        <p>Cerca tra i nostro prodotti quelli che ti interessano</p>
                    </div>
                    <div className="col-12 col-md-4 border-top border-bottom py-3">
                        <h3 className="text-primary mb-2">
                            <i className="fa-solid fa-square-check me-1"></i>Scegli
                        </h3>
                        <p>Scegli i prodotti che vuoi confrontare</p>
                    </div>
                    <div className="col-12 col-md-4 border-top border-bottom py-3">
                        <h3 className="text-primary mb-2">
                            <i className="fa-regular fa-object-ungroup me-1"></i>Confronta
                        </h3>
                        <p>Scopri qual è il miglior prodotto da noi valutato</p>
                    </div>
                </div>
            </section>

            {/*random products*/}
            <section className="container mb-5" id="random-products">
                <h3 className="text-primary py-1 mb-3">Lasciati sorprendere </h3>
                <div className="row">
                    {randomProducts.map(renderProductCard)}
                </div>
            </section>

            {/*latest products*/}
            <section className="container" id="latest-product">
                <h3 className="text-primary py-1 mb-3">Ultimi Arrivi</h3>
                <div className="row">
                    {latestProducts.map(renderProductCard)}
                </div>
            </section>

            <CompareList></CompareList>
        </>
    );
}
