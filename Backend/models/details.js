import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone:String,
    fullname:String,
    address:String,
    city:String,
    pincode:String,
    additional:String
});

export const Details = mongoose.model('details', blogSchema)