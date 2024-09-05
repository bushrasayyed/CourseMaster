const express = require("express");
const router = express.Router();

// Import all controllers
const {
  createLecture,
  getAllLectures,
  getLecturesByCourseId,
  updateLectureById,
  deleteLectureById
} = require("../controller/lectureController");

// Define routes and use controller functions
router.post("/createLectures", createLecture);
router.get("/getAllLectures", getAllLectures); // New route for fetching all lectures
router.get("/lectures/course/:courseId", getLecturesByCourseId);
router.put("/updateLecture/:id", updateLectureById);
router.delete("/deleteLecture/:id", deleteLectureById);

module.exports = router;
