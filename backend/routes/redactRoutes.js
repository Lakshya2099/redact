const express = require('express');
const router = express.Router();
const { uploadFile, redactFile } = require('../controllers/redactController');
const auth = require('../middleware/authMiddleware');

router.post('/upload', auth, uploadFile);
router.post('/redact', auth, redactFile);

module.exports = router;
