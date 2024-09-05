const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  order: { type: Number, required: true }
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
