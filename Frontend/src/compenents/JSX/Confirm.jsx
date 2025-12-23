import { useNavigate } from "react-router-dom";
import "../CSS/Confirm.css";
import { useEffect, useState } from "react";

const Confirm = () => {
  const navigate = useNavigate();
  const [detail, setdetail] = useState([])
  const [price, setprice] = useState(0)

  useEffect(() => {
    async function CONFIRM() {
      let a = await fetch("https://coopmart-backend.onrender.com/readdetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        })
      let b = await a.json()
      if (b.success == true) {
        let c = b.detail
        setdetail(c)
      }
    }
    CONFIRM()

  }, [])


  useEffect(() => {
    async function prices() {
      let a = await fetch("https://coopmart-backend.onrender.com/last-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      )
      let b = await a.json()
      if (b.success == true) {
        let worth = b.order.price
        setprice(worth)
      }
    }
    prices()
  }, [])



  const handleEdit = () => {
    navigate("/edit");
  };

  const handleConfirm = () => {
    navigate("/payment");
  };


  return (
    <div className="confirm-container">
      <div className="confirm-card">
        <h1 className="confirm-title">Confirm Your Delivery Details</h1>

        <div className="detail-group">
          <strong>Full Name:</strong> <span className="detail-group-title">{detail[0]?.fullname}</span>
        </div>
        <div className="detail-group">
          <strong>Phone:</strong> <span className="detail-group-title">{detail[0]?.phone}</span>
        </div>
        <div className="detail-group">
          <strong>Address:</strong> <span className="detail-group-title">{detail[0]?.address}</span>
        </div>
        <div className="detail-group">
          <strong>City:</strong> <span className="detail-group-title">{detail[0]?.city}</span>
        </div>
        <div className="detail-group">
          <strong>Postal Code:</strong> <span className="detail-group-title">{detail[0]?.pincode}</span>
        </div>
        <div className="detail-group">
          <strong>Total Price:</strong> <span className="detail-group-title">₹{price}</span>
        </div>

        <div className="button-row">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <br />
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
