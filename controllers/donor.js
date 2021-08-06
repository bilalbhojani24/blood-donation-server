import Donor from "../models/donor.js";
import {
  bloodGroupEnum,
  DONOR_CREATED,
  DONOR_UPDATED,
  DONOR_FETCHED,
  DONOR_STATUS_CHANGE,
  DONOR_NOT_FOUND,
} from "../utils/constants.js";

export const createDonor = async (req, res) => {
  try {
    const donorDetails = req.body;
    donorDetails["user"] = req.userId;
    const error = [];
    if (!bloodGroupEnum.includes(donorDetails.bloodGroup)) {
      error.push("Invalid Blood Group");
    }
    if (error.length > 0) {
      return res.status(400).json({
        error: true,
        message: error,
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
    const error = [];
    if (!bloodGroupEnum.includes(donorDetails.bloodGroup)) {
      error.push("Invalid Blood Group");
    }
    if (error.length > 0) {
      return res.status(400).json({
        error: true,
        message: error,
      });
    }

    await Donor.updateOne({ _id: donorId }, donorDetails);

    res.status(200).json({ error: false, message: DONOR_UPDATED });
  } catch (error) {
    res.status(500).json({ error: true, donor: error });
  }
};

export const updateDonorStatus = async (req, res) => {
  try {
    const { donorId } = req.params;
    const { isActive } = req.body;

    await Donor.updateOne({ _id: donorId }, { isActive: isActive });

    res.status(200).json({ error: false, message: DONOR_STATUS_CHANGE });
  } catch (error) {
    res.status(200).json({ error: true, donor: error });
  }
};

export const getDonors = async (req, res) => {
  try {
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Donor.countDocuments({ isActive: false });

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
    res.status(500).json({ error: true, donor: error });
  }
};

export const singleDonor = async (req, res) => {
  try {
    const donorResp = await Donor.findOne({ user: req.userId });
    if (!donorResp) {
      return res.status(404).json({
        error: true,
        message: DONOR_NOT_FOUND,
      });
    }
    res
      .status(200)
      .json({ error: false, message: DONOR_FETCHED, donor: donorResp });
  } catch (error) {
    res.status(500).json({ error: true, donor: error });
  }
};
