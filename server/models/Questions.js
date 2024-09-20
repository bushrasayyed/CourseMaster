const mongoose = require('mongoose');

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  examId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exam', // Referencing the Course model
    required: true 
  },
  questionText: { 
    type: String, 
    required: true 
  },
  options: [{ type: String, required: true }],
  correctAnswer: { 
    type: String, 
    required: true 
  }
});

// Create and export the model
module.exports = mongoose.model('Question', questionSchema);
