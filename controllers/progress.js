const getProgressByChild = (req, res) => res.json({ message: 'Progress retrieved for child' });
const getProgress = (req, res) => res.json({ message: 'Progress details retrieved' });
const createProgress = (req, res) => res.json({ message: 'Progress created' });
const updateProgress = (req, res) => res.json({ message: 'Progress updated' });

module.exports = { getProgressByChild, getProgress, createProgress, updateProgress };
