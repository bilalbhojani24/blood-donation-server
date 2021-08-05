import express from "express";
import {
  signup,
  signin,
  getUser,
  updateProfile,
  updateUserPassword,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/update-profile", auth, updateProfile);
router.post("/update-password", auth, updateUserPassword);
router.get("/", auth, getUser);

export default router;
