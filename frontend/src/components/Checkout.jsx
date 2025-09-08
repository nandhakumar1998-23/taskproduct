import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // CSS for checkout styling

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
  let token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!token) {
    alert("You must log in first!");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/orders/",
      { items: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert(response.data.message);
    localStorage.removeItem("cart");
    navigate("/");
  } catch (err) {
    if (err.response?.status === 401 && refreshToken) {
      // Try refreshing access token
      try {
        const refreshRes = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh: refreshToken,
        });
        token = refreshRes.data.access;
        localStorage.setItem("access_token", token);

        // Retry order
        return placeOrder();
      } catch (refreshErr) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    } else {
      console.error("Order error:", err.response?.data || err.message);
      alert("Failed to place order: " + JSON.stringify(err.response?.data));
    }
  }
};


  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Cart is empty
      </h2>
    );
  }

  return (
    <>
      <div
        style={{
          height: "40vh",
          width: "100%",
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
        <h1>Checkout</h1>
      </div>

      {/* Checkout Items */}
      <div className="checkout-container">
        {cart.map((item) => (
          <div className="checkout-item" key={item.id}>
            <div className="checkout-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="checkout-item-info">
              <h3>{item.name}</h3>
              <p>
                ${item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}

        <div className="checkout-footer">
          <h2>Total: ${total}</h2>
          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;