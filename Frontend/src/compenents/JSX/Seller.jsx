import { useState } from "react";
import "../CSS/Seller.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Seller() {
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    async function redirect(){
      let reading = await fetch("https://coopmart-backend.onrender.com/read", { method: "GET", credentials: "include" })
      let reads = await reading.json()
      if (reads.bool == true) {
        navigate("/seller")
      }
      else {
        navigate("/login")
      }
    }
    redirect()
  }, [])
  
  const onsubmit = async (form) => {
    const formData = new FormData()
    formData.append("image", form.image[0])
    formData.append("title", form.title)
    formData.append("desc", form.desc)
    formData.append("price", form.price)
    formData.append("catagory", form.catagory)

    const res = await fetch("https://coopmart-backend.onrender.com/sell", {
      method: "POST",
      credentials: "include",
      body: formData
    });

    const responsed = await res.json()
    if (responsed.success == true) {
      navigate('/')
    }
  };

  return (
    <>
    <form className="upload-wrapper" onSubmit={handleSubmit(onsubmit)}>
      <div className="upload-card">
        <h1>Upload New Item</h1>

        {/* Image Upload */}
        <div className="input-group">
          <label>Upload Image</label>

          <div className="upload-box">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" />
            ) : (
              <p className="text-gray">Click below to upload image</p>
            )}
            <input type="file" accept="image/*" name="image" {...register("image", { required: { value: true, message: "This field is required" } })} onChange={handleImageChange} />
          </div>
        </div>

        {/* Title */}
        <div className="input-group">
          <label>Title</label>
          <input type="text" placeholder="Enter item title" name="title" {...register("title", { required: { value: true, message: "This field is required" }, minLength: { value: 4, message: "This title is too short" } })} />
        </div>

        {/* Description */}
        <div className="input-group">
          <label>Description</label>
          <textarea placeholder="Enter description" name="desc" {...register("desc", { required: { value: true, message: "This field is required" }, minLength: { value: 20, message: "This title is too short" } })}></textarea>
        </div>

        {/* Price */}
        <div className="input-group">
          <label>Price</label>
          <input type="number" placeholder="Enter price" name="price" {...register("price", { required: { value: true, message: "This field is required" } })} />
        </div>

        {/* Category */}
        <div className="input-group">
          <label>Category</label>
          <select name="catagory" {...register("catagory", { required: { value: true, message: "This field is required" } })}>
            <option>Select category</option>
            <option>T-shirt</option>
            <option>Shirt</option>
            <option>Shoes</option>
            <option>Electronics</option>
          </select>
        </div>

        {/* Upload Button */}
        <button type="submit" className="upload-btn">Upload Item</button>
      </div>
    </form>
    <div className="admin-path">
      <p onClick={()=>navigate('/selleradmin')}>Go to admin page </p>
    </div>
    </>
  );
}
