const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'supervisor'],
    default: 'supervisor'
  },
  
  // otp: {
  //   type: String
  // },
  // otpExpires: {
  //   type: Date
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
