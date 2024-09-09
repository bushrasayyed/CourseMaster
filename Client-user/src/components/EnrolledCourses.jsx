import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';  // Importing Material UI components
import { useNavigate } from 'react-router-dom';  // Importing useNavigate hook

const EnrolledCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Fetch enrollments on component mount
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/enrollments');
        setEnrollments(response.data);
      } catch (error) {
        console.error("Error fetching enrollments", error);
      }
    };
    
    fetchEnrollments();
  }, []);

  // Handle navigation to lectures page
  const handleViewLectures = (courseId) => {
    navigate(`/lectures/${courseId}`);  // Redirect to lectures page with courseId
  };

  return (
    <Container>
      <Typography variant="h4" style={{ color: "white", marginBottom: "20px" }}>
        Your Enrollments
      </Typography>

      <Grid container spacing={3}>
        {enrollments.map((enroll) => (
          <Grid item xs={12} sm={6} md={4} key={enroll._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{enroll.courseId.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  View the lectures of this course by clicking below:
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{ marginTop: "10px" }} 
                  onClick={() => handleViewLectures(enroll.courseId._id)}
                >
                  View Lectures
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EnrolledCourses;
