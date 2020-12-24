const express = require('express');

const { getHTML, createPDF } = require('../controllers/files');

const router = express.Router();

router.route('/').get(getHTML).post(createPDF);

module.exports = router;
