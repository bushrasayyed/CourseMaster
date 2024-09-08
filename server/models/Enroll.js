const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
  id: {
    type: String,  // Unique ID for the enrollment (primary key)
    required: true,
    unique: true,
  },
  userId: {
    type: String,  // Foreign key reference to the student
    required: true,
  },
  courseId: {
    type: String,  // Foreign key reference to the course
    required: true,
  },
  progress: {
    type: Number,  // Track the student's progress (e.g., percentage)
    default: 0,
  },
  is_completed: {
    type: Boolean,  // Whether the course is completed
    default: false,
  },
  completed_at: {
    type: Date,  // Date when the course was completed
    default: null,
  },
});

// Optional: Add indexing for faster querying
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enroll', EnrollmentSchema);

module.exports = Enrollment;
