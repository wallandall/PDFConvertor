const express = require('express');

const { createPDFile, createBufferedPDF } = require('../controllers/files');

const router = express.Router();

router.route('/');
router.route('/file').post(createPDFile);
router.route('/buffer').post(createBufferedPDF);

module.exports = router;
