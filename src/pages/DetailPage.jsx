import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import '../styles/DetailPage.css'

export default function DetailPage() {
    const { id } = useParams();
    const { getProductDetails } = useContext(GlobalContext);
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function loadDetails() {
            const details = await getProductDetails(id);
            setProduct(details);
        }
        loadDetails();
    }, [id]);

    function convertBoolProp(propVal) {
        if (typeof propVal !== "boolean") {
            return propVal;
        }
        return propVal ? "SI" : "NO";
    }

  return (
        <div className="detail-page-bg">
            <div className="detail-container ">
                <h1 className="detail-title">{product.title}</h1>

                <div className="detail-image-wrapper">
                    <div className="image-box">
                        <img src={`/${product.image}`} className="detail-image" alt="" />
                        <span className="detail-price">{product.price}</span>
                    </div>
                </div>


                <div className="detail-properties">
                    {product.properties?.map((prop, index) => (
                    <div className="property-card" style={{ animationDelay: `${index * 0.15}s` }} key={index}>
                        <h3 className="property-label">{prop.label}</h3>
                        <p className="property-value">{convertBoolProp(prop.value)}</p>
                    </div>
                    ))}
                </div>
            </div>

        </div>
  );
}
