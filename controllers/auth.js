const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Utility: generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/v1/auth/signup
const signup = async (req, res) => {
   try { const { name, email, password } = req.body;

    // Check if email already exists
const existingUser = await User.findOne({ email });
if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    // Hash the password before saving
const hashedPassword = await bcrypt.hash(password, 10);

    // Save only as supervisor
const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role: 'supervisor'
});

res.status(201).json({
  message: 'Signup successful',
  user: {
    id: user._id,
    email: user.email
  }
});
} catch (err) {
   res.status(400).json({ error: 'Signup failed', details: err.message }); 
  } };

// POST /api/v1/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Compare the entered password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

// POST /api/v1/auth/google-signin
const googleSignin = async (req, res) => {
  // Placeholder for Google sign-in functionality
  res.json({ message: 'Google sign-in successful' });
};

// POST /api/v1/auth/recover-password
const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await user.save();

    // Send OTP to email 
    console.log(`Sending OTP ${otp} to ${email}`);

    res.json({ message: 'Password recovery OTP sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
};

// POST /api/v1/auth/reset-password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if OTP is valid
    if (user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = undefined; // Reset OTP after password change
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password', details: err.message });
  }
};

module.exports = {
  signup,
  login,
  googleSignin,
  recoverPassword,
  resetPassword
};
