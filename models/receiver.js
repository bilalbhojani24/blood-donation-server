import mongoose from "mongoose";

const ReceiverSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    trim: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
    trim: true,
  },
  receiverName: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
  contactPersonName: {
    type: String,
    required: true,
    trim: true,
  },
  alternateMobile: {
    type: Number,
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

export default mongoose.model("Receiver", ReceiverSchema);
