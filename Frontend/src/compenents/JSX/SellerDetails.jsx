import "../CSS/SellerDetails.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SellerDetails() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onsubmit = async (form) => {
    const res = await fetch("https://coopmart-backend.onrender.com/sellerdetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    });

    const responsed = await res.json()
    if (responsed.success == true) {
      navigate('/seller')
    }
  };
  return (
    <div className="details-page">
      <div className="details-card">
        <h1 className="details-title">Seller Details</h1>
        <p className="details-subtitle">
          Please fill in your information to continue
        </p>

        <form className="details-form" onSubmit={handleSubmit(onsubmit)} >

          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              name="upid"
              placeholder="Enter your UPI ID"
              {...register("upid", {
                required: { value: true, message: "This field is required" }
              })}
            />
          </div>
          {errors.upid && <div id="makerror">{errors.upid.message}</div>}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number linked with UPI apps"
              {...register("phone", {
                required: { value: true, message: "This field is required" }, minLength: { value: 10, message: "Invalid phone number" },
                maxLength: { value: 10, message: "Invalid phone number" }
              })}
            />
          </div>
          {errors.phone && <div id="makerror">{errors.phone.message}</div>}
          <button type="submit" className="submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div >
  );
}

export default SellerDetails