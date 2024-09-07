import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, List, ListItem, Link } from "@mui/material";

function CourseDetails() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch lectures for the course
        const response = await axios.get(`http://localhost:5000/api/lectures/course/${courseId}`);
        setLectures(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
     <Typography 
  variant="h4" 
  component="div" 
  gutterBottom
  style={{ color: 'white' }}
>
  Lectures for Course ID: {courseId}
</Typography>

      <List>
        {lectures.map((lecture) => (
          <ListItem key={lecture._id} style={{ marginBottom: "20px" }}>
            <Card variant="outlined" style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {lecture.title}
                </Typography>
               
                {lecture.videoUrl && (
                  <Typography variant="body2" color="primary">
                    <Link href={lecture.videoUrl} target="_blank" rel="noopener noreferrer">
                      Watch Video
                    </Link>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CourseDetails;
