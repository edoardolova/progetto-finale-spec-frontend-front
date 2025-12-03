import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function FavoritesOffcanvas() {
    const { favorites, removeFavorite } = useContext(GlobalContext);

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="favoritesOffcanvas" aria-labelledby="favoritesOffcanvasLabel" >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="favoritesOffcanvasLabel"> I tuoi preferiti </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Chiudi"/>
            </div>

            <div className="offcanvas-body">
                {favorites.length === 0 ? (<p className="text-muted">Nessun preferito.</p>) : (
                    <ul className="list-group">
                        {favorites.map((prod) => (
                            <li key={prod.id} className="list-group-item d-flex align-items-center gap-3 mb-3 shadow" >
                                <img
                                    src={`/${prod.image}`}
                                    alt={prod.title}
                                    style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }}
                                />

                                    
                                <div className="flex-grow-1" data-bs-dismiss="offcanvas">
                                    <Link to={`/products/${prod.id}`} className="text-decoration-none text-dark fw-semibold" >
                                        {prod.title}
                                    </Link>
                                    <div className="text-primary small">{prod.price}</div>
                                </div>

                                <div>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeFavorite(prod.id)} aria-label={`Rimuovi ${prod.title} dai preferiti`} > ✖ </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
