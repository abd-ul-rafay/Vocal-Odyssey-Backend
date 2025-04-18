const User = require('../models/user');

// GET all supervisors
const getUsers = async (req, res) => {
  try {
    const supervisors = await User.find({ role: 'supervisor' }).select('-password');
    res.json(supervisors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users', details: err.message });
  }
};

// UPDATE a supervisor by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user || user.role !== 'supervisor') {
      return res.status(404).json({ error: 'Supervisor not found' });
    }
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

// DELETE a supervisor by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id, role: 'supervisor' });
    if (!user) {
      return res.status(404).json({ error: 'Supervisor not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};

module.exports = { getUsers, updateUser, deleteUser };
