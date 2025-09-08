import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../App.css";
import Footer from "./Footer"

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <h1 style={{marginLeft: '20px'}}>Product List</h1>
      <div className="product-container">
        
        {products.map(product => (
          <div key={product.id} className="product-card">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
              />
            )}
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/products/${product.id}`}>View</Link>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default Home;
