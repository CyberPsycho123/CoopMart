import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    email:String,
    phone:String,
    fullname:String,
    address:String,
    action:String,
    city:String,
    pincode:String,
    prod_title: String,
    prod_img:String,
    prod_quantity:Number,
    price:Number,
    delivary_method:String
});

export const Delivary = mongoose.model('delivarys', blogSchema)