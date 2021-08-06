import express from "express";
import {
  createReceiver,
  updateReceiver,
  getReceivers,
  updateReceiverStatus,
  userReceivers,
} from "../controllers/receiver.js";
import auth from "../middleware/auth.js";
const router = express.Router();
// import { validateCreateReceiver } from "../dto/donor.dto.js";

router.post("/create", auth, createReceiver);
router.put("/update/:receiverId", auth, updateReceiver);
router.put("/update-status/:receiverId", auth, updateReceiverStatus);
router.get("/user-donation", auth, userReceivers);
router.get("/", getReceivers);

export default router;
