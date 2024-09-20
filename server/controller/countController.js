const User = require('../models/User'); 
const Course = require('../models/Course'); 
const Exam = require('../models/Exam'); 

/**
 * Controller function to get statistics about the number of users, courses, and exams.
 */
const getStats = async (req, res) => {
  try {
    // Count the number of users
    const totalUsers = await User.countDocuments();

    // Count the number of courses
    const totalCourses = await Course.countDocuments();

    // Count the number of exams
    const totalExams = await Exam.countDocuments();

    // Respond with the counts
    res.status(200).json({
      totalUsers,
      totalCourses,
      totalExams
    });
  } catch (error) {
    console.error('Error retrieving statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getStats
};
