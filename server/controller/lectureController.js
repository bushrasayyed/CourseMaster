const Lecture = require("../models/Lecture");

// Create a new lecture
exports.createLecture = async (req, res) => {
  const { course_id, title, videoUrl, order } = req.body;

  try {
    const newLecture = new Lecture({ course_id, title, videoUrl, order });
    const savedLecture = await newLecture.save();
    res.status(201).json({ message: "Lecture created successfully", lecture: savedLecture });
  } catch (error) {
    console.error("Failed to create lecture:", error);
    res.status(500).json({ error: "Failed to create lecture" });
  }
};


// Get all lectures
exports.getAllLectures = async (req, res) => {
    try {
      const lectures = await Lecture.find(); // Retrieve all lectures
      res.status(200).json({ lectures });
    } catch (error) {
      console.error("Error fetching lectures:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// Get all lectures for a specific course
exports.getLecturesByCourseId = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const lectures = await Lecture.find({ course_id: courseId }).sort({ order: 1 });
    res.status(200).json(lectures);
  } catch (error) {
    console.error("Failed to get lectures:", error);
    res.status(500).json({ error: "Failed to get lectures" });
  }
};

// Update a lecture by ID
exports.updateLectureById = async (req, res) => {
  const lectureId = req.params.id;
  const { title, videoUrl, order } = req.body;

  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { title, videoUrl, order },
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    res.status(200).json({ message: "Lecture updated successfully", lecture: updatedLecture });
  } catch (error) {
    console.error("Failed to update lecture:", error);
    res.status(500).json({ error: "Failed to update lecture" });
  }
};

// Delete a lecture by ID
exports.deleteLectureById = async (req, res) => {
  const lectureId = req.params.id;

  try {
    const deletedLecture = await Lecture.findByIdAndDelete(lectureId);

    if (!deletedLecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Failed to delete lecture:", error);
    res.status(500).json({ error: "Failed to delete lecture" });
  }
};
