const Progress = require('../models/progress');

const getProgressByChild = async (req, res) => {
  try {
    const { childId } = req.query;
    if (!childId) return res.status(400).json({ error: 'childId query parameter is required' });

    const progress = await Progress.find({ child_id: childId }).populate('level_id');
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve progress', details: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id).populate(['child_id', 'level_id']);
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get progress', details: error.message });
  }
};

const createProgress = async (req, res) => {
  try {
    const { child_id, level_id } = req.body;
    if (!child_id || !level_id) {
      return res.status(400).json({ error: 'child_id and level_id are required' });
    }

    const newProgress = new Progress({ child_id, level_id });
    const saved = await newProgress.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create progress', details: error.message });
  }
};

module.exports = {
  getProgressByChild,
  getProgress,
  createProgress,
};
