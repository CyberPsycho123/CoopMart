import React, { useState, useEffect } from "react";
import "../CSS/Ordered.css";
import { useNavigate } from "react-router-dom";

const Ordered = () => {
  const navigate = useNavigate()
  const [orders,setorder] = useState([])
  useEffect(() => {
    async function read() {
      let reading = await fetch("https://coopmart-backend.onrender.com/read", { method: "POST", credentials: "include" })
      let reads = await reading.json()
      if (reads.bool == true) {
        navigate("/ordered")
      }
      else {
        navigate("/login")
      }
    }
    async function saveorder() {
      let saving = await fetch("https://coopmart-backend.onrender.com/saveorder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      )

      let saved=await saving.json()
      if (saved.success == true){
        setorder(saved.detail)
      }
    }
    read()
    saveorder()
  }, [])
  const [search, setSearch] = useState("");

  const filtered = [...orders].reverse().filter((item) =>
    item.prod_title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="ordered-container">
      <h2 className="ordered-title">Ordered Items</h2>

      <div className="ordered-top">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="item-count">
          {filtered.length} Item(s)
        </div>
      </div>

      <div className="ordered-header">
        <span>Order</span>
        <span>Price</span>
        <span>Qty</span>
      </div>

      <div className="ordered-list">
        {filtered.map((item) => (
          <div className="ordered-item" key={item._id}>
            <div className="ordered-left">
              <img src={item.prod_img} alt={item.prod_title} />

              <div className="details">
                <h3>{item.prod_title}</h3>
              </div>
            </div>

            <div className="ordered-price">
              {item.delivary_method === "Cash on delivary" ? item.price:<del>{item.price}</del>}
            </div>

            <div className="ordered-qty">
              {item.prod_quantity}
            </div>
          </div>
        ))}
        {filtered.length<2 && <div className="order-height"></div>}
      </div>
    </section>
  );
};

export default Ordered;
