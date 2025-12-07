import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function ProductCard({product}){
    const {addCompareProduct, addFavorite, removeFavorite, isFavorite} = useContext(GlobalContext);

    const isFav = isFavorite(product.id);

    if (!product || !product.properties) {
        return null; 
    }
    const cardProps = product.properties.filter(prop => prop.showInCard);
    return(
        <>
            <div className="col-lg-6 col-12 d-flex">
                <div class="card mb-3 pt-3 p-3 position-relative" >
                        <div className="card-header-area position-relative">
                            <button 
                                className={`btn-fav ${isFav ? 'text-danger' : 'text-secondary'}`} 
                                onClick={() => isFav ? removeFavorite(product.id) : addFavorite(product)}
                            >
                                <i className="fa-solid fa-heart"></i>
                            </button>
                            <button className="btn-add" onClick={()=>addCompareProduct(product)}>+</button>
                        </div>
                    <Link to={`/products/${product.id}`} style={{textDecoration:'none'}}>
                        <div class="row g-0">
                            <div class="col-4 align-items-center d-flex">
                                <img src={`/${product.image}`} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h6 class="card-title fw-bold">{product.title}</h6>
                                    <p class="card-text text-primary mb-3">{product.price}</p>
                                    <div className="row">
                                        {cardProps.map(prop =>{
                                            return(
                                                <div className="col-auto">
                                                    <p className="text-secondary">
                                                        <i className={`${prop.iconName} fs-5`}></i>
                                                        <span className="ms-2"> {prop.value}</span>
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    
                    </Link>
                </div>
            </div>
        
        </>
    )
}