// Import necessary models
const Exam = require('../models/Exam'); // Adjust the path as needed
const Question = require('../models/Questions'); // Adjust the path as needed

exports.addQuestion = async (req, res) => {
    try {
        const { examId, question, options, correctOption } = req.body;
        // console.log("Exam Id", examId);
        
        // Validate request body
        if (!examId || !question || !options || !correctOption) {
            console.log('Validation Error: Missing fields');
            return res.status(400).json({ message: 'All fields are required' }); 
        }
        
       

        // Find the exam by ID
        const exam = await Exam.findById(examId);
        if (!exam) {
            console.log(`Exam not found with ID: ${examId}`);
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Create a new question
        const newQuestion = new Question({
            examId: examId,
            questionText: question,
            options,
            correctAnswer: correctOption,
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();
        console.log('Question saved:', savedQuestion);

        // Add the question ID to the exam's questions array
        exam.questions.push(savedQuestion._id);

        // Save the exam with the new question
        const updatedExam = await exam.save();
        console.log('Exam updated:', updatedExam);

        res.status(200).json({ message: 'Question added successfully', exam: updatedExam });
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Fetch all questions by examId
exports.getQuestionsByExamId = async (req, res) => {
    const { examId } = req.params;
    try {
      const questions = await Question.find({ examId });
      if (!questions) {
        return res.status(404).json({ message: 'No questions found for this exam' });
      }
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
