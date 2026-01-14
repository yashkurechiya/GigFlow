import jwt from "jsonwebtoken";
import User from "../model/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,  
    sameSite: "lax",
  });

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  sendToken(user, res);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  sendToken(user, res);
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ success: true, message: "Logged out" });
});


export const me = async (req, res) => {
  res.json(req.user);
};
