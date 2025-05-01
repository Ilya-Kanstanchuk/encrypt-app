import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/registration", async (req, res) => {
  try {
    const { username, email, password, publicKey } = req.body;
    const samename = await User.findOne({ username });
    if (samename) {
      return res
        .status(401)
        .json({ success: false, message: "Username is occupied" });
    }
    const sameemail = await User.findOne({ email });
    if (sameemail) {
      return res
        .status(401)
        .json({ success: false, message: "Email is occupied" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      publicKey: publicKey,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "User was added successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
