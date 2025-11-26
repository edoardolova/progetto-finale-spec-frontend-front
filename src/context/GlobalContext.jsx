import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]); 
  // cache products
  const [productById, setProductById] = useState({}); 

  // get all products
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // get product details by id
  async function getProductDetails(id) {
    // cache client, stop fetch
    if (productById[id]) {
        return productById[id]
    };

    const res = await fetch(`http://localhost:3001/products/${id}`);
    const json = await res.json();

    setProductById(prev => ({ ...prev, [id]: json.product }));

    return json.product;
  }

  // category filter
  function getProductsByCategory(cat) {
    return products.filter(p => p.category === cat);
  }

  return (
    <GlobalContext.Provider
      value={{
        products,
        getProductsByCategory,
        getProductDetails,
        productById
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
