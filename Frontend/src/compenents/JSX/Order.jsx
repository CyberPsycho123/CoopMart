import "../CSS/Order.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CounterContext } from "../../Context/context";
import config from "../../config";

const Order = ({ Products }) => {
  const [qty, setqty] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const value = useContext(CounterContext);
  const index = params.orderitem;
  const [item, setitem] = useState(Products[0]);

  useEffect(() => {
    const foundItem = Products.find((product) => product.id == index);
    if (foundItem) setitem(foundItem);
  }, [index, Products]);

  const total_price = item.price * qty;

  const updated_cart = async () => {
    value.setcount((prev) => prev + 1);
    const formData = {
      image: item.image,
      title: item.title,
      quantity: qty,
      price: total_price,
    };
    const response = await fetch(`${config.API_BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    await response.json();
  };

  const updated_order = async () => {
    const formData = {
      image: item.image,
      title: item.title,
      quantity: qty,
      price: total_price,
    };
    const res = await fetch(`${config.API_BASE_URL}/ordered`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const ponse = await res.json();
    if (ponse.success == true) navigate("/info");
  };

  return (
    <section className="product-order">
      <div className="order-card">

        {/* ── Image Panel ── */}
        <div className="order-image-panel">
          <img src={item.image} alt={item.title} className="order-image" />
        </div>

        {/* ── Content Panel ── */}
        <div className="order-content">

          <span className="order-tag">🛒 Product Details</span>

          <h2 className="title" style={{fontFamily:'sans-serif'}}>{item.title}</h2>

          <div className="order-divider" />

          <p className="description">
            {item.desc || "Quality product from a local seller. Every purchase directly supports a small business and their family."}
          </p>

          {/* Price + Qty */}
          <div className="order-meta">
            <div className="price-block">
              <span className="price-label">Total Price</span>
              <div className="price-value">
                <span className="price-currency">₹</span>
                <span className="price">{total_price}</span>
              </div>
            </div>

            <div className="qty-block">
              <span className="qty-label">Quantity</span>
              <div className="qty-controls">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  onInput={(e) => { if (e.target.value <= 0) e.target.value = 1; }}
                  onChange={(e) => setqty(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button className="btn order-btn" onClick={updated_order}>
              ✅ Place Order
            </button>
            <button id="but2" className="btn order-btn" onClick={updated_cart}>
              🛒 Add to Cart
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Order;