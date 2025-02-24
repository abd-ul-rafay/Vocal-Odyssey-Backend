const getChildren = (req, res) => res.json({ message: 'Children list retrieved' });
const getChild = (req, res) => res.json({ message: 'Child data retrieved' });
const createChild = (req, res) => res.json({ message: 'Child created' });
const updateChild = (req, res) => res.json({ message: 'Child updated' });
const deleteChild = (req, res) => res.json({ message: 'Child deleted' });

module.exports = { getChildren, getChild, createChild, updateChild, deleteChild };
