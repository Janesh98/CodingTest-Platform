const express = require('express');
const router = express.Router();
const { addSubmission, getSubmission } = require('../controllers/submission');

router.route('/').post(addSubmission);
router.route('/:id').get(getSubmission);

module.exports = router;
