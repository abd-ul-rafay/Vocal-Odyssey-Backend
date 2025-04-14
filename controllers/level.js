const Level = require('../models/level');

const getLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve levels', details: error.message });
  }
};

const getLevel = async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) return res.status(404).json({ error: 'Level not found' });
    res.status(200).json(level);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get level', details: error.message });
  }
};

const createLevel = async (req, res) => {
  try {
    const { name, description, content, level_type, ideal_time } = req.body;
    const newLevel = new Level({ name, description, content, level_type, ideal_time });
    const savedLevel = await newLevel.save();
    res.status(201).json(savedLevel);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create level', details: error.message });
  }
};

const updateLevel = async (req, res) => {
  try {
    const updatedLevel = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLevel) return res.status(404).json({ error: 'Level not found' });
    res.status(200).json(updatedLevel);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update level', details: error.message });
  }
};

const deleteLevel = async (req, res) => {
  try {
    const deleted = await Level.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Level not found' });
    res.status(200).json({ message: 'Level deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete level', details: error.message });
  }
};

module.exports = {
  getLevels,
  getLevel,
  createLevel,
  updateLevel,
  deleteLevel,
};
