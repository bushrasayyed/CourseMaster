const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,  // Reference to User
    ref: 'User',
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,  // Reference to Course
    ref: 'Course',
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
}, {
  timestamps: true,
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
module.exports = Enrollment;
