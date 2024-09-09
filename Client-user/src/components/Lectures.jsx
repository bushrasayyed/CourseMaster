import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';  // Importing Material UI components
import { useParams } from 'react-router-dom';  // Importing useParams hook

const Lectures = () => {
  const { courseId } = useParams();  // Extract courseId from URL
  const [lectures, setLectures] = useState([]);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    // Fetch lectures based on courseId
    const fetchLectures = async () => {
        try {
            // Fetch lectures
            const lecturesResponse = await axios.get(`http://localhost:5000/api/lectures/course/${courseId}`);
            setLectures(lecturesResponse.data);
    
            // Fetch course details
            const courseResponse = await axios.get(`http://localhost:5000/api/getCourse/${courseId}`);
            console.log("Course Response",courseResponse)
            setCourseName(courseResponse.data.title);
          } catch (error) {
        console.error("Error fetching lectures", error);
      }
    };
    
    fetchLectures();
  }, [courseId]);

  return (
    <Container>
      <Typography variant="h4" style={{ color: "white", marginBottom: "20px" }}>
        Lectures for Course: {courseName}
      </Typography>

      <Grid container spacing={3}>
        {lectures.map((lecture) => (
          <Grid item xs={12} sm={6} md={4} key={lecture._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{lecture.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Video Link:
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{ marginTop: "10px" }}
                  href={lecture.videoUrl}  // Direct link to video
                  target="_blank"           // Open in new tab
                  rel="noopener noreferrer" // Security feature
                >
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Lectures;
