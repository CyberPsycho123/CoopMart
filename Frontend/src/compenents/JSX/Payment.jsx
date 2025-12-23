import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");
  const [order, setorder] = useState({})


  const delivar = async (method_del) => {
    const updatedOrder = { ...order, method: method_del };
    setorder(updatedOrder);
    let res = await fetch("https://coopmart-backend.onrender.com/delivary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedOrder)
    });
  }

  useEffect(() => {
    const lastorder = async () => {
      let a = await fetch("https://coopmart-backend.onrender.com/last-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      let b = await a.json();

      if (b.success === true) {
        setorder(b.order);
      }
    };

    lastorder();
  }, []);




  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Razorpay Checkout
  const openRazorpay = async () => {
    const prices = order.price
    const new_price = prices * 100
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_BjtfJjgs9EOJhD", // replace with your real key
      amount: new_price, // 500 = ₹500
      currency: "INR",
      name: "My Shop",
      description: "UPI Payment",
      theme: { color: "#0d47a1" },
      handler: function (response) {
        delivar("UPI method")
        navigate("/confirmed");
      },
    };

    const payment = new window.Razorpay(options);
    payment.open();
  };

  return (
    <section className="container">
      <section className="payment-container">
        <h2 className="payment-title">Select Payment Method</h2>

        <div className="payment-options">

          <label className={`option-card ${method === "upi" ? "selected" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={() => setMethod("upi")}
            />
            <span className="option-text">UPI Payment</span>
          </label>

          <label className={`option-card ${method === "cod" ? "selected" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={() => setMethod("cod")}
            />
            <span className="option-text">Cash on Delivery</span>
          </label>
        </div>

        {method && (
          <button
            className="confirm-btn"
            onClick={() => {
              if (method === "cod") {
                delivar("Cash on delivary")
                navigate("/ordered");
              } else {
                openRazorpay();
              }
            }}
          >
            Confirm Payment
          </button>
        )}
      </section>
    </section>
  );
};

export default Payment;
