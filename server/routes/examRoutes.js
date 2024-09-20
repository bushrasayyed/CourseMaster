const express = require('express');
const router = express.Router();
const {createExam,getExamsByCourse,getAllExams} = require('../controller/examController');

// Create a new exam
router.post('/createExam',createExam);
router.get('/getAllExams',getAllExams);

// Get exams by course ID
router.get('/getExamsByCourseId/:courseId',getExamsByCourse);

module.exports = router;
