const express = require('express');
const router = express.Router();
const multer = require('multer');
const { predict } = require('../controllers/predictionController');

const upload = multer({ dest: 'uploads/' });

router.post('/predict', upload.single('image'), predict);

module.exports = router;