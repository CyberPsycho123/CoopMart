import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  email:String,
  image:String,
  title:String,
  quantity:String,
  price:String,
});

export const Cart = mongoose.model('cart', blogSchema)