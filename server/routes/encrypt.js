import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.get("/find", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.query.username,
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User was not found" });
    }
    return res.status(200).json({ success: true, publicKey: user.publicKey });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
});

export default router;
