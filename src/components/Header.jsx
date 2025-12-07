import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import FavoritesOffcanvas from "./FavoritesOffcanvas";

export default function Header() {
    const { favorites } = useContext(GlobalContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const navbarCollapse = document.getElementById("navbarNavDropdown");
        if (!navbarCollapse) return;

        const onShow = () => setIsOpen(true);
        const onHide = () => setIsOpen(false);

        navbarCollapse.addEventListener("show.bs.collapse", onShow);
        navbarCollapse.addEventListener("hide.bs.collapse", onHide);

        return () => {
            navbarCollapse.removeEventListener("show.bs.collapse", onShow);
            navbarCollapse.removeEventListener("hide.bs.collapse", onHide);
        };
    }, []);

    return (
        <>
            <nav className={"navbar navbar-expand-lg fixed-top " + ( isScrolled || isOpen ? "navbar-dark bg-dark shadow-sm" : "navbar-dark bg-transparent" )}>
                <div className="container fs-5">
                    <NavLink to="/" className="navbar-brand fs-2 fw-semibold">Metricly</NavLink>

                    <ul className="navbar-nav d-lg-none">
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-light position-relative"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#favoritesOffcanvas"
                                aria-controls="favoritesOffcanvas"
                            >
                                <i className="fa-solid fa-heart"></i> <span className="ms-1">{favorites.length}</span>
                            </button>
                        </li>
                    </ul>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products" className="nav-link">Prodotti</NavLink>
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
                                    <i className="fa-solid fa-heart"></i> <span className="ms-2">{favorites.length}</span>
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
