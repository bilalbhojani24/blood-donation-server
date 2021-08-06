import express from "express";
import {
  signup,
  signin,
  getUser,
  updateProfile,
  updateUserPassword,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
import {
  ValidateSignup,
  ValidateSignin,
  ValidateProfileUpdate,
} from "../dto/user.dto.js";
const router = express.Router();

router.post("/signup", ValidateSignup, signup);
router.post("/signin", ValidateSignin, signin);
router.put("/update-profile", auth, ValidateProfileUpdate, updateProfile);
router.put("/update-password", auth, updateUserPassword);
router.get("/", auth, getUser);

export default router;
