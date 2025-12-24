import "../CSS/SellerStart.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SellerStart() {
  const navigate = useNavigate()
  const validate_seller = async () => {
    const res = await fetch("https://coopmart-backend.onrender.com/validateseller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const responsed = await res.json()
    if (responsed.email_sucess == true) {
      if (responsed.success == true) {
        navigate("/seller")
      }
      else {
        navigate("/sellerstart")
      }
    }
    else {
      navigate("/login")
    }
  }


  useEffect(() => {
    async function validate() {
      await validate_seller()
    }
    validate()

  }, [])

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

        <button className="start-btn" onClick={() => navigate('/sellerterms')}>
          Get Started
        </button>
      </div>
    </div>
  );
}


export default SellerStart
