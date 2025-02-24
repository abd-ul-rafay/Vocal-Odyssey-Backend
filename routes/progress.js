const express = require('express');
const { getProgressByChild, getProgress, createProgress, updateProgress } = require('../controllers/progress');

const router = express.Router();

router.route('/:childId')
    .get(getProgressByChild);

router.route('/:id')
    .get(getProgress)
    .post(createProgress)
    .put(updateProgress);

module.exports = router;
