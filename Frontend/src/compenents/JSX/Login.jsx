import { Link } from "react-router-dom";
import { useState } from "react";
import "../CSS/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [exist, setexist] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("https://coopmart-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data.bool == true) {
      navigate("/shop")
    }
    else {
      setexist(false)
      await delay(2)
      setexist(true)
    }
  }
  return (

    <div className="login-wrapper">
      <div className="login-box">

        <h2 className="title" style={{ color: "black" }}>Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
          </div>

          <a href="#" className="forgot">Forgot password?</a>
          {!exist && <p style={{ color: "red" }}>This account doesnt created !</p>}
          <button className="login-btn">Login</button>

          <p className="signup-text">
            Don’t have an account? <Link to='/signup'>Sign Up</Link>
          </p>

        </form>

      </div>
    </div>
  );
}
