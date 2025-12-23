import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import { useContext } from "react";
import { CounterContext } from "../../Context/context";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const Counter = useContext(CounterContext)
  useEffect(() => {
    async function load_cart() {
      const res = await fetch("https://coopmart-backend.onrender.com/loaded", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const response=await res.json()
      Counter.setcount(response.len)
    }
    load_cart()
  }, [])

  return (
    <>
      <nav className="navbar">
        <div className="menu-toggle" onClick={() => setOpen(true)}>☰</div>

        <div className="logo">
          Coop<span>Mart</span>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="close-btn" onClick={() => setOpen(false)}>✕</div>

        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/shop')}>Shop</li>
          <li onClick={() => navigate('/ordered')}>Ordered</li>
          <li onClick={() => navigate('/about')}>About Us</li>
          <li onClick={() => navigate('/cart')} >Cart({Counter.counter})</li>
          <li onClick={() => navigate('/sellerdetails')}>Seller</li>
          <li onClick={() => navigate('/logout')}>Logout</li>
        </ul>
      </aside>

      {/* Overlay */}
      <div className={`overlay ${open ? "active" : ""}`} onClick={() => setOpen(false)}></div>
    </>
  );
};

export default Navbar;
