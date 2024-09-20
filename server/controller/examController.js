const Exam = require('../models/Exam');
const Course = require('../models/Course');

// Create a new Exam
exports.createExam = async (req, res) => { 
    try {
      const { examTitle, courseId, totalMarks, passingMarks, duration } = req.body;
      
      // Check if the course exists
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      // Create a new exam
      const exam = new Exam({
        examTitle,
        courseId: courseId,
        totalMarks,
        passingMarks,
        duration,  // Include duration in exam creation
        questions: [] // Initialize with empty questions
      });
      
      const savedExam = await exam.save();
      res.status(201).json(savedExam);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };


  //get all exams
  exports.getAllExams = async (req, res) => {
    try {
      // Fetch all exams from the database
      const exams = await Exam.find().populate('courseId', 'title'); // Populate course to get course title
      res.status(200).json(exams);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };

// Get all Exams for a Course
exports.getExamsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const exams = await Exam.find({ course: courseId }).populate('course');
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
