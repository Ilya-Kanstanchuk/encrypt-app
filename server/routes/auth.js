import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    return res.status(500).json({ success: false, message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    return res.status(200).json({
      success: true,
      token,
      user: { username: user.username, id: user._id },
      message: "Login was successfull",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
});

export default router;
