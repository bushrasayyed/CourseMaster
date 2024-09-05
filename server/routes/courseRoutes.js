const express = require("express");
const { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById } = require("../controller/courseController");
const upload = require("../middleware/uploads"); // Import the multer configuration

const router = express.Router();

// Route to create a new course with image upload
router.post("/addcourse", upload.single("courseImage"), createCourse);

// Other routes
router.get("/getAllCourses", getAllCourses);
router.get("/getCourse/:id", getCourseById);
router.put("/updateCourse/:id", upload.single("courseImage"), updateCourseById);
router.delete("/deleteCourse/:id", deleteCourseById);

module.exports = router;
