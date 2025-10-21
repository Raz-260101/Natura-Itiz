import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  imageUrl: { type: String },
  isOrganic: { type: Boolean, default: false },
  sellerName: { type: String },
});

export const User = models.User || model('User', UserSchema);
export const Product = models.Product || model('Product', ProductSchema);
