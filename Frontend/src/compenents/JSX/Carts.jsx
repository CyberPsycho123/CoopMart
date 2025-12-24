import { useNavigate } from "react-router-dom";
import "../CSS/Carts.css";
import { useEffect, useState,useContext } from "react";
import { CounterContext } from "../../Context/context";
export default function Carts() {
  const navigate = useNavigate();
  const value=useContext(CounterContext)
  const [Cart_items, setcart] = useState([])
  const [Cart_price, setprice] = useState(0)
  const [len, setlen] = useState(0)
  const [reloads, setload] = useState(0)

  if (reloads == 0){
    navigate(0)
    setload(1)
  }

  async function Remove(index) {
    let item = await fetch("https://coopmart-backend.onrender.com/delcart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ index })
      })
    let items=await item.json()
    value.setcount(value.counter-1)
    if (items.success === true){
      navigate(0)
    }
  }

  async function Checkout() {
    const res=await fetch("https://coopmart-backend.onrender.com/check",{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body:JSON.stringify({Cart_price})
    })
    const response=await res.json()
    if (response.success == true){
      navigate('/info')
    }

  }

  useEffect(() => {
    async function loaded() {
      let cart_item = await fetch("https://coopmart-backend.onrender.com/loaded", { method: "POST", credentials: "include" })
      let cart_items = await cart_item.json()
      let cart_main = cart_items.carts
      setlen(cart_items.len)
      setcart(cart_main)
      setprice(cart_items.price)
    }

    async function read() {
      let reading = await fetch("https://coopmart-backend.onrender.com/read", { method: "POST", credentials: "include" })
      let reads = await reading.json()
      if (reads.bool == true) {
        navigate("/cart")
        loaded()
      }
      else {
        navigate("/login")
      }
    }
    read()
  }, [])
  return (
    <div className="cart-wrapper">
      <div className="cart-container">

        <div className="cart-left">
          <h2 className="cart-title">Shopping Cart</h2>
          <br/>
          <span className="items-count">{len} Items</span>

          <div className="cart-items">
            {[...Cart_items].reverse().map((items, index) => {
              return (
                <div className="cart-item">
                  <img src={items.image} />
                  <div className="item-info">
                    <h4>{items.title}</h4>
                    <button className="remove-btn" onClick={() => Remove(index)}>Remove</button>
                  </div>

                  <div className="qty">
                    <span style={{padding:'3px',textAlign:'center',border:'1px solid black',width:'60px'}}>{items.quantity}</span>
                  </div>

                  <div className="price">₹{items.price}</div>
                  <div className="total">₹{items.price}</div>
                </div>
              )
            })}


          </div>
        </div>

        {/* RIGHT — PAYMENT SUMMARY */}
        <div className="cart-right">
          <br/>
          <h3>Order Summary</h3>
          <br />
          <div className="summary-row total-row">
            <span>Total Cost</span>
            <br />
            <strong>₹{Cart_price}</strong>
          </div>
          <br />
          <br />
          <button className="checkout-btn" onClick={Checkout}>CHECKOUT</button>
        </div>

      </div>
    </div>
  );
}
