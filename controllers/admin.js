const getUsers = (req, res) => res.json({ message: 'User list retrieved' });
const updateUser = (req, res) => res.json({ message: 'User updated' });
const deleteUser = (req, res) => res.json({ message: 'User deleted' });

module.exports = { getUsers, updateUser, deleteUser };
