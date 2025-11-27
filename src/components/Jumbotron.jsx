import "../styles/Jumbotron.css";
import { useState } from "react";

export default function Jumbotron() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("ricerca: " + query);
  };

  return (
    <section className="jumbo">
        <div className="content">
            <h1 className="title">confronta <span className="underline">tutto</span></h1>
            <p className="subtitle">
                Scegli tra la nostra gamma di prodotti
            </p>

            <form className="searchBox" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digita qui per confrontare"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Confronto</button>
            </form>
        </div>

        {/* --- waves SVG --- */}
        <svg
            className="wave opacity-low"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
        >
            <path d="M0 0 C50 0, 150 50, 200 50 S350 0, 400 10 L400 100 L0 100 Z" fill="white"></path>
        </svg>

        <svg
            className="wave opacity-low"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
        >
            <path d="M0 100 Q200 -50, 400 100 Z" fill="white"></path>
        </svg>

        <svg
            className="wave"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
        >
            <path d="M0 50 C50 110, 110 110, 200 50 S300 0, 400 90 L400 100 L0 100 Z" fill="white"></path>
        </svg>


    </section>
  );
}
