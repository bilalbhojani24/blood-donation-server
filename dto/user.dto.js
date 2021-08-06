import { bloodGroupEnum } from "../utils/constants.js";

import { check, validationResult } from "express-validator";

export const ValidateSignup = [
  check("name").trim().isLength({ min: 3 }).withMessage("Donor name is must"),

  check("email").trim().isEmail().withMessage("Invalid email address"),

  check("mobile")
    .trim()
    .isMobilePhone()
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid mobile number"),

  check("bloodGroup")
    .trim()
    .isIn(bloodGroupEnum)
    .withMessage("Invalid blood group number"),

  check("password")
    .trim()
    .isLength({
      min: 8,
    })
    .withMessage("Password must be of 8 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: true, message: errors.array() });
    next();
  },
];

export const ValidateSignin = [
  check("email").trim().isEmail().withMessage("Invalid email address"),

  check("password")
    .trim()
    .isLength({
      min: 8,
    })
    .withMessage("Password must be of 8 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: true, message: errors.array() });
    next();
  },
];

export const ValidateProfileUpdate = [
  check("name").trim().isLength({ min: 3 }).withMessage("Donor name is must"),

  check("email").trim().isEmail().withMessage("Invalid email address"),

  check("bloodGroup")
    .trim()
    .isIn(bloodGroupEnum)
    .withMessage("Invalid blood group number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: true, message: errors.array() });
    next();
  },
];
