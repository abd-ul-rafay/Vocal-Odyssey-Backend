const express = require('express');
const multer = require('multer');
const { evaluateSpeech } = require('../controllers/evaluate');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.route('/')
  .post(upload.single('user_audio_file'), evaluateSpeech);

module.exports = router;
