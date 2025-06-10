const express = require('express');
const multer = require('multer');
const { evaluateSpeech, createSpeech } = require('../controllers/speech');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.route('/evaluate')
  .post(upload.single('user_audio_file'), evaluateSpeech);
  
router.route('/create')
  .post(createSpeech);

module.exports = router;
