const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/v1/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "supervisor",
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err.message });
  }
};

// POST /api/v1/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

// POST /api/v1/auth/google-signin
const googleSignin = async (req, res) => {
  res.json({ message: "Google sign-in successful" });
};

// POST /api/v1/auth/recover-password
const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User exists, proceed to OTP and reset password" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Recovery check failed", details: err.message });
  }
};

// POST /api/v1/auth/reset-password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to reset password", details: err.message });
  }
};

module.exports = {
  signup,
  login,
  googleSignin,
  recoverPassword,
  resetPassword,
};
