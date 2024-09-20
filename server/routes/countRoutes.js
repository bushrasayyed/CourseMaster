const express = require('express');
const router = express.Router();
const {
    getStats
  } = require("../controller/countController");
router.get('/getCounts', getStats);


module.exports = router;
