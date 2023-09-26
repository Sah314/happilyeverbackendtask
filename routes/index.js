const express = require('express');
const authentication = require('./authentication');
const router = express.Router();
const sessions = require('./sessions')

router.use('/auth',authentication);
router.use('/sessions',sessions);

module.exports = router;
