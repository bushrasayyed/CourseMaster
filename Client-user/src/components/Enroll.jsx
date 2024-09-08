import { useState, useEffect } from "react";
import { Card, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Enroll() {
  const [message, setMessage] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {};

  useEffect(() => {
    // Fetch course details if not provided in the location.state
    if (courseId) {
      axios.get(`http://localhost:5000/api/getCourse/${courseId}`)
        .then((response) => {
          // console.log(response.data); // Debug: Log the entire response
          setCourseTitle(response.data.title);
          setCourseDescription(response.data.description);
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
          setMessage("An error occurred while fetching course details.");
        });
    }
  }, [courseId]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("id");

    if (!userId || !courseId) {
      setMessage("Error: Missing student ID or course ID.");
      return;
    }

    const enrollmentData = {      
      userId,
      courseId,
      progress: 0,
      is_completed: false,
      completed_at: null,
    };
console.log(enrollmentData);
    try {
      await axios.post("http://localhost:5000/api/enrollments", enrollmentData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setMessage("Enrollment successful!");
      navigate("/enrolledCourses"); // Redirect to a success page or another component
    } catch (error) {
      console.error("Error enrolling:", error);
      setMessage("An error occurred during enrollment.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 50,
        minHeight: "100vh",
      }}
    >
      <div>
        <Typography variant="h6" align="center" style={{ color:"white", marginBottom: 20 }}>
          Enroll in Course: {courseId}
        </Typography>
        
        <Card
          variant="outlined"
          sx={{ padding: 3, maxWidth: 400 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" style={{  marginBottom: 20 }}>
           {courseTitle|| "Course details"}
        </Typography>
          <Typography variant="body1" style={{ marginBottom: 20 }}>
            Description: {courseDescription || "No description available."}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: 20 }}>
            {/* Accept Terms and condtions <></> */}
          </Typography>
         
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Enroll me
          </Button>
          {message && (
            <Typography
              color="error"
              variant="body2"
              style={{ marginTop: 10 }}
            >
              {message}
            </Typography>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Enroll;
