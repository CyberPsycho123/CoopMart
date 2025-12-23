import "../CSS/SellerStart.css"
import { useNavigate } from "react-router-dom";

function SellerStart() {
  const navigate=useNavigate()
  return (
    <div className="seller-page">
      <div className="glass-card">
        <h1 className="title">
          Do you want to start as a <span>Seller</span>?
        </h1>

        <p className="subtitle">
          Join our platform and grow your business with powerful tools,
          global reach, and seamless management.
        </p>

        <button className="start-btn" onClick={()=>navigate('/sellerterms')}>
          Get Started
        </button>
      </div>
    </div>
  );
}


export default SellerStart
