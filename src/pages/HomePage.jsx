import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Jumbotron from "../components/Jumbotron";

export default function HomePage() {
    const { getProductsByCategory, getProductDetails, products } = useContext(GlobalContext);
    const [ereaders, setEreaders] = useState([]);
    // get all ereaders with properties
    useEffect(() => {
        const ids = getProductsByCategory("ereader").map(prod => prod.id);

        Promise.all(ids.map(id => getProductDetails(id)))
        .then(data => {
            console.log(data)
            setEreaders(data)
        });
    }, [products]);

    return (
        <>
            <Jumbotron></Jumbotron>
            <div className="container">
                {ereaders.map(prod => (
                    <div key={prod.id}>
                    <strong> {prod.title} </strong> — 
                    <strong> {prod.category} </strong>
                    </div>
                ))}
            </div>
        </>
    );
}
