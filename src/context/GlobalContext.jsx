import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]); 
  // cache products
  const [productById, setProductById] = useState({}); 

  const [categories, setCategories] = useState([]);

  const [compareProducts, setCompareProducts] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // save on ls 
  useEffect(()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },[favorites])

  // add to favorites
  function addFavorite(product){
    setFavorites(prev => {
      if (prev.some(prod => prod.id === product.id)) {
        return prev;
      }

      return [...prev, product];
    })
  }

  //remove favorite
  function removeFavorite(id){
    setFavorites(prev => prev.filter(prod => prod.id !== id));
  }

  // check if already favorite
  function isFavorite(id){
    return favorites.some(prod => prod.id === id);
  }

  
  useEffect(()=>{
    fetch("http://localhost:3001/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  },[])

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

  async function getProductsByTitle(title){
    const res = await fetch(`http://localhost:3001/products?search=${title}`);
    const json = await res.json();
    return json.slice(0,5);
  }

  function addCompareProduct(product){
    if(compareProducts.length >= 5) {
      return
    }

    setCompareProducts([...compareProducts, product])
  }

  const removeFromCompare = (id) => {
    setCompareProducts(prev => prev.filter(p => p.id !== id));
  };



  return (
    <GlobalContext.Provider
      value={{
        products,
        getProductsByCategory,
        getProductDetails,
        productById,
        categories,
        getProductsByTitle,
        compareProducts,
        addCompareProduct,
        removeFromCompare,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
