import React, { useState, useEffect } from "react";

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductSearch: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products); 
        } else {
          console.error("Invalid JSON format: expected an array under 'products'", data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setProducts([]);
      });
  }, []);
  
  
  

  const handleSearch = () => {
    console.log("Products state:", products);
    if (!Array.isArray(products)) {
      console.error("Products is not an array!", products);
      setError("Error: Products data is corrupted.");
      return;
    }
  
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    console.log("Search results:", results);
    setFilteredProducts(results);
    setError(results.length > 0 ? "" : "No product found with the given name.");
  };

  return (
    <div className="product-card">
      <input
        type="text"
        className="search-section"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        
        onClick={handleSearch}
      >
        Search
      </button>
      {error && <p className="error">{error}</p>}
      <div className="results-section">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-details">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-info">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;