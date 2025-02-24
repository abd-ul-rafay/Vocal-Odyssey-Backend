const getLevels = (req, res) => res.json({ message: 'Levels retrieved' });
const getLevel = (req, res) => res.json({ message: 'Level details retrieved' });
const createLevel = (req, res) => res.json({ message: 'Level created' });
const updateLevel = (req, res) => res.json({ message: 'Level updated' });
const deleteLevel = (req, res) => res.json({ message: 'Level deleted' });

module.exports = { getLevels, getLevel, createLevel, updateLevel, deleteLevel };
