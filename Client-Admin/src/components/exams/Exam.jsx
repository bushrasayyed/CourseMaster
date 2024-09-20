import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
import { Edit, Delete, Add,Visibility  } from "@mui/icons-material";
import axios from 'axios';
import AddQuestionModal from './AddQuestionModal';
import { useNavigate } from 'react-router-dom';

const style = {
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

const Exam = () => {
  const navigate = useNavigate();
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [examDetails, setExamDetails] = useState({
    examTitle: '',
    courseId: '',
    totalMarks: '',
    passingMarks: '',
    duration: '',
  });
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // Fetch all courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllCourses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch all exams from the backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getAllExams');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Exam data:", data);
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();

    // Cleanup function (if needed)
    return () => {
      // Any necessary cleanup can be done here
    };
  }, []);

  // Open the create exam modal
  const handleOpenCreateExamModal = () => setIsCreateExamModalOpen(true);

  // Close the create exam modal
  const handleCloseCreateExamModal = () => setIsCreateExamModalOpen(false);


  // Handle form field changes for exam details
  const handleChange = (field, value) => {
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Handle form submission for creating an exam
  const handleSubmitCreateExam = async () => {
    try {
      await axios.post('http://localhost:5000/api/createExam', examDetails);
      alert('Exam created successfully!');
      handleCloseCreateExamModal();
      // Refresh exams list
      const response = await axios.get('http://localhost:5000/api/getAllExams');
      setExams(response.data);
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };



  // Handle delete exam
  const handleDelete = async (examId) => {
    try {
      // await axios.delete(`http://localhost:5000/api/exams/${examId}`);
      alert('Exam deleted successfully!');
      // Refresh exams list
      // const response = await axios.get('http://localhost:5000/api/exams');
      // setExams(response.data);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

   // Open the add question modal
   const handleOpenAddQuestionModal = (examId) => {
    setSelectedExam(examId);
    setIsAddQuestionModalOpen(true);
  };

  // Close the add question modal
  const handleCloseAddQuestionModal = () => {
    setIsAddQuestionModalOpen(false);
    setSelectedExam(null); // Clear the selected exam ID
  };

  const handleShowQuestions = (examId) => {
    navigate(`/questions/${examId}`); // Redirect to questions/:examId
  };

  return (
    <div>
      {/* Custom Styled Create Exam Button */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        size="small"
        style={{ minWidth: "32px", height: "45px", margin: "0 5px" }}
        onClick={handleOpenCreateExamModal}
      >
        Add Exam
      </Button>

      {/* Modal for Creating Exam */}
      <Modal open={isCreateExamModalOpen} onClose={handleCloseCreateExamModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Exam
          </Typography>

          {/* Exam Title */}
          <TextField
            label="Exam Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={examDetails.examTitle}
            onChange={(e) => handleChange('examTitle', e.target.value)}
          />

          {/* Course Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              value={examDetails.courseId}
              label="Course"
              onChange={(e) => handleChange('courseId', e.target.value)}
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Total Marks */}
          <TextField
            label="Total Marks"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={examDetails.totalMarks}
            onChange={(e) => handleChange('totalMarks', e.target.value)}
          />

          {/* Passing Marks */}
          <TextField
            label="Passing Marks"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={examDetails.passingMarks}
            onChange={(e) => handleChange('passingMarks', e.target.value)}
          />
          
          {/* Duration */}
          <TextField
            label="Duration (minutes)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={examDetails.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
          />

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {/* Cancel Button */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseCreateExamModal}
              style={{ width: '45%' }}
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              style={{ width: '45%' }}
              onClick={handleSubmitCreateExam}
            >
              Add Exam
            </Button>
          </Box>
        </Box>
      </Modal>

    
      {/* Display Exams */}
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '20px', color: 'white' }}>
        All Exams
      </Typography>
      <Grid container spacing={2}>
        {exams.map((exam) => (
          <Grid item xs={12} sm={6} md={4} key={exam._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{exam.examTitle}</Typography>
                <Typography variant="body2">Course: {exam.courseId.title}</Typography>
                <Typography variant="body2">Total Marks: {exam.totalMarks}</Typography>
                <Typography variant="body2">Passing Marks: {exam.passingMarks}</Typography>
                <Typography variant="body2">Duration: {exam.duration} minutes</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenAddQuestionModal(exam._id)}
                  startIcon={<Edit />}
                >
                  Add Question
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(exam._id)}
                  startIcon={<Delete />}
                >
                  Delete Exam
                </Button>
                <Button
                  size="small"
                  color="info"
                  onClick={() => handleShowQuestions(exam._id)}
                  startIcon={<Visibility />} // Visibility icon for "Show Questions"
                >
                  Show Questions
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
        {/* Add Question Modal */}
        <AddQuestionModal
        open={isAddQuestionModalOpen}
        onClose={handleCloseAddQuestionModal}
        examId={selectedExam}
      />
    </div>
  );
};

export default Exam;
