import Receiver from "../models/receiver.js";
import User from "../models/user.js";
import {
  RECEIVER_CREATED,
  RECEIVER_UPDATED,
  RECEIVER_STATUS_CHANGE,
  RECEIVER_FETCHED,
} from "../utils/constants.js";

export const createReceiver = async (req, res) => {
  try {
    const receiverDetails = req.body;
    receiverDetails["user"] = req.userId;
    receiverDetails["createdAt"] = new Date().toISOString();

    const existingUser = await User.findOne({ mobile: receiverDetails.mobile });

    // To check does mobile number matches record
    if (!existingUser) {
      return res.status(400).json({
        error: true,
        message: `${receiverDetails.mobile} doesn't match our records. Please signup with this mobile number.`,
      });
    }

    const receiverResp = await Receiver.create(receiverDetails);
    res.status(201).json({
      error: false,
      message: RECEIVER_CREATED,
      receiver: receiverResp,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const updateReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const receiverDetails = req.body;
    receiverDetails["user"] = req.userId;

    await Receiver.updateOne({ _id: receiverId }, receiverDetails);

    res.status(200).json({ error: false, message: RECEIVER_UPDATED });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const getReceivers = async (req, res) => {
  try {
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Receiver.countDocuments({ isActive: true });

    const receiverResp = await Receiver.find({ isActive: true })
      .populate("user")
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    const respObject = {
      data: receiverResp,
      currentPage: Number(page),
      numberOfPages: total <= LIMIT ? 1 : Math.ceil(total / LIMIT),
    };

    res
      .status(200)
      .json({ error: false, message: RECEIVER_FETCHED, receiver: respObject });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const updateReceiverStatus = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { isActive } = req.body;

    await Receiver.updateOne({ _id: receiverId }, { isActive: isActive });

    res.status(200).json({ error: false, message: RECEIVER_STATUS_CHANGE });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const userReceivers = async (req, res) => {
  try {
    const receiverResp = await Receiver.find({ user: req.userId });
    res
      .status(200)
      .json({
        error: false,
        message: RECEIVER_FETCHED,
        receiver: receiverResp,
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
