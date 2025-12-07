import { useState } from "react";
import Filters from "./Filters";

export default function OffcanvasFilters({ 
    sort, 
    onSortChange, 
    priceRange, 
    setPriceRange,
    selectedCategory,
    setSelectedCategory
}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <button 
                className="btn btn-primary d-lg-none sticky-filters-btn"
                onClick={() => setShow(true)}
            >
                <i className="fa-solid fa-sliders"></i> Filtri
            </button>

            <div 
                className={`offcanvas offcanvas-start ${show ? "show" : ""}`} 
                style={{ visibility: show ? "visible" : "hidden", zIndex:"10000" }}
                tabIndex="-1"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Filtri</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShow(false)}
                    ></button>
                </div>

                <div className="offcanvas-body">
                    <Filters 
                        sort={sort}
                        onSortChange={onSortChange}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
            </div>

            {show && (
                <div 
                    className="offcanvas-backdrop fade show" 
                    onClick={() => setShow(false)}
                ></div>
            )}
        </>
    );
}
