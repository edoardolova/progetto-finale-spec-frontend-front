// src/components/Header.jsx
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import FavoritesOffcanvas from "./FavoritesOffcanvas"; // import

export default function Header() {
    const { favorites } = useContext(GlobalContext);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={ "navbar navbar-expand-lg fixed-top " + (isScrolled ? "navbar-dark bg-dark shadow-sm" : "navbar-dark bg-transparent") } >
                <div className="container fs-5">
                    <NavLink to="/" className="navbar-brand fs-2 fw-semibold">Metricly</NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/products" className="nav-link">Prodotti</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Categorie </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">E-reader</a></li>
                                    <li><a className="dropdown-item" href="#">Altro</a></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-none d-lg-flex">
                            <li className="nav-item me-2">
                                <button
                                    className="btn btn-outline-light position-relative"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#favoritesOffcanvas"
                                    aria-controls="favoritesOffcanvas"
                                >
                                    <i className="fa-solid fa-heart"></i> <span className="ms-2"> {favorites.length}</span>
                                </button>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-lg-none">
                            <li className="nav-item">
                                <button
                                    className="nav-link btn"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#favoritesOffcanvas"
                                    aria-controls="favoritesOffcanvas"
                                >
                                    <i className="fa-solid fa-heart"></i> <span className="ms-1"> {favorites.length}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <FavoritesOffcanvas />
        </>
    );
}
