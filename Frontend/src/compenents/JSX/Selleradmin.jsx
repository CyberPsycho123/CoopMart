import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/shop.css';
import '../CSS/sellerTable.css';

const Selleradmin = () => {
  const [items, setitems] = useState([]);
  const [proditems, setproditems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();



  const delete_item = async (item) => {
    const res = await fetch("https://coopmart-backend.onrender.com/deleteitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item._id }),
      credentials: "include"
    })
    const data = await res.json()
    if (data.success == true) {
      navigate(0)
    }

  }


  const validate_seller = async () => {
    const res = await fetch("https://coopmart-backend.onrender.com/validateseller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const responsed = await res.json();

    if (responsed.email_sucess === true) {
      if (responsed.success === true) {
        navigate("/selleradmin");
      } else {
        navigate("/sellerdetails");
      }
    } else {
      navigate("/login");
    }
  };

  const admin_seller = async () => {
    const res = await fetch("https://coopmart-backend.onrender.com/selleradmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const response = await res.json();

    if (response.success === true) {
      setitems(response.items || []);
      setproditems(response.seller_items || []);
    }
  };

  async function check(item) {
    let executed=false
    if (executed){return}
    const interval = setInterval(async() => {
      const res = await fetch("https://coopmart-backend.onrender.com/checking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item._id }),
        credentials: "include"
      })
      const data = await res.json()
      if (data.success == true) {
        executed=true
        admin_seller()
        clearInterval(interval)
      }
    }, 300)

  }

  useEffect(() => {
    validate_seller();
    admin_seller();
  }, []);

  const searching = proditems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-container">
      {/* 🔍 Search Bar */}

      <div className="bar">
        <input
          type="text"
          className="searchbar"
          placeholder="Search the items here.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🟦 PRODUCT CARDS */}
      <section className="category-section">
        {searching.length > 0 && <h2>Your Items</h2>}
        {proditems.length < 1 && <div className='space'></div>}
        <div className="product-grid">
          {searching.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.title} />
              <h3 className="left">{item.title}</h3>
              <p className="left">₹{item.price}</p>
              <button className="buy-btn" onClick={async () => await delete_item(item)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
      <section className="seller-table-section">
        <h2>Ordered Items By Customers</h2>
        <br />
        <div className="table-wrapper">
          <table className="seller-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {[...items].reverse().map((item, index) => (
                <tr key={index}>
                  <td className="bold">{item.prod_title}</td>
                  <td>{item.fullname}</td>
                  <td>₹{item.price}</td>
                  <td>{item.prod_quantity}</td>
                  <td>{item.address || "General"}</td>
                  <td>
                    {item.pincode}
                  </td>
                  <td>
                    {item.city}
                  </td>
                  <td className='action' onClick={async () => await check(item)} style={{ color: "white", backgroundColor: item.action == "Checked" ? "green" : "red" }}>
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default Selleradmin;
