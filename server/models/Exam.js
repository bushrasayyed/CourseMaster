const mongoose = require('mongoose');
const Questions = require('./Questions');

const examSchema = new mongoose.Schema({
  examTitle: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
  totalMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true },
  duration: { type: Number, required: true }, 
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
