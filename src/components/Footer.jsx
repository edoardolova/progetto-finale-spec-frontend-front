export default function Footer() {
    return (
        <>
            <footer className="bg-black py-5 mt-5 text-white">
                <div className="container">
                    <div className="row gy-4">

                        {/* contattaci */}
                        <div className="col-lg-3 col-6">
                            <h5 className="text-secondary mb-3">CONTATTACI</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="nav-link">Suggerisci un prodotto</a></li>
                                <li><a href="#" className="nav-link">Collabora con noi</a></li>
                            </ul>
                        </div>

                        {/* metricly */}
                        <div className="col-lg-3 col-6">
                            <h5 className="text-secondary mb-3">METRICLY</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="nav-link">About us</a></li>
                                <li><a href="#" className="nav-link">Criteri di valutazione</a></li>
                            </ul>
                        </div>

                        {/* link utili */}
                        <div className="col-lg-3 col-6">
                            <h5 className="text-secondary mb-3">LINKS UTILI</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="nav-link">Blog</a></li>
                                <li><a href="#" className="nav-link">Servizi Business</a></li>
                            </ul>
                        </div>

                        {/* note legali */}
                        <div className="col-lg-3 col-6">
                            <h5 className="text-secondary mb-3">NOTE LEGALI</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="nav-link">Privacy</a></li>
                                <li><a href="#" className="nav-link">Termini</a></li>
                                <li><a href="#" className="nav-link">Cookie</a></li>
                            </ul>
                        </div>

                        {/* social*/}
                        <div className="col-12 text-center pt-4 mt-3 border-top border-secondary">
                            <h3 className="fw-bold fs-3 mb-3">METRICLY</h3>
                            <div className="d-flex justify-content-center gap-4">
                                <a href="#" className="nav-link"><i className="fa-brands fa-youtube fs-4"></i></a>
                                <a href="#" className="nav-link"><i className="fa-brands fa-tiktok fs-4"></i></a>
                                <a href="#" className="nav-link"><i className="fa-brands fa-instagram fs-4"></i></a>
                                <a href="#" className="nav-link"><i className="fa-brands fa-x-twitter fs-4"></i></a>
                                <a href="#" className="nav-link"><i className="fa-brands fa-whatsapp fs-4"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
