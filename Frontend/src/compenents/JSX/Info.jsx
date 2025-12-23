import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../CSS/Info.css"

const Info = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onsubmit = async (form) => {
    alert("Delivery details submitted successfully!");
    const res = await fetch("https://coopmart-backend.onrender.com/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    });

    const responsed = await res.json()
    if (responsed.success == true) {
      navigate('/confirm')
    }
  };

  useEffect(() => {
    async function rev() {
      const recive = await fetch("https://coopmart-backend.onrender.com/readdetail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        })
      const recived = await recive.json()
      if (recived.success == true) {
        navigate('/confirm')
      }
      else {
        navigate('/info')
      }
    }
    rev()

  }, [])


  return (
    <div className="delivery-container">
      <form className="delivery-form" onSubmit={handleSubmit(onsubmit)}>
        <h2 className="form-title">Delivery Details</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            {...register("fullName", { required: { value: true, message: "This field is required" }, minLength: { value: 4, message: "This name is too short" } })}
          />
        </div>
        {errors.fullName && <div id="makerror">{errors.fullName.message}</div>}
        <div className="input-row">
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              {...register("phone", {
                required: { value: true, message: "This field is required" }, minLength: { value: 10, message: "Invalid phone number" },
                maxLength: { value: 10, message: "Invalid phone number" }
              })}
            />
          </div>

        </div>
        {errors.phone && <div id="makerror">{errors.phone.message}</div>}
        <div className="input-group">
          <label>Street Address</label>
          <input
            type="text"
            name="address"
            placeholder="House no, street"
            {...register("address", {
              required: { value: true, message: "This field is required" }, minLength: { value: 15, message: "Address is too short" }
            })}
          />
        </div>
        {errors.address && <div id="makerror">{errors.address.message}</div>}

        <div className="input-row">
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Your city"
              {...register("city", { required: { value: true, message: "This field is required" } })}
            />
            {errors.city && <div className="error">{errors.city.message}</div>}
          </div>

          <div className="input-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postal"
              placeholder="Postal code"
              {...register("postal", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 6, message: "Invalid Pincode" },
                maxLength: { value: 6, message: "Invalid Pincode" }
              })}
            />
            {errors.postal && <div className="error">{errors.postal.message}</div>}
          </div>
        </div>

        <div className="input-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            placeholder="Any special instructions..."
            {...register("notes")}
          ></textarea>
        </div>


        <button type="submit" className="submit-btn">Save Details</button>
      </form>
    </div>
  );
};

export default Info;
