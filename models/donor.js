import mongoose from "mongoose";

const DonorSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
    trim: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
    trim: true,
  },
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Donor", DonorSchema);
