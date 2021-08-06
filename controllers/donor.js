import Donor from "../models/donor.js";
import User from "../models/user.js";
import {
  DONOR_CREATED,
  DONOR_UPDATED,
  DONOR_FETCHED,
  DONOR_STATUS_CHANGE,
} from "../utils/constants.js";

export const createDonor = async (req, res) => {
  try {
    const donorDetails = req.body;
    donorDetails["user"] = req.userId;
    donorDetails["createdAt"] = new Date().toISOString();

    const existingUser = await User.findOne({ mobile: donorDetails.mobile });

    // To check does mobile number matches record
    if (!existingUser) {
      return res.status(400).json({
        error: true,
        message: `${donorDetails.mobile} doesn't match our records. Please signup with this mobile number.`,
      });
    }

    const donorResp = await Donor.create(donorDetails);
    res
      .status(201)
      .json({ error: false, message: DONOR_CREATED, donor: donorResp });
  } catch (error) {
    res.status(500).json({ error: true, donor: error });
  }
};

export const updateDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donorDetails = req.body;
    donorDetails["user"] = req.userId;

    await Donor.updateOne({ _id: donorId }, donorDetails);

    res.status(200).json({ error: false, message: DONOR_UPDATED });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const updateDonorStatus = async (req, res) => {
  try {
    const { donorId } = req.params;
    const { isActive } = req.body;

    await Donor.updateOne({ _id: donorId }, { isActive: isActive });

    res.status(200).json({ error: false, message: DONOR_STATUS_CHANGE });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const getDonors = async (req, res) => {
  try {
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Donor.countDocuments({ isActive: true });

    const donorResp = await Donor.find({ isActive: true })
      .populate("user")
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    const respObject = {
      data: donorResp,
      currentPage: Number(page),
      numberOfPages: total <= LIMIT ? 1 : Math.ceil(total / LIMIT),
    };

    res
      .status(200)
      .json({ error: false, message: DONOR_FETCHED, donor: respObject });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const userDonations = async (req, res) => {
  try {
    const donorResp = await Donor.find({ user: req.userId });
    res
      .status(200)
      .json({ error: false, message: DONOR_FETCHED, donor: donorResp });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
