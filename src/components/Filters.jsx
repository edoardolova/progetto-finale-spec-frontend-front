import Slider from "@mui/material/Slider";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";



export default function Filters({onSortChange, priceRange, setPriceRange, selectedCategory, setSelectedCategory}){
    const {categories} = useContext(GlobalContext)
    return(
        <>
            <h4>ORDINA PER</h4>
            <select 
                className="form-select form-select-lg mb-3 shadow" 
                aria-label="Large select example"
                onChange={(e)=> onSortChange(e.target.value)}
            >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="cat-asc">Categoria (A-Z)</option>
                <option value="cat-desc">Categoria (Z-A)</option>
                <option value="recent">Più recenti</option>
                <option value="old">Meno recenti</option>
            </select>

            <div className="border p-3 rounded shadow mb-3">
                <h4 className="mb-4">Prezzo</h4>
                <div className="container">
                    <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                        min={0}
                        max={2000}
                        valueLabelDisplay="auto"
                    />

                </div>
                <div className="d-flex">
                    <p>{priceRange[0]}€</p>
                    <p className="ms-auto">{priceRange[1]}€</p>
                </div>
            </div>
            <div className="border p-3 rounded shadow mb-3">
                <h5 className="mb-3"><i className="fa-solid fa-magnifying-glass me-2 text-primary"></i>Cerca categoria...</h5>
                {categories.map(category => (
                    <div className="form-check ms-2" key={category.id}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoryFilter"
                            id={`cat-${category.id}`}
                            value={category.category}
                            checked={selectedCategory === category.category}
                            onChange={() => setSelectedCategory(category.category)}
                        />
                        <label className="form-check-label" htmlFor={`cat-${category.id}`}>
                            {category.title}
                        </label>
                    </div>
                ))}

                <div className="form-check ms-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="categoryFilter"
                        id="cat-all"
                        value=""
                        checked={selectedCategory === null}
                        onChange={() => setSelectedCategory(null)}
                    />
                    <label className="form-check-label" htmlFor="cat-all">
                        Tutte le categorie
                    </label>
                </div>

            </div>



        </>
    )
}