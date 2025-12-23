import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../CSS/Signup.css";

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000)
    })
  }

  async function onsubmit(newdata) {
    const res = await fetch("https://coopmart-backend.onrender.com/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newdata)
    });

    if (newdata.password!=newdata.confirmpass){
      setError("confirmpass",{
        type:"manual",
        message:"password is not same"
      })
      return
    }
    else{
      await delay(2)
      alert("Account created!");
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="title" style={{ color: "black" }}>Create Account</h2>
        <p className="subtitle" style={{ color: "black" }}>Join us today! It's quick and easy.</p>

        <form className="signup-form" onSubmit={handleSubmit(onsubmit)}>

          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Create a username" {...register("username", {
              required: { value: true, message: "The field is required" },
              minLength: { value: 3, message: "The length of username is too short" }
            })} />
          </div>
          {errors.username && <div id="makerror">{errors.username.message}</div>}
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" name="email" {...register("email", {
              required: { value: true, message: "The field is required" },
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
            })} />
          </div>
          {errors.email && <div id="makerror">{errors.email.message}</div>}
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Create a paswword" {...register("password", {
              required: { value: true, message: "The field is required" },
              minLength: { value: 8, message: "The length of password is too short" }
            })} />
          </div>
          {errors.password && <div id="makerror">{errors.password.message}</div>}

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmpass" placeholder="Enter the same password" {...register("confirmpass", {
              required: { value: true, message: "The field is required" },
              minLength: { value: 8, message: "The length of password is too short" }
            })} />
          </div>
          {errors.confirmpass && <div id="makerror">{errors.confirmpass.message}</div>}

          <button disabled={isSubmitting} className="signup-btn">Sign Up</button>
          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
