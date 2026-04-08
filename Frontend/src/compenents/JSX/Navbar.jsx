import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import { useContext } from "react";
import { CounterContext } from "../../Context/context";
import config from "../../config";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const Counter = useContext(CounterContext);

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch(`${config.API_BASE_URL}/read`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.bool == true) {
        Counter.setprofile(true);
      } else {
        navigate("/login");
      }
    }

    async function load_cart() {
      const res = await fetch(`${config.API_BASE_URL}/loaded`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const response = await res.json();
      Counter.setcount(response.len);
    }

    checkLogin();
    load_cart();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home",     icon: "🏠", path: "/" },
    { label: "Shop",     icon: "🛍️", path: "/shop" },
    { label: "Ordered",  icon: "📦", path: "/ordered" },
    { label: "About Us", icon: "ℹ️",  path: "/about" },
    { label: "Seller",   icon: "🏪", path: "/sellerstart" },
  ];

  return (
    <>
      <nav className="navbar">
        {/* Left: Hamburger */}
        <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Center: Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          Coop<span>Mart</span>
        </div>

        {/* Right: Cart + Login / Profile */}
        <div className="navbar__actions">
          <button className="navbar__cart" onClick={() => navigate("/cart")} aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {Counter.counter > 0 && (
              <span className="navbar__cart-badge">{Counter.counter}</span>
            )}
          </button>

          {/* Profile OR Login */}
          {Counter.profile ? (
            <div className="profile-wrap" ref={dropdownRef}>
              <button
                className={`profile-btn ${dropdownOpen ? "profile-btn--active" : ""}`}
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="Profile menu"
              >
                {/* Avatar circle with person icon */}
                <span className="profile-avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                {/* Small chevron */}
                <span className={`profile-chevron ${dropdownOpen ? "profile-chevron--up" : ""}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {/* Dropdown */}
              <div className={`profile-dropdown ${dropdownOpen ? "profile-dropdown--open" : ""}`}>
                <div className="profile-dropdown__header">
                  <div className="profile-dropdown__avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="profile-dropdown__name">My Account</p>
                    <p className="profile-dropdown__sub">Logged in</p>
                  </div>
                </div>
                <div className="profile-dropdown__divider" />
                <button
                  className="profile-dropdown__item profile-dropdown__item--danger"
                  onClick={() => { setDropdownOpen(false); navigate("/logout"); }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button className="navbar__login" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Overlay */}
      <div className={`overlay ${open ? "active" : ""}`} onClick={() => setOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo">Coop<span>Mart</span></div>
          <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="sidebar__nav">
          {navLinks.map((link, i) => (
            <li
              key={link.path}
              className="sidebar__item"
              style={{ "--i": i }}
              onClick={() => { navigate(link.path); setOpen(false); }}
            >
              <span className="sidebar__item-icon">{link.icon}</span>
              <span className="sidebar__item-label">{link.label}</span>
              <span className="sidebar__item-arrow">›</span>
            </li>
          ))}
        </ul>

        <div className="sidebar__footer">
          <button className="sidebar__cart-btn" onClick={() => { navigate("/cart"); setOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            View Cart
            {Counter.counter > 0 && (
              <span className="sidebar__cart-count">{Counter.counter}</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;