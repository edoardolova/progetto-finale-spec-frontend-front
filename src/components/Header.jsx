import { useEffect, useState } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
<nav
    className={
        "navbar navbar-expand-lg fixed-top " +
        (isScrolled ? "navbar-dark bg-dark shadow-sm" : "navbar-dark bg-transparent")
    }
>
    <div className="container fs-5">
        <a className="navbar-brand fs-2 fw-semibold" href="#">Metricly</a>

        <button 
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#">About us</a>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        Categorie
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">E-reader</a></li>
                        <li><a className="dropdown-item" href="#">Altra categoria</a></li>
                        <li><a className="dropdown-item" href="#">Altra categoria</a></li>
                    </ul>
                </li>

                <li className="nav-item d-lg-none">
                    <a className="nav-link" href="#"><i className="fa-solid fa-heart"></i></a>
                </li>
            </ul>

            <ul className="navbar-nav  d-none d-lg-flex">
                <li className="nav-item">
                    <a className="nav-link fs-3" href="#"><i className="fa-solid fa-heart"></i></a>
                </li>
            </ul>
        </div>
    </div>
</nav>

    );
}
