const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: {type:Number},
  imageLink: String,
  
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
