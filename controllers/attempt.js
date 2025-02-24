const getAttemptsByProgress = (req, res) => res.json({ message: 'Attempts retrieved for progress' });
const getAttempt = (req, res) => res.json({ message: 'Attempt details retrieved' });
const createAttempt = (req, res) => res.json({ message: 'Attempt recorded' });

module.exports = { getAttemptsByProgress, getAttempt, createAttempt };
