const express = require('express');
const router = express.Router();
const { submission } = require('../controllers/submission');

router.route('/').post(submission);

module.exports = router;
