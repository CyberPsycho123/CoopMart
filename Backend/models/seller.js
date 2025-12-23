import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    name:String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    upi_id:String
});

export const Seller = mongoose.model('seller', blogSchema)