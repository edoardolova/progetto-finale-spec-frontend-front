import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import '../styles/CompareList.css'

export default function CompareList() {
    const { compareProducts, removeFromCompare } = useContext(GlobalContext);

    if (compareProducts.length === 0) {
        return null;
    }

  return (
        <div className="compare-list-wrapper shadow-lg">
            <button
                className="compare-toggle-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseCompare"
                aria-expanded="false"
                aria-controls="collapseCompare"
            >
                {`Prodotti aggiunti: ${compareProducts.length}`}
            </button>

            <div className="collapse" id="collapseCompare">
                <ul className="compare-list">
                    {compareProducts.map((prod) => (
                        <li key={prod.id} className="compare-item">
                            <span className="compare-title">{prod.title}</span>
                            <button
                                className="compare-remove-btn"
                                onClick={() => removeFromCompare(prod.id)}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="btn btn-primary btn-rounded w-100">CONFRONTA</button>
            </div>
        </div>
  );
}
