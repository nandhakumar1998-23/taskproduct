import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const updateQuantity = (id, qty) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const checkout = () => {
    navigate("/checkout");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
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
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            {item.image && (
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
            )}
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
              />
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="cart-footer">
          <h2>Total: ${total}</h2>
          {cart.length > 0 && (
            <button className="checkout-btn" onClick={checkout}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
