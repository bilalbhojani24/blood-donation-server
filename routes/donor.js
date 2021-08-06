import express from "express";
import {
  createDonor,
  updateDonor,
  getDonors,
  updateDonorStatus,
  userDonations,
} from "../controllers/donor.js";
import auth from "../middleware/auth.js";
const router = express.Router();
import { validateCreateDonor } from "../dto/donor.dto.js";

router.post("/create", auth, validateCreateDonor, createDonor);
router.put("/update/:donorId", auth, validateCreateDonor, updateDonor);
router.put("/update-status/:donorId", auth, updateDonorStatus);
router.get("/user-donation", auth, userDonations);
router.get("/", getDonors);

export default router;
