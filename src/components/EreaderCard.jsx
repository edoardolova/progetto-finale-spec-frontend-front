import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function EreaderCard({ereader}){
    const {addCompareProduct} = useContext(GlobalContext)
    if (!ereader || !ereader.properties) {
        return null; 
    }
    const getProp = (key) => ereader.properties.find((p) => p.key === key)?.value;
    return(
        <>
            <div className="col-lg-6 col-12 d-flex">
                <div class="card mb-3 pt-3 p-3 position-relative" >
                    <button className="btn-add" onClick={()=>addCompareProduct(ereader)}>+</button>
                    <Link to={`/products/${ereader.id}`} style={{textDecoration:'none'}}>
                        <div class="row g-0">
                            <div class="col-4">
                                <img src={`/${ereader.image}`} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h6 class="card-title fw-bold">{ereader.title}</h6>
                                    <p class="card-text text-primary mb-3">{ereader.price}</p>
                                    <div className="d-flex">
                                        <p className=" text-secondary w-50"><i class="fa-solid fa-expand fs-5 "></i> <span className="ms-2">{getProp("screenSize")}" </span></p>
                                        <p className="ms-auto text-secondary w-50"><i class="fa-solid fa-database fs-5 "></i> <span className="ms-2">{getProp("internalStorageGb")} GB </span></p>
                                    </div>
                                    <div className="d-flex">
                                        <p className=" text-secondary w-50"><i class="fa-solid fa-weight-hanging fs-5 "></i> <span className="ms-2">{getProp("weightGr")} g </span></p>
                                        <p className="ms-auto text-secondary w-50"><i class="fa-solid fa-arrow-up-right-dots fs-5 "></i> <span className="ms-2">{getProp("ppi")} ppi </span></p>
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