const express = require("express");
const { adminSignup, adminLogin } = require("../controller/adminController");

const router = express.Router();

// Admin signup route
router.post("/signup", adminSignup);

// Admin login route
router.post("/admin/login", adminLogin);

module.exports = router;
