const Course = require("../models/Course");
const path = require("path");
const fs = require("fs");

// Create a new course with image upload
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  let imageLink = null;

  // Handle file upload
  if (req.file) {
    imageLink = req.file.path; // Save the image path in the database
  }

  try {
    const newCourse = new Course({
      title,
      description,
      imageLink, // Store the image file path in the database
    });

    const savedCourse = await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: savedCourse });
  } catch (error) {
    console.error("Failed to create course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find(); // Get all courses
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Get course by ID
  exports.getCourseById = async (req, res) => {
    try {
      const courseId = req.params.id;
  
      const course = await Course.findById(courseId); // Get course by ID
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      res.status(200).json(course);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Update course by ID
  exports.updateCourseById = async (req, res) => {
    try {
      const courseId = req.params.id;
      const { title, description } = req.body;
      let imageLink = null;
  
      // If a file is uploaded, handle it
      if (req.file) {
        imageLink = req.file.path;
      } else {
        // If no new file is uploaded, check if the old imageLink should be kept
        const existingCourse = await Course.findById(courseId);
        if (existingCourse) {
          imageLink = existingCourse.imageLink; // Keep the old image link
        }
      }
  
      // Update the course
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { title, description, imageLink },
        { new: true } // Return the updated document
      );
  
      if (!updatedCourse) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  // Delete course by ID
  exports.deleteCourseById = async (req, res) => {
    try {
      const courseId = req.params.id;
  
      const deletedCourse = await Course.findByIdAndDelete(courseId); // Delete course by ID
      if (!deletedCourse) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };