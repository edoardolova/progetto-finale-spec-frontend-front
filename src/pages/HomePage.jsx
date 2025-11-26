import { useEffect, useState } from "react";

export default function HomePage(){
    const [productIDs, setProductIDs] = useState([]);
    const [ereaderIDs, setEreaderIDs] = useState([]);
    const [ereaders, setEreaders] = useState([]);



    // all products
    useEffect(() => {
        fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => {
            setProductIDs(data);
        });
    }, []);

    // get ereader ids
    useEffect(() => {
        if (productIDs.length > 0) {
            const onlyEreaderIDs = productIDs.filter(prod => prod.category === "ereader").map(prod => prod.id);

            setEreaderIDs(onlyEreaderIDs);
        }
    }, [productIDs]);

    useEffect(()=>{
        getProducts(ereaderIDs)
    },[ereaderIDs]);

    // get products with all properties 
    async function getProducts(ids){
        try{
            const responses = await Promise.all(ids.map(id => fetch(`http://localhost:3001/products/${id}`)));
            const json = await Promise.all(responses.map(res => res.json()));

            setEreaders(json.map(data => data.product));
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <>
            <div className="container">
                {ereaders.length > 0 && (ereaders.map(prod => (
                <div key={prod.id}>
                    <strong>{prod.title}</strong> — {prod.price}
                </div>
                )))}
            </div>
        </>
    );
}