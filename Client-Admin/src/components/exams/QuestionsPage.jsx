import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';

// Styles for the modal box
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const QuestionsPage = () => {
  const { examId } = useParams(); // Get examId from the route parameters
  const [questions, setQuestions] = useState([]);
  const [editQuestionData, setEditQuestionData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });
  const [open, setOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    // Fetch questions related to the examId
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getQuestionsByExam/${examId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [examId]);

  // Handle modal open
  const handleOpen = (question) => {
    setEditQuestionData({
      questionText: question.questionText,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
    });
    setSelectedQuestionId(question._id);
    setOpen(true);
  };

  // Handle modal close
  const handleClose = () => setOpen(false);

  // Handle input change in the modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option')) {
      const index = parseInt(name.split('_')[1], 10);
      setEditQuestionData((prevData) => {
        const updatedOptions = [...prevData.options];
        updatedOptions[index] = value;
        return { ...prevData, options: updatedOptions };
      });
    } else {
      setEditQuestionData({ ...editQuestionData, [name]: value });
    }
  };

  // Handle question update
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateQuestion/${examId}/${selectedQuestionId}`, editQuestionData);
      // Update local state with the new question data
      setQuestions((prevQuestions) => prevQuestions.map((q) => (q._id === selectedQuestionId ? editQuestionData : q)));
      handleClose(); // Close modal after successful update
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  // Handle delete button click
  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteQuestion/${questionId}`);
      // Remove the deleted question from the state
      setQuestions(questions.filter(question => question._id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {questions.map((question) => (
          <Grid item xs={12} sm={6} md={4} key={question._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Question: {question.questionText}</Typography>
                {question.options.map((option, index) => (
                  <Typography key={index} variant="body2">
                    {index + 1}. {option}
                  </Typography>
                ))}
                <Typography variant="body2" color="success">
                  Correct Answer: {question.correctAnswer}
                </Typography>
                {/* Buttons for Edit and Delete */}
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => handleOpen(question)} 
                  style={{ marginRight: '10px', marginTop: '10px' }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleDelete(question._id)} 
                  style={{ marginTop: '10px' }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for editing the question */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>Edit Question</Typography>
          <TextField
            label="Question"
            name="questionText"
            fullWidth
            value={editQuestionData.questionText}
            onChange={handleChange}
            margin="normal"
          />
          {editQuestionData.options.map((option, index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              name={`option_${index}`}
              fullWidth
              value={option}
              onChange={handleChange}
              margin="normal"
            />
          ))}
          <TextField
            label="Correct Answer"
            name="correctAnswer"
            fullWidth
            value={editQuestionData.correctAnswer}
            onChange={handleChange}
            margin="normal"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleUpdate}
            >
              Update Question
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default QuestionsPage;
