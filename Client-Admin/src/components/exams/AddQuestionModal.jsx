import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddQuestionModal = ({ open, onClose, examId }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/addQuestion`, {
        examId,
        question,
        options,
        correctOption,
      });
      
      if (response.status === 200) {
        alert('Question added successfully!');
        onClose();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Add New Question
        </Typography>
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          margin="normal"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Grid container spacing={2}>
          {options.map((option, index) => (
            <Grid item xs={6} key={index}>
              <TextField
                label={`Option ${index + 1}`}
                variant="outlined"
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
        <TextField
          label="Correct Option"
          variant="outlined"
          fullWidth
          margin="normal"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={onClose} style={{ width: '45%' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" style={{ width: '45%' }} onClick={handleSubmit}>
            Add Question
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddQuestionModal;
