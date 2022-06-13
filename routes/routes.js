const express = require('express');
const router = express.Router();

router('/login').post();
router('/register').post();
router('/dashboard').get();

module.exports = router;