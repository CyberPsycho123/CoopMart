import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  image:String,
  email: {
    type: String,
    required: true,
    trim: true
  },
  catagory:String,
  title: String,
  desc: String,
  price: Number
});

export const Outfit = mongoose.model('outfit', blogSchema)