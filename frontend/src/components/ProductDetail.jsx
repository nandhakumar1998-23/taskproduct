import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((item) => item.id === product.id);
    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
    navigate("/cart");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      {/* Hero Background Section */}
      <div
        style={{
          height: "40vh",
          width: "100%",
          backgroundImage:
            "url('http://localhost:3000/static/media/img2.aee4f3c….jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          background: "#000",
        }}
      >
        Product Details
      </div>

      {/* Product Detail Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          padding: "40px",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#f8f8f8",
        }}
      >
        {/* Product Image */}
        {product.image && (
          <div
            style={{
              flex: "1 1 300px",
              maxWidth: "400px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transition: "transform 0.5s ease, boxShadow 0.5s ease",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.5s ease",
              }}
            />
          </div>
        )}

        {/* Product Info */}
        <div style={{ flex: "1 1 300px", maxWidth: "500px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "15px", color: "#333" }}>
            {product.name}
          </h1>
          <p style={{ marginBottom: "15px", lineHeight: "1.6", color: "#555" }}>
            {product.description}
          </p>
          <p style={{ color: "#b50318", fontWeight: "bold", fontSize: "1.5rem" }}>
            ${product.price}
          </p>
          <button
            onClick={addToCart}
            style={{
              padding: "12px 25px",
              backgroundColor: "#b50318",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "transform 0.3s ease, boxShadow 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
