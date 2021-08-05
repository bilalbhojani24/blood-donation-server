import mongoose from "mongoose";
import { roleEnum, bloodGroupEnum } from "../utils/constants.js";
const UserSchema = mongoose.Schema({
  id: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
});

export default mongoose.model("User", UserSchema);
