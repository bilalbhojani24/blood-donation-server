import User from "../models/user.js";
import { signupEmailAndMobileValidator } from "../utils/helpers.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { bloodGroupEnum } from "../utils/constants.js";

export const signup = async (req, res) => {
  try {
    const { name, email, mobile, password, bloodGroup } = req.body;
    const error = [];

    // validate email and mobile
    const checkError = signupEmailAndMobileValidator(password, mobile);
    if (checkError.length > 0) {
      return res.status(400).json({ error: true, message: checkError });
    }

    // Validate email does not exist
    const checkUserEmail = await User.findOne({ email: email });
    if (checkUserEmail) {
      error.push("Email Id is already taken!");
    }

    // validate mobile does not exist
    const checkUserMobile = await User.findOne({ mobile: mobile });
    if (checkUserMobile) {
      error.push("Mobile number is already taken!");
    }

    // Validate correct blood group
    if (!bloodGroupEnum.includes(bloodGroup)) {
      error.push("Invalid Blood Group");
    }

    if (error.length > 0) {
      return res.status(400).json({
        error: true,
        message: error,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userCreateResp = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      bloodGroup: bloodGroup,
      mobile: mobile,
      role: "user",
      isVerified: true,
    });
    const token = jwt.sign(
      { email: userCreateResp.email, id: userCreateResp._id },
      "test-bilal",
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({ error: false, user: userCreateResp, token: token });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: true, message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: true, message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test-bilal", // will be changing
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ error: false, user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const userResp = await User.findById(req.userId);
    if (!userResp) {
      return res.status(404).json({ error: true, message: "User not found!!" });
    }
    res.status(200).json({ error: false, user: userResp });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, bloodGroup } = req.body;
    const userResp = await User.findById(req.userId);
    // Update name
    if (name) {
      userResp.name = name;
    }
    // update email
    if (email) {
      userResp.email = email;
    }
    // update blood group
    if (bloodGroup) {
      if (bloodGroupEnum.includes(bloodGroup)) {
        userResp.bloodGroup = bloodGroup;
      } else {
        return res
          .status(404)
          .json({ error: true, message: "Invalid Blood Group!!" });
      }
    }

    if (!userResp) {
      return res.status(404).json({ error: true, message: "User not found!!" });
    }

    await User.updateOne({ _id: req.userId }, userResp);

    res.status(200).json({ error: false, user: userResp });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const existingUser = await User.findById(req.userId);
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: true, message: "Old password does not match" });
    }

    const checkError = signupEmailAndMobileValidator(newPassword, null);
    if (checkError.length > 0) {
      return res.status(400).json({ error: true, message: checkError });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    existingUser.password = hashedPassword;

    await User.updateOne({ _id: req.userId }, existingUser);

    res.status(200).json({ error: false, user: existingUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};