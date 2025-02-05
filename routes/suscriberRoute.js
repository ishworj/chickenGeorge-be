import express from "express";
import {
  createSuscriber,
  getAllSuscribers,
} from "../Models/suscriber/suscriberModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await createSuscriber(req.body.email);
    return res.status(201).json({
      status: "success",
      message: "suscriber created succesfully",
    });
  } catch (error) {
    if (error?.message.includes("E11000")) {
      return res.status(400).json({
        status: "error",
        message: "suscriber already exists !!!",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Error while creating the suscriber",
      });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const suscribers = await getAllSuscribers();
    return res.status(200).json({
      status: "success",
      message: "got suscribers successfully",
      suscribers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while getting the suscribers",
    });
  }
});

export default router;
