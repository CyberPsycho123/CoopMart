import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,   
    required: true,   
    trim: true
  }
});

export const User = mongoose.model('user', blogSchema)