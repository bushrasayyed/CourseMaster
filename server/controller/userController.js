const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Hash the password
    const saltRounds = 10; // You can adjust the salt rounds as necessary
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const _user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await _user.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      // Compare the password with the hashed password in DB
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, role: "user" }, // Payload can include any additional info
        process.env.SECRET,                  // Replace with your JWT secret
        { expiresIn: "1h" }                  // Token expiration time
      );
  
      // Send token as response
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };