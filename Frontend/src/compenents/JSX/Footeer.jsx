import { Link } from "react-router-dom";
import "../CSS/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-section">
          <h3>CoopMart</h3>
          <p>The Best Dresses for your wedding,parties and more...</p>
        </div>

        {/* CENTER */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/ordered">Ordered</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@CoopMart.com</p>
          <p>Phone: +44 123 456 789</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} WorldClass — All Rights Reserved.
      </div>
    </footer>
  );
}
