const express = require("express");
const {
  signup,
  login
} = require("../controller/userController");


const router = express.Router();

router.post("/student/signup", signup);
router.post("/student/login", login);

module.exports = router;
