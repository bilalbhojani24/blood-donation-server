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
import { validateCreateReceiver } from "../dto/receiver.dto.js";

router.post("/create", auth, validateCreateReceiver, createReceiver);
router.put("/update/:receiverId", auth, validateCreateReceiver, updateReceiver);
router.put("/update-status/:receiverId", auth, updateReceiverStatus);
router.get("/user-receiver", auth, userReceivers);
router.get("/", getReceivers);

export default router;
